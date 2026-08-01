import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import type { InviteConfig } from "../config/invite.config";

interface RSVPProps {
  rsvp: InviteConfig["rsvp"];
  partnerOne: string;
  partnerTwo: string;
}

type Status = "idle" | "submitting" | "sent" | "error";

export default function RSVP({ rsvp, partnerOne, partnerTwo }: RSVPProps) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  if (!rsvp.enabled) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("attending", attending ?? "");

    if (rsvp.formEndpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(rsvp.formEndpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: no backend configured, open a prefilled email to the couple.
    const name = String(data.get("name") ?? "");
    const guests = String(data.get("guests") ?? "1");
    const message = String(data.get("message") ?? "");
    const to = rsvp.notifyEmail ?? "";
    const subject = encodeURIComponent(`RSVP from ${name}`);
    const body = encodeURIComponent(
      `${name} ${attending === "yes" ? "will joyfully attend" : "regretfully declines"}.\nGuests: ${guests}\nMessage: ${message}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <section className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-2xl"
          style={{ color: "var(--color-primary)" }}
        >
          Thank you — we can't wait to celebrate with you!
        </motion.p>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center gap-8 px-6 py-20 text-center">
      <div>
        <p
          className="font-body text-sm tracking-[0.35em] uppercase"
          style={{ color: "var(--color-text-soft)" }}
        >
          RSVP
        </p>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>
          Will you be joining {partnerOne} &amp; {partnerTwo}?
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4 text-left">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-md border bg-transparent px-4 py-3 font-body outline-none"
          style={{ borderColor: "var(--color-secondary)", color: "var(--color-text)" }}
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAttending("yes")}
            className="flex-1 rounded-full border px-4 py-2 font-body text-sm transition"
            style={{
              borderColor: "var(--color-primary)",
              background: attending === "yes" ? "var(--color-primary)" : "transparent",
              color: attending === "yes" ? "var(--color-bg)" : "var(--color-primary)",
            }}
          >
            Joyfully Accepts
          </button>
          <button
            type="button"
            onClick={() => setAttending("no")}
            className="flex-1 rounded-full border px-4 py-2 font-body text-sm transition"
            style={{
              borderColor: "var(--color-primary)",
              background: attending === "no" ? "var(--color-primary)" : "transparent",
              color: attending === "no" ? "var(--color-bg)" : "var(--color-primary)",
            }}
          >
            Regretfully Declines
          </button>
        </div>

        <input
          name="guests"
          type="number"
          min={1}
          defaultValue={1}
          placeholder="Number of guests"
          className="rounded-md border bg-transparent px-4 py-3 font-body outline-none"
          style={{ borderColor: "var(--color-secondary)", color: "var(--color-text)" }}
        />

        <textarea
          name="message"
          placeholder="A note for the couple (optional)"
          rows={3}
          className="rounded-md border bg-transparent px-4 py-3 font-body outline-none"
          style={{ borderColor: "var(--color-secondary)", color: "var(--color-text)" }}
        />

        <button
          type="submit"
          disabled={!attending || status === "submitting"}
          className="rounded-full px-6 py-3 font-body text-sm uppercase tracking-widest transition disabled:opacity-50"
          style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
        >
          {status === "submitting" ? "Sending…" : "Send RSVP"}
        </button>

        {status === "error" && (
          <p className="font-body text-sm" style={{ color: "var(--color-accent)" }}>
            Something went wrong — please try again.
          </p>
        )}
      </form>
    </section>
  );
}
