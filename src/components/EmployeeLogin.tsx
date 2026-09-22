"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LockIcon } from "@/components/ui/BrandIcons";
import { EMPLOYEE_LOGIN_ENDPOINT, EMPLOYEE_LOGIN_URL } from "@/lib/site";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll-lock";

const FIELD_BASE = "field cut-2 state";

type Status = "idle" | "sending" | "error";

/**
 * The staff entrance: a trigger that opens a username/password dialog.
 *
 * One entrance, in the header, rendered twice for the two shapes that header
 * takes: a padlock in the top-right bar at 1100px and up, and a spelled-out
 * line in the mobile menu below it. The two are on opposite sides of a single
 * breakpoint, so exactly one exists at any width and there is never a second
 * dialog. It is not in the footer and not on service pages.
 *
 * ── What this component will and will not do ──────────────────────────────
 *
 * It collects the credentials and hands them to `EMPLOYEE_LOGIN_ENDPOINT` over
 * HTTPS. It does not, and cannot, verify them here: this site is
 * `output: "export"`, a folder of static files on a Cloudflare assets Worker
 * with no server, no session store and no database. Anything shipped to the
 * browser is readable by anyone who opens devtools, so there is no credential,
 * no hash and no "demo user" in this file — a password check written in
 * client-side JavaScript is not a login, it is a door with a painted-on lock.
 *
 * With no endpoint configured the form validates, then says plainly that the
 * connection is not set up. It never reports a success it did not get.
 *
 * The endpoint must:
 *   · be https (a password over http is readable in transit),
 *   · send `Access-Control-Allow-Origin` for this site's origin, and
 *     `Access-Control-Allow-Credentials: true` if it sets a session cookie,
 *   · reply 2xx on success — optionally with `{ "redirect": "https://..." }`
 *     to send the employee straight into the EMS,
 *   · reply 401 on bad credentials.
 *
 * `credentials: "include"` is set so a `Set-Cookie` session from the EMS is
 * stored. That only works if the EMS is on the same registrable domain (e.g.
 * ems.hivecrest.com) or explicitly allows this origin with credentials.
 */
type Props = {
  /**
   * `inline` — padlock + words side-by-side (mobile menu).
   * `icon`   — padlock only with label revealed on hover (desktop header, pre-cloud).
   * `cloud`  — animated cloud-upload button: icon slides across on hover,
   *             label fades out. Used for the desktop header Employee Login.
   */
  variant?: "inline" | "icon" | "cloud";
  /** Trigger styling. Defaults to the quiet caption treatment. */
  className?: string;
  /** Trigger text. Also the accessible name in `icon` form. */
  label?: string;
  /** Size of the padlock, so a 13px header glyph and an 18px menu one share one component. */
  iconClassName?: string;
  /**
   * Fired the moment the dialog opens. The mobile menu uses this to close
   * itself first — two full-screen layers with two scroll positions, one of
   * them scroll-locked, is not a state either of them can leave cleanly.
   */
  onOpen?: () => void;
};

export default function EmployeeLogin({
  variant = "inline",
  className = "tap state gap-2 t-caption text-ink-4 hover:text-honey-5",
  label = "Employee Login",
  iconClassName = "w-[13px] h-[13px]",
  onOpen,
}: Props = {}) {
  // `cloud` variant renders its own fully self-contained animated button
  // using only inline JSX + Tailwind — no separate file, no extra component.
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  // Where focus came from, so it can be put back when the dialog closes —
  // otherwise a keyboard user is dropped at the top of the document.
  const openerRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setMessage(null);
    setFieldErrors({});
    // The password never outlives the dialog. Not security on its own, but
    // there is no reason to keep it in component state after it is sent.
    setPassword("");
  }, []);

  // Scroll lock, Escape, and a focus trap. `lockPageScroll` stops Lenis as
  // well as the document — `overflow: hidden` alone does not, because Lenis
  // runs its own scroll loop. This is the first consumer of that helper; it
  // has been sitting unused in lib/scroll-lock.ts since it was written.
  useEffect(() => {
    if (!open) return;

    lockPageScroll();
    const restoreTo = openerRef.current;
    firstFieldRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap: Tab from the last focusable wraps to the first, and back again.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockPageScroll();
      restoreTo?.focus();
    };
  }, [open, close]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { username?: string; password?: string } = {};
    if (!username.trim()) errors.username = "Enter your username.";
    if (!password) errors.password = "Enter your password.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      const firstKey = Object.keys(errors)[0];
      dialogRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    if (!EMPLOYEE_LOGIN_ENDPOINT) {
      // Honest failure. The alternative — a fake "Welcome back" — would teach
      // staff that the login works and hide the fact that nothing is wired up.
      setStatus("error");
      setMessage(
        EMPLOYEE_LOGIN_URL
          ? "Sign-in is not connected here yet. Use the Employee Management System directly for now."
          : "Sign-in is not connected yet. Ask your administrator for the Employee Management System link."
      );
      return;
    }

    setStatus("sending");
    setMessage(null);
    try {
      const res = await fetch(EMPLOYEE_LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Lets the EMS set its session cookie, where it is allowed to.
        credentials: "include",
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (res.status === 401 || res.status === 403) {
        setStatus("error");
        setMessage("That username and password did not match. Please try again.");
        setPassword("");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage("The Employee Management System could not be reached. Try again shortly.");
        return;
      }

      // Success. The EMS decides where the employee lands; falling back to the
      // configured system URL if the response does not say.
      const data = await res.json().catch(() => null);
      const next =
        (data && typeof data.redirect === "string" && data.redirect) || EMPLOYEE_LOGIN_URL;
      if (next) {
        window.location.href = next;
      } else {
        setStatus("error");
        setMessage("Signed in, but no destination is configured. Tell your administrator.");
      }
    } catch {
      // A CORS rejection and an offline browser both land here — fetch does not
      // distinguish them, so the message covers both without guessing.
      setStatus("error");
      setMessage("Could not reach the Employee Management System. Check your connection.");
    }
  };

  const busy = status === "sending";

  /**
   * Portalled to `document.body`, and it has to be.
   *
   * Both places this component mounts are inside a positioned, z-indexed
   * ancestor: `<header className="fixed z-[100]">` and the mobile menu's
   * `fixed z-[90]` overlay. Each creates a stacking context, so a child asking
   * for `z-[200]` gets 200 *within that subtree* — and the subtree as a whole
   * keeps its own layer.
   *
   * Rendered in place from the old footer trigger, the dialog appeared
   * *underneath* the header: verified with `elementFromPoint`, the nav links
   * and the "Start a Project" button were still the topmost elements and still
   * clickable behind an open modal. Raising the number does nothing — 200 and
   * 2000 both lose to a sibling stacking context at 100. Escaping to
   * `document.body` is the fix, and it is what keeps the dialog clear of both
   * the bar it now opens from and the menu overlay.
   *
   * Only ever called with `open === true`, which cannot happen during SSR, so
   * there is no server/client markup mismatch to guard against.
   */
  const dialog = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-5"
      role="presentation"
      /* Click the ground to dismiss, but only the ground — a mousedown that
         starts inside the panel and drifts out while selecting text must
         not close the dialog, which is why this tests the actual target. */
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
          {/* Rule 06.5 — surfaces are opaque, and the one sanctioned exception
              is a full-screen modal scrim. No backdrop-blur: the bible refuses
              to composite the whole viewport every frame for a decoration. */}
          <div aria-hidden className="absolute inset-0 bg-ink-1/60" />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative w-full max-w-[420px] m-paper cut-4 p-7 md:p-9"
          >
            <div className="flex items-center gap-3 mb-5">
              <span aria-hidden className="h-px w-6 bg-ink-6" />
              <span className="t-meta text-ink-4">Staff Access</span>
            </div>

            <h2 id={titleId} className="t-h3 text-ink-2 mb-2">
              Employee Login
            </h2>
            <p id={descId} className="t-body-s text-ink-3 mb-7">
              Sign in to the Hivecrest Employee Management System.
            </p>

            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="el-username" className="block t-caption font-semibold text-ink-2 mb-2">
                  Username <span className="text-honey-5">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="el-username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="your.name"
                  disabled={busy}
                  aria-invalid={!!fieldErrors.username}
                  aria-describedby={fieldErrors.username ? "el-username-err" : undefined}
                  className={`${FIELD_BASE} ${fieldErrors.username ? "border-danger" : "border-ink-6"}`}
                />
                {fieldErrors.username && (
                  <p id="el-username-err" role="alert" className="mt-2 t-caption text-danger">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="el-password" className="block t-caption font-semibold text-ink-2 mb-2">
                  Password <span className="text-honey-5">*</span>
                </label>
                <input
                  id="el-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={busy}
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? "el-password-err" : undefined}
                  className={`${FIELD_BASE} ${fieldErrors.password ? "border-danger" : "border-ink-6"}`}
                />
                {fieldErrors.password && (
                  <p id="el-password-err" role="alert" className="mt-2 t-caption text-danger">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {message && (
                /* `role="status"` rather than `alert`: this is announced once
                   the response lands, not interrupting what the user is doing. */
                <p role="status" className="t-caption text-danger">
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3 mt-1">
                <button type="submit" disabled={busy} className="btn btn-primary state cut-2">
                  {busy ? "Signing in..." : "Log in"}
                </button>
                <button
                  type="button"
                  onClick={close}
                  disabled={busy}
                  className="btn btn-secondary state cut-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
    </div>
  );

  /* ── Cloud/Lock variant: animated lock button ────────────────────────────
     Lock icon scales and glows on hover while the button expands.
     Uses honey-5 (brand gold) as the background — the site's marking colour.
     All dialog state and logic is identical to the other variants. */
  if (variant === "cloud") {
    return (
      <a
        href="https://elamanitech-management-system.intern2-b0a.workers.dev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={[
          "group inline-flex items-center gap-2 cursor-pointer select-none",
          "font-display font-bold text-[12px] tracking-widest uppercase leading-none",
          "bg-honey-5 text-paper",
          "px-4 py-2 rounded-[10px] border-none outline-none",
          "transition-all duration-200 ease-out",
          "hover:bg-honey-4 hover:scale-[1.08] hover:shadow-[0_4px_20px_rgba(138,97,0,0.35)]",
          "active:scale-[0.96]",
        ].join(" ")}
      >
        <LockIcon
          className={[
            "w-[14px] h-[14px] shrink-0",
            "transition-transform duration-200",
            "group-hover:scale-[1.3]",
          ].join(" ")}
        />
        <span>Employee Login</span>
      </a>
    );
  }

  return (
    <a
      href="https://elamanitech-management-system.intern2-b0a.workers.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={variant === "icon" ? label : undefined}
    >
      <LockIcon className={iconClassName} />

      {variant === "icon" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1
                     whitespace-nowrap t-caption text-ink-3 bg-paper border border-ink-7
                     cut-1 px-2 py-1 opacity-0 transition-opacity duration-200
                     group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </a>
  );
}
