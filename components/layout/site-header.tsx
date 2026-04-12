"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  BadgePoundSterling,
  BriefcaseBusiness,
  Calculator,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ContactRound,
  FileText,
  Gauge,
  LayoutGrid,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  RefreshCcw,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Trophy,
  User2,
  Wallet,
  X,
} from "lucide-react";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import {
  headerPreviewGroups,
  primaryNavLinks,
  quickAccessLinks,
  utilityMenuLinks,
  type HeaderIconKey,
  type HeaderPreviewGroup,
  type HeaderPreviewLink,
} from "./page-links";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";

type MobileSectionKey =
  | "core"
  | "calculator"
  | "payslip"
  | "leaderboard"
  | "tools"
  | "reality"
  | "more";

const iconMap: Record<HeaderIconKey, React.ComponentType<{ className?: string }>> =
  {
    calculator: Calculator,
    payslip: FileText,
    refund: RefreshCcw,
    compare: Scale,
    leaderboard: Trophy,
    tools: LayoutGrid,
    reality: Wallet,
    methodology: SearchCheck,
    services: BriefcaseBusiness,
    contact: ContactRound,
    salaryhub: Gauge,
    reverse: RefreshCcw,
  };

function ToolChip({
  link,
  compact = false,
}: {
  link: HeaderPreviewLink;
  compact?: boolean;
}) {
  const Icon = iconMap[link.icon];

  return (
    <Link
      href={link.href}
      className={`group flex items-start gap-3 rounded-[18px] border transition ${
        compact ? "px-4 py-3.5" : "px-4 py-4"
      }`}
      style={{
        borderColor: "var(--line)",
        background: "var(--surface-1)",
      }}
    >
      <div
        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]"
        style={{
          background: "color-mix(in srgb, var(--primary) 9%, transparent)",
          color: "var(--primary)",
          border: "1px solid color-mix(in srgb, var(--primary) 13%, transparent)",
        }}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold app-title leading-5">
            {link.label}
          </p>
          {link.badge ? (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{
                background: "color-mix(in srgb, var(--primary) 6%, transparent)",
                color: "var(--primary)",
                border: "1px solid color-mix(in srgb, var(--primary) 8%, transparent)",
              }}
            >
              {link.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-xs leading-5 app-subtle">
          {link.description}
        </p>
      </div>

      <ChevronRight className="mt-1 h-4 w-4 shrink-0 app-subtle transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function GroupPanel({
  group,
  onNavigate,
}: {
  group: HeaderPreviewGroup;
  onNavigate: () => void;
}) {
  const FeaturedIcon = iconMap[group.featured.icon];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
      <div
        className="rounded-[24px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "color-mix(in srgb, var(--surface-2) 92%, transparent)",
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
          {group.title}
        </p>

        <Link
          href={group.featured.href}
          onClick={onNavigate}
          className="mt-4 block rounded-[22px] border px-5 py-5 transition"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 14%, var(--line))",
            background: "color-mix(in srgb, var(--primary) 4%, var(--surface-1))",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px]"
              style={{
                background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                color: "var(--primary)",
              }}
            >
              <FeaturedIcon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[1.05rem] font-semibold app-title">
                  {group.featured.label}
                </p>
                {group.featured.badge ? (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      background:
                        "color-mix(in srgb, var(--primary) 6%, transparent)",
                      color: "var(--primary)",
                      border:
                        "1px solid color-mix(in srgb, var(--primary) 8%, transparent)",
                    }}
                  >
                    {group.featured.badge}
                  </span>
                ) : null}
              </div>

              <p className="mt-2.5 text-sm leading-6 app-copy">
                {group.featured.description}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="rounded-[24px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "color-mix(in srgb, var(--surface-1) 96%, transparent)",
        }}
      >
        <div className="mb-3.5 flex items-center gap-2">
          <SearchCheck className="h-4 w-4 app-accent" />
          <p className="text-sm font-semibold app-title">Core paths</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {group.links.map((link) => (
            <ToolChip key={link.href + link.label} link={link} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountButton({
  signedIn,
  email,
  onClick,
}: {
  signedIn: boolean;
  email?: string | null;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      className="hidden md:inline-flex"
      style={{
        border: "1px solid var(--line)",
        background: "color-mix(in srgb, var(--surface-1) 96%, transparent)",
        color: "var(--text)",
        borderRadius: "18px",
        padding: "0.55rem 0.7rem",
        alignItems: "center",
        gap: "0.72rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 rgba(56,189,248,0)",
            "0 0 0 6px rgba(56,189,248,0.06)",
            "0 0 0 rgba(56,189,248,0)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        className="flex h-9 w-9 items-center justify-center rounded-[14px]"
        style={{
          background: "color-mix(in srgb, var(--primary) 10%, transparent)",
          color: "var(--primary)",
          border: "1px solid color-mix(in srgb, var(--primary) 12%, transparent)",
        }}
      >
        {signedIn ? <User2 className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
      </motion.div>

      <div className="min-w-0 text-left leading-tight">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] app-subtle">
          {signedIn ? "Account" : "Sign in"}
        </p>
        <p className="max-w-[170px] truncate text-sm font-semibold app-title">
          {signedIn ? email : "Save scenarios"}
        </p>
      </div>
    </motion.button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSections, setMobileSections] = useState<
    Record<MobileSectionKey, boolean>
  >({
    core: true,
    calculator: false,
    payslip: false,
    leaderboard: false,
    tools: false,
    reality: false,
    more: false,
  });

  const {
    configured,
    ready,
    email,
    user,
    status,
    notice,
    sendMagicLink,
    signOut,
    clearNotice,
  } = useSupabaseAuth();

  const [loginEmail, setLoginEmail] = useState("");

  useEffect(() => {
    if (email) setLoginEmail(email);
  }, [email]);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenuOpen(false);
    setAccountOpen(false);
    setActivePreview(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(
    () =>
      primaryNavLinks
        .map((item) => ({
          ...item,
          group: headerPreviewGroups.find((group) => group.href === item.href),
        }))
        .filter((item) => item.group),
    [],
  );

  const signedIn = Boolean(user);
  const activeGroup =
    headerPreviewGroups.find((group) => group.href === activePreview) ?? null;

  const handleSendLink = async () => {
    await sendMagicLink(loginEmail);
  };

  const toggleMobileSection = (key: MobileSectionKey) => {
    setMobileSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shellBackground =
    scrolled || activePreview || desktopMenuOpen || accountOpen
      ? "color-mix(in srgb, var(--card-strong) 97%, transparent)"
      : "color-mix(in srgb, var(--card-strong) 94%, transparent)";

  return (
    <>
      <div className="top-trust-bar">
        <Container>
          <div className="top-trust-inner">
            <span className="top-trust-item">
              <ShieldCheck className="h-3.5 w-3.5" />
              Based on current HMRC guidance and UK PAYE rules
            </span>

            <span className="top-trust-divider" aria-hidden="true" />

            <span className="top-trust-item">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Updated for the current UK tax year
            </span>

            <span className="top-trust-divider hidden md:block" aria-hidden="true" />

            <span className="top-trust-item hidden md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              Core tools include salary, payslip, refund, and reality checks
            </span>
          </div>
        </Container>
      </div>

      <header className="sticky top-10 z-[70]">
        <div
          className="site-header-shell transition-[background,box-shadow] duration-200"
          style={{
            background: shellBackground,
            boxShadow: scrolled ? "0 14px 34px rgba(11,22,39,0.08)" : "none",
          }}
        >
          <Container className="flex h-[74px] items-center justify-between gap-3">
            <Link href="/" className="group flex min-w-0 items-center gap-3">
              <div className="site-header-mark">
                <BadgePoundSterling className="h-4.5 w-4.5" />
              </div>

              <div className="min-w-0 leading-tight">
                <p className="truncate text-[1rem] font-semibold tracking-[-0.03em] app-title">
                  TaxDecod
                </p>
                <p className="truncate text-xs app-subtle">
                  UK salary clarity engine
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {navItems.map((item) => {
                const active = pathname === item.href || activePreview === item.href;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onMouseEnter={() => {
                      setDesktopMenuOpen(false);
                      setActivePreview(item.href);
                    }}
                    onClick={() =>
                      setActivePreview((prev) => (prev === item.href ? null : item.href))
                    }
                    className={`site-header-nav-link ${
                      active ? "site-header-nav-link-active" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        active ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <AccountButton
                signedIn={signedIn}
                email={email}
                onClick={() => {
                  setActivePreview(null);
                  setDesktopMenuOpen(false);
                  setAccountOpen((prev) => !prev);
                }}
              />

              <ThemeToggle compact />

              <button
                type="button"
                onClick={() => {
                  setActivePreview(null);

                  if (typeof window !== "undefined" && window.innerWidth >= 1280) {
                    setAccountOpen(false);
                    setDesktopMenuOpen((prev) => !prev);
                  } else {
                    setMobileOpen((prev) => !prev);
                  }
                }}
                className="site-header-menu"
                aria-label="Open menu"
              >
                {mobileOpen || desktopMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </Container>

          <AnimatePresence mode="wait">
            {activeGroup ? (
              <motion.div
                key={`preview-${activeGroup.href}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="hidden border-t xl:block"
                style={{ borderColor: "var(--line)" }}
                onMouseLeave={() => setActivePreview(null)}
              >
                <Container className="py-4">
                  <div
                    className="rounded-[28px] border p-5"
                    style={{
                      borderColor: "var(--line)",
                      background: "color-mix(in srgb, var(--card-strong) 96%, transparent)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <GroupPanel
                      group={activeGroup}
                      onNavigate={() => setActivePreview(null)}
                    />
                  </div>
                </Container>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {desktopMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="hidden border-t xl:block"
                style={{ borderColor: "var(--line)" }}
              >
                <Container className="py-4">
                  <div
                    className="rounded-[28px] border p-4"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-strong)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="overflow-y-auto pr-1"
                      style={{ maxHeight: "min(72vh, 760px)" }}
                    >
                      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                        <div
                          className="rounded-[24px] border p-5"
                          style={{
                            borderColor: "var(--line)",
                            background: "var(--surface-2)",
                          }}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
                            Quick access
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold app-title">
                            Core tools first
                          </h3>
                          <p className="mt-3 text-sm app-copy">
                            Calculator, payslip checker, refund check, compare,
                            tools, and reality.
                          </p>

                          <div className="mt-5 grid gap-3">
                            {quickAccessLinks.map((link) => (
                              <ToolChip key={link.href + link.label} link={link} />
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div
                            className="rounded-[24px] border p-5"
                            style={{
                              borderColor: "var(--line)",
                              background: "var(--surface-1)",
                            }}
                          >
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {headerPreviewGroups.map((group) => {
                                const Icon = iconMap[group.featured.icon];

                                return (
                                  <button
                                    key={group.href}
                                    type="button"
                                    onClick={() => {
                                      setDesktopMenuOpen(false);
                                      setActivePreview(group.href);
                                    }}
                                    className="rounded-[18px] border p-4 text-left transition"
                                    style={{
                                      borderColor: "var(--line)",
                                      background: "var(--surface-1)",
                                    }}
                                  >
                                    <div
                                      className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                                      style={{
                                        background:
                                          "color-mix(in srgb, var(--primary) 9%, transparent)",
                                        color: "var(--primary)",
                                      }}
                                    >
                                      <Icon className="h-4 w-4" />
                                    </div>

                                    <p className="mt-4 text-sm font-semibold app-title">
                                      {group.label}
                                    </p>
                                    <p className="mt-1 text-xs app-subtle">{group.title}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid gap-4 lg:grid-cols-2">
                            <div
                              className="rounded-[24px] border p-5"
                              style={{
                                borderColor: "var(--line)",
                                background: "var(--surface-1)",
                              }}
                            >
                              <p className="text-lg font-semibold app-title">
                                More from TaxDecod
                              </p>

                              <div className="mt-4 grid gap-3">
                                {utilityMenuLinks.map((link) => (
                                  <ToolChip key={link.href + link.label} link={link} />
                                ))}
                              </div>
                            </div>

                            <div
                              className="rounded-[24px] border p-5"
                              style={{
                                borderColor: "var(--line)",
                                background: "var(--surface-1)",
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <LifeBuoy className="h-4 w-4 app-accent" />
                                <p className="text-lg font-semibold app-title">
                                  Trust and methodology
                                </p>
                              </div>

                              <p className="mt-3 text-sm app-copy">
                                Clear salary logic, visible methodology, and support routes without pretending to be HMRC.
                              </p>

                              <div className="mt-5 flex flex-wrap gap-2">
                                <Link href="/methodology" className="app-button-secondary">
                                  Methodology
                                </Link>
                                <Link href="/calculator" className="app-button-primary">
                                  Open calculator
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {accountOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="border-t"
                style={{ borderColor: "var(--line)" }}
              >
                <Container className="py-4">
                  <div
                    className="rounded-[28px] border p-5"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-strong)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                      <div className="max-w-2xl">
                        <p className="text-sm font-medium app-title">
                          Account and saved scenarios
                        </p>
                        <p className="mt-2 text-sm app-copy">
                          Sign in with email and come back to saved salary scenarios later.
                        </p>
                      </div>

                      {signedIn ? (
                        <div
                          className="rounded-2xl border px-4 py-3"
                          style={{
                            borderColor:
                              "color-mix(in srgb, var(--emerald) 30%, var(--line))",
                            background:
                              "color-mix(in srgb, var(--emerald) 10%, transparent)",
                          }}
                        >
                          <p className="text-[11px] uppercase tracking-[0.14em] money-positive">
                            Signed in
                          </p>
                          <p className="mt-1 max-w-[220px] truncate text-sm font-semibold app-title">
                            {email}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    {!configured ? (
                      <div
                        className="mt-4 rounded-[20px] border px-4 py-4"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--amber) 30%, var(--line))",
                          background:
                            "color-mix(in srgb, var(--amber) 10%, transparent)",
                        }}
                      >
                        <p className="text-sm font-medium app-title">
                          Supabase not connected yet
                        </p>
                        <p className="mt-2 text-xs app-copy">
                          Add your Supabase URL and publishable key to enable real login and saved scenarios.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                        <input
                          type="email"
                          inputMode="email"
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            clearNotice();
                          }}
                          placeholder="you@example.com"
                          className="app-input h-[50px]"
                        />

                        {!signedIn ? (
                          <button
                            type="button"
                            onClick={handleSendLink}
                            disabled={!ready || status === "sending-link"}
                            className="app-button-primary disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {status === "sending-link" ? "Sending..." : "Send sign-in link"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void signOut()}
                            className="app-button-secondary"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </button>
                        )}

                        <Link href="/calculator" className="app-button-secondary">
                          Open calculator
                        </Link>
                      </div>
                    )}

                    {notice ? (
                      <div
                        className="mt-4 rounded-[16px] border px-4 py-3"
                        style={{
                          borderColor: "var(--line)",
                          background: "var(--surface-2)",
                        }}
                      >
                        <p className="text-xs app-copy">{notice}</p>
                      </div>
                    ) : null}
                  </div>
                </Container>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="border-t xl:hidden"
                style={{ borderColor: "var(--line)" }}
              >
                <Container className="py-4">
                  <div
                    className="rounded-[28px] border p-4"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-strong)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="rounded-[20px] border p-4"
                      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
                        Core tools
                      </p>

                      <div className="mt-4 grid gap-3">
                        {quickAccessLinks.map((link) => (
                          <ToolChip key={link.href + link.label} link={link} />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        { key: "calculator", label: "Calculator", group: headerPreviewGroups[0] },
                        { key: "payslip", label: "Payslip Check", group: headerPreviewGroups[1] },
                        { key: "leaderboard", label: "Leaderboard", group: headerPreviewGroups[2] },
                        { key: "tools", label: "Tools", group: headerPreviewGroups[3] },
                        { key: "reality", label: "Reality", group: headerPreviewGroups[4] },
                        { key: "more", label: "More", group: null },
                      ].map((section) => {
                        const open = mobileSections[section.key as MobileSectionKey];

                        return (
                          <div
                            key={section.key}
                            className="rounded-[20px] border"
                            style={{
                              borderColor: "var(--line)",
                              background: "var(--surface-1)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                toggleMobileSection(section.key as MobileSectionKey)
                              }
                              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                            >
                              <p className="text-sm font-semibold app-title">{section.label}</p>
                              <ChevronDown
                                className={`h-4 w-4 app-subtle transition ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {open ? (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.16, ease: "easeOut" }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="border-t px-4 pb-4 pt-3"
                                    style={{ borderColor: "var(--line)" }}
                                  >
                                    <div className="grid gap-3">
                                      {section.group
                                        ? [section.group.featured, ...section.group.links].map((link) => (
                                            <ToolChip key={link.href + link.label} link={link} />
                                          ))
                                        : utilityMenuLinks.map((link) => (
                                            <ToolChip key={link.href + link.label} link={link} />
                                          ))}
                                    </div>
                                  </div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Container>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}