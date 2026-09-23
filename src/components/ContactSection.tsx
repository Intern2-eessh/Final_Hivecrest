"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Loader2, Check, AlertCircle } from "lucide-react";
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_2,
  MAILTO,
  TEL_HREF,
  TEL_HREF_2,
} from "@/lib/site";
import { PhoneIcon } from "@/components/ui/BrandIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_OPTIONS } from "@/lib/services";
import { prefersReducedMotion, revealFrom, revealTo, triggerOnce } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);


/**
 * Where the form posts. Static export has no server of its own, so this points
 * at a form service (Web3Forms, Formspree, Basin — anything that accepts a JSON
 * POST). Set both of these in `.env.local` and rebuild; `output: "export"`
 * inlines them at build time, so a change needs a rebuild, not just a restart.
 *
 * For Web3Forms:
 *   NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.web3forms.com/submit
 *   NEXT_PUBLIC_CONTACT_ACCESS_KEY=<the access key from the dashboard>
 *
 * With no endpoint configured the form falls back to opening the visitor's mail
 * client with everything already filled in, so an enquiry is never lost.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

/**
 * Web3Forms identifies the destination inbox by an access key in the request
 * body rather than by a per-form URL, which is why this is separate from the
 * endpoint. Sent only when set, so a Formspree-style endpoint that wants no
 * such field is unaffected.
 *
 * This key is public by design — it ships inside the JavaScript bundle and
 * anyone can read it in devtools. That is how Web3Forms works for static sites
 * and it is not a leak: the key can only cause mail to be sent *to* this
 * inbox, never read from it. It is still read from the environment rather than
 * written in the source so the destination can be changed without a code edit.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "mail" | "error";
type Fields = { name: string; email: string; company: string; service: string; message: string };

const EMPTY: Fields = { name: "", email: "", company: "", service: SERVICE_OPTIONS[0], message: "" };

/* Rule 08.7 — focus is designed, not defaulted, and the ring is the global
   2px honey-5 outline at 3px offset defined in globals.css. The old
   `focus:ring-2 focus:ring-honey-500/25` was a second, weaker focus language
   competing with it, and its translucent honey failed contrast besides. */
const FIELD_BASE = "field cut-2 state";

/**
 * `headingAs` is `h2` on the home page, where this is the seventh section under
 * the hero's `h1`, and `h1` on /contact, where this component is the whole
 * page. That route was shipping with no `h1` at all.
 */
export default function ContactSection({
  headingAs = "h2",
}: { headingAs?: "h1" | "h2" } = {}) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  // Honeypot — see the input near the submit button. Only a bot ever sets it.
  const [botcheck, setBotcheck] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  // Drives the fade on the way out — see the auto-dismiss effect below.
  const [fading, setFading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll behaviour: TRIGGERED — Founder's Desk above is static, so Rule 07.4
   * requires this to move. Register: settled, choreography budget 1 (07.5).
   *
   * Exactly one element animates, and it is revealed rather than faded: the
   * form panel is uncovered by a clip wipe. Nothing else on this section moves
   * at all, which is what a budget of 1 means.
   */
  useEffect(() => {
    if (prefersReducedMotion()) return;   // Rule 07.7 — the settled frame

    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current, revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: sectionRef.current, ...triggerOnce },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /**
   * The confirmation clears itself. Nothing else does.
   *
   * `sent` was terminal: the tick and "Your enquiry is with us" sat under the
   * form for the rest of the visit, and the form beneath it had already been
   * emptied — so the section read as though a second enquiry had been typed
   * and lost. It goes after eight seconds.
   *
   * Eight, not three: the line is thirteen words, and the visitor is looking at
   * the button they just pressed rather than at the space below it, so the
   * clock starts when they find the message, not when it appears. It is also
   * long enough for `aria-live="polite"` to have queued and spoken it before
   * the node is removed — a message that disappears inside a screen reader's
   * announcement is a message that was never delivered.
   *
   * `error` and `mail` are deliberately excluded. Both ask the visitor to do
   * something — retry, or write to the address directly if their mail client
   * never opened — and a prompt that removes itself before it is acted on is
   * worse than one that overstays. Only the state that needs nothing from
   * anyone expires.
   */
  useEffect(() => {
    if (status !== "sent") return;

    // 300ms of fade after 8s of full opacity. The removal timer is the sum, so
    // the node leaves the tree exactly as the transition lands rather than
    // snapping away mid-fade. Under `prefers-reduced-motion` globals.css
    // collapses every transition to 0.01ms, so the message simply vanishes at
    // 8s and the extra 300ms is imperceptible.
    const fade = setTimeout(() => setFading(true), 8000);
    const clear = setTimeout(() => {
      setStatus("idle");
      setFading(false);
    }, 8300);

    // Cleanup matters here: submitting a second time re-enters `sent` while
    // the first pair of timers is still pending, and without this the older
    // `clear` would fire mid-message and blank the new confirmation early.
    return () => {
      clearTimeout(fade);
      clearTimeout(clear);
    };
  }, [status]);

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    // Clear the error as soon as the visitor starts fixing it
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (f: Fields) => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) next.name = "Please tell us your name.";
    if (!f.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!f.message.trim()) next.message = "Tell us briefly what you need.";
    else if (f.message.trim().length < 10) next.message = "A little more detail helps us reply properly.";
    return next;
  };

  const openMailFallback = (f: Fields) => {
    const body = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      f.company ? `Company: ${f.company}` : null,
      `Interested in: ${f.service}`,
      "",
      f.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href =
      `${MAILTO}?subject=${encodeURIComponent(`Project enquiry: ${f.service}`)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Cleared here rather than in the auto-dismiss effect, which is where it
       belongs conceptually but where it is a synchronous setState in an effect
       — a second render every time a confirmation appears. Every route to
       `sent` passes through this handler, so resetting once at the top covers
       a resubmit made while the previous confirmation is still fading out. */
    setFading(false);

    /* Honeypot tripped. Show the success state and send nothing: a bot that
       gets an error retries, a bot that gets a confirmation moves on. No real
       visitor can reach this branch — the input is `hidden`. */
    if (botcheck) {
      setStatus("sent");
      setFields(EMPTY);
      return;
    }

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      openMailFallback(fields);
      setStatus("mail");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : null),
          /* Web3Forms uses these to compose the notification mail. Without a
             subject every enquiry arrives titled "New Submission", which is
             unsortable once there are more than a handful; without from_name
             the sender column shows the service, not the person. Harmlessly
             ignored by any other form backend — they are just two more fields. */
          subject: `Project enquiry: ${fields.service}`,
          from_name: fields.name.trim(),
        }),
      });

      /* A form backend can answer 200 and still refuse the submission — a
         wrong access key, a suspended account, an exhausted quota. Web3Forms
         signals that with `success: false` in the body. Trusting `res.ok`
         alone would show the visitor a confirmation for mail that was never
         sent, which is the one failure mode worse than an error message.
         `.catch` covers a backend that answers with something other than JSON. */
      const data = await res.json().catch(() => null);
      if (!res.ok || (data && data.success === false)) {
        throw new Error(String(res.status));
      }

      setStatus("sent");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  // Ground: ivory-3, the same anchor value Solutions sits on. It was ivory-4
  // (resolving) — correct by the temperature scale for a closing section, but
  // Founder's Desk directly above is `m-ink`, so the eye arrives here from a
  // dark band with no memory of the ivory it left. Against ink, ivory-3 and
  // ivory-4 are indistinguishable anyway (ratio 1.01), so the step bought
  // nothing and cost the page its one repeated ground.
  //
  // `pb-16 md:pb-20` on the section below. The footer opens with its own
  // rhythm-1 and a hairline border, so rhythm-4's full bottom band stacked on
  // top of that put 224px of nothing between the Send button and the footer
  // logo — the largest empty band on the page, across an ivory-3 to ivory-5
  // step of ratio 1.02. globals.css records this pair being tightened once
  // already for the same reason; the border marks the boundary, not the gap.
  return (
    <section id="contact" ref={sectionRef} className="relative w-full overflow-hidden bg-ivory-3 rhythm-4 pb-16 md:pb-32">
      
      <div className="grid-page items-start relative z-10">
        <div className="seat-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: the pitch ── */}
          <div className="pt-8">
            <h2 className="t-h2 text-honey-3 font-display font-bold mb-6">
              Ready to upgrade your operations?
            </h2>

            <p className="t-body text-ink-3 measure-body mt-6 leading-relaxed">
              Describe the process that is held together by spreadsheets and follow-up
              calls. We will tell you honestly whether software is the answer, and what
              it would take to build.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "A reply within one working day",
                "A straight answer on scope and cost",
                "No obligation, and no sales sequence",
              ].map((line) => (
                <div key={line} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-honey-5/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-honey-5 shadow-[0_0_10px_rgba(255,180,0,0.8)]"></div>
                  </div>
                  <span className="t-body-s text-ink-3 font-medium tracking-wide">{line}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-ink-7">
              <p className="t-meta text-honey-5 uppercase tracking-widest mb-3">Registered office</p>
              <p className="t-body-s text-ink-3 leading-relaxed max-w-[300px]">{COMPANY_ADDRESS}</p>
            </div>

          </div>

          {/* ── Right: the form ── */}
          <div ref={panelRef} className="relative mt-8 lg:mt-0">
            {/* Mild Honey Glassmorphism backing card */}
            <div className="absolute inset-0 bg-gradient-to-br from-honey-2/70 to-honey-1/40 backdrop-blur-3xl rounded-[3rem] border-2 border-white/80 shadow-[0_30px_60px_rgba(255,180,0,0.08)] transform rotate-1 scale-[1.02] transition-transform hover:rotate-0"></div>
            
            <div className="relative bg-honey-1/70 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border-4 border-white/90 shadow-[0_20px_50px_rgba(212,163,42,0.1)] z-10">
            <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cf-name" className="block t-caption font-semibold text-ink-3 mb-2">
                    Your name <span className="text-honey-6">*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    value={fields.name}
                    onChange={set("name")}
                    autoComplete="name"
                    placeholder="Pooveandhan E."
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "cf-name-err" : undefined}
                    disabled={status === "sending" || status === "sent"}
                    className={`field rounded-2xl state bg-white/60 text-ink-2 border-2 border-white/80 placeholder-ink-4/50 focus:bg-white/90 focus:border-honey-5 focus:ring-1 focus:ring-honey-5/50 ${
                      errors.name ? "border-danger" : ""
                    }`}
                  />
                  {errors.name && (
                    <p id="cf-name-err" role="alert" className="mt-2 t-caption text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cf-email" className="block t-caption font-semibold text-ink-3 mb-2">
                    Email address <span className="text-honey-6">*</span>
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={set("email")}
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "cf-email-err" : undefined}
                    disabled={status === "sending" || status === "sent"}
                    className={`field rounded-2xl state bg-white/60 text-ink-2 border-2 border-white/80 placeholder-ink-4/50 focus:bg-white/90 focus:border-honey-5 focus:ring-1 focus:ring-honey-5/50 ${
                      errors.email ? "border-danger" : ""
                    }`}
                  />
                  {errors.email && (
                    <p id="cf-email-err" role="alert" className="mt-2 t-caption text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cf-company" className="block t-caption font-semibold text-ink-3 mb-2">
                    Company <span className="text-ink-4 font-normal">(optional)</span>
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    value={fields.company}
                    onChange={set("company")}
                    autoComplete="organization"
                    placeholder="Hivecrest Technologies"
                    className={`field rounded-2xl state bg-white/60 text-ink-2 border-2 border-white/80 placeholder-ink-4/50 focus:bg-white/90 focus:border-honey-5 focus:ring-1 focus:ring-honey-5/50`}
                  />
                </div>

                <div>
                  <label htmlFor="cf-service" className="block t-caption font-semibold text-ink-3 mb-2">
                    What do you need?
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    value={fields.service}
                    onChange={set("service")}
                    className={`field rounded-2xl state bg-white/60 text-ink-2 border-2 border-white/80 focus:bg-white/90 focus:border-honey-5 focus:ring-1 focus:ring-honey-5/50 cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-ink-2`}
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="cf-message" className="block t-caption font-semibold text-ink-3 mb-2">
                  What are you trying to fix? <span className="text-honey-6">*</span>
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={set("message")}
                  placeholder="Right now our team tracks orders in three spreadsheets and follows up on WhatsApp."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "cf-message-err" : undefined}
                  className={`field rounded-2xl state bg-white/60 text-ink-2 border-2 border-white/80 placeholder-ink-4/50 focus:bg-white/90 focus:border-honey-5 focus:ring-1 focus:ring-honey-5/50 resize-y min-h-[120px] ${
                    errors.message ? "border-danger" : ""
                  }`}
                />
                {errors.message && (
                  <p id="cf-message-err" role="alert" className="mt-2 t-caption text-danger">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot. Not rendered to anyone: a bot that fills every input
                  it finds fills this one too, and the submit handler drops the
                  enquiry silently — silently, because telling a bot it was
                  caught only teaches whoever wrote it to skip the field next
                  time.

                  `hidden` rather than off-screen positioning, so it is out of
                  the tab order and out of the accessibility tree — an
                  off-screen input is invisible to sighted visitors but still
                  announced to a screen reader, which turns an anti-spam trick
                  into a mystery field for the people least able to work around
                  it. `tabIndex={-1}` and `aria-hidden` belt-and-braces it for
                  any browser that treats `hidden` as merely visual.

                  Web3Forms recognises the name `botcheck` and rejects the
                  submission on its own side as well. */}
              <input
                type="checkbox"
                name="botcheck"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                hidden
                tabIndex={-1}
                aria-hidden
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary state rounded-full w-full sm:w-fit disabled:cursor-wait px-8 py-3 shadow-[0_0_20px_rgba(255,180,0,0.3)] hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] hover:-translate-y-1 transition-all duration-300 font-bold"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send enquiry
                    {/* Rule 08.6 — hover changes value, not position. */}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Outcome messages — announced to screen readers as they appear */}
              <div aria-live="polite">
                {status === "sent" && (
                  <p
                    className={`flex items-start gap-2 t-body-s text-success bg-success-wash cut-2 px-4 py-3
                                transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
                  >
                    <Check className="w-4 h-4 mt-0.5 text-honey-5 shrink-0" />
                    Thank you. Your enquiry is with us, and we reply within one working day.
                  </p>
                )}
                {status === "mail" && (
                  <p className="flex items-start gap-2 t-body-s text-success bg-success-wash cut-2 px-4 py-3">
                    <Check className="w-4 h-4 mt-0.5 text-honey-5 shrink-0" />
                    Your email app should open with the message ready. Press send and it
                    reaches us. If nothing opened, write to {CONTACT_EMAIL}.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-start gap-2 t-body-s text-danger bg-danger-wash cut-2 px-4 py-3">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    That didn&apos;t go through. Please try again, or email {CONTACT_EMAIL} directly.
                  </p>
                )}
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
