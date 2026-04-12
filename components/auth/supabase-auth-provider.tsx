"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  supabaseConfigured,
} from "../../lib/supabase/client";

type AuthStatus =
  | "idle"
  | "loading"
  | "sending-link"
  | "link-sent"
  | "signed-in"
  | "signing-out"
  | "error";

type SupabaseAuthContextValue = {
  configured: boolean;
  ready: boolean;
  user: User | null;
  email: string | null;
  status: AuthStatus;
  notice: string | null;
  sendMagicLink: (email: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  clearNotice: () => void;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | null>(null);

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);

  if (!context) {
    throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
  }

  return context;
}

export default function SupabaseAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [notice, setNotice] = useState<string | null>(null);

  const clearNotice = useCallback(() => {
    setNotice(null);
    setStatus((current) => (current === "error" ? "idle" : current));
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setReady(true);
      setStatus("idle");
      return;
    }

    let mounted = true;

    const bootstrap = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        setStatus("error");
        setNotice(error.message || "Unable to restore your login session.");
        setReady(true);
        return;
      }

      setUser(data.user ?? null);
      setStatus(data.user ? "signed-in" : "idle");
      setReady(true);
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setStatus(nextUser ? "signed-in" : "idle");
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const sendMagicLink = useCallback(
    async (email: string) => {
      const trimmed = email.trim().toLowerCase();
      const valid = /\S+@\S+\.\S+/.test(trimmed);
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        const message =
          "Supabase is not configured yet. Add your environment keys first.";
        setStatus("error");
        setNotice(message);
        return { ok: false, error: message };
      }

      if (!valid) {
        const message = "Please enter a valid email address.";
        setStatus("error");
        setNotice(message);
        return { ok: false, error: message };
      }

      setStatus("sending-link");
      setNotice(null);

      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/calculator`
          : undefined;

      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: true,
        },
      });

      if (error) {
        setStatus("error");
        setNotice(error.message || "Unable to send sign-in link.");
        return { ok: false, error: error.message };
      }

      setStatus("link-sent");
      setNotice("Sign-in link sent. Check your email and open the link.");
      return { ok: true };
    },
    [],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) return;

    setStatus("signing-out");
    setNotice(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setStatus("error");
      setNotice(error.message || "Unable to sign out right now.");
      return;
    }

    setUser(null);
    setStatus("idle");
    setNotice("Signed out successfully.");
  }, []);

  const value = useMemo<SupabaseAuthContextValue>(
    () => ({
      configured: supabaseConfigured,
      ready,
      user,
      email: user?.email ?? null,
      status,
      notice,
      sendMagicLink,
      signOut,
      clearNotice,
    }),
    [ready, user, status, notice, sendMagicLink, signOut, clearNotice],
  );

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}