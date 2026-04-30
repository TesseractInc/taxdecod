import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Recovery safety gate:
 *
 * TaxDecod should not enable public accounts, cloud saving, or Supabase auth
 * just because keys exist in an environment.
 *
 * Accounts should only go live after:
 * - Supabase Row Level Security has been audited
 * - saved_scenarios policies are verified
 * - privacy/GDPR copy is reviewed
 * - the frontend account UX is intentionally re-enabled
 *
 * To enable later, set:
 * NEXT_PUBLIC_TAXDECOD_ENABLE_ACCOUNTS=true
 */
export const accountFeaturesEnabled =
  process.env.NEXT_PUBLIC_TAXDECOD_ENABLE_ACCOUNTS === "true";

export const supabaseConfigured = Boolean(
  accountFeaturesEnabled &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export function getSupabaseBrowserClient() {
  if (!supabaseConfigured) {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  browserClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );

  return browserClient;
}