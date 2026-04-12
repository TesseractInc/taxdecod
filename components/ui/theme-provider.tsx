"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import SupabaseAuthProvider from "../auth/supabase-auth-provider";

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
    </NextThemesProvider>
  );
}