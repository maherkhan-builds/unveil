import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { WeddingEvent } from "../config/invite.config";
import type { ThemeDefinition } from "../config/themes";
import { formatLongDate } from "../lib/utils";
import Ornament from "./Ornament";

interface DateRevealProps {
  weddingDate: string;
  events: WeddingEvent[];
  theme: ThemeDefinition;
}

export default function DateReveal({ weddingDate, events, theme }: DateRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="flex min-h-[90svh] flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      <p
        className="font-body text-sm tracking-[0.35em] uppercase"
        style={{ color: "var(--color-text-soft)" }}
      >
        Save the date
      </p>

      {!revealed ? (
        <motion.button
          type="button"
          onClick={() => setRevealed(true)}
          className="flex flex-col items-center gap-4"
          whileTap={{ scale: 0.92 }}
        >
          <motion.div
            className="flex h-28 w-28 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--color-secondary)", background: "var(--color-bg-soft)" }}
            animate={{ boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 24px var(--color-secondary)", "0 0 0 rgba(0,0,0,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Ornament motif={theme.motif} className="h-10 w-16" />
          </motion.div>
          <span className="font-body text-base italic" style={{ color: "var(--color-text-soft)" }}>
            Tap {theme.sealLabel} to reveal our date
          </span>
        </motion.button>
      ) : (
        <motion.h2
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="font-display text-3xl sm:text-5xl"
          style={{ color: "var(--color-primary)" }}
        >
          {formatLongDate(weddingDate)}
        </motion.h2>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 flex w-full max-w-2xl flex-col gap-6"
          >
            {events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="flex flex-col gap-1 border-t pt-4 text-left sm:flex-row sm:items-baseline sm:justify-between"
                style={{ borderColor: "var(--color-secondary)" }}
              >
                <div>
                  <p className="font-display text-xl" style={{ color: "var(--color-primary)" }}>
                    {event.name}
                  </p>
                  <p className="font-body text-sm" style={{ color: "var(--color-text-soft)" }}>
                    {event.venue}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-body text-sm" style={{ color: "var(--color-text)" }}>
                    {formatLongDate(event.date)}
                  </p>
                  <p className="font-body text-sm" style={{ color: "var(--color-text-soft)" }}>
                    {event.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
