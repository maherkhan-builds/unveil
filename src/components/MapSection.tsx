import { motion } from "framer-motion";
import type { WeddingEvent } from "../config/invite.config";
import { mapEmbedSrc, directionsUrl } from "../lib/utils";

interface MapSectionProps {
  events: WeddingEvent[];
}

export default function MapSection({ events }: MapSectionProps) {
  return (
    <section className="flex flex-col items-center gap-14 px-6 py-24">
      <p
        className="font-body text-sm tracking-[0.35em] uppercase"
        style={{ color: "var(--color-text-soft)" }}
      >
        Find your way to us
      </p>
      <div className="flex w-full max-w-3xl flex-col gap-14">
        {events.map((event, i) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-2xl" style={{ color: "var(--color-primary)" }}>
                {event.venue}
              </h3>
              <p className="font-body text-sm" style={{ color: "var(--color-text-soft)" }}>
                {event.name} · {event.address}
              </p>
            </div>
            <div
              className="overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--color-secondary)" }}
            >
              <iframe
                title={`Map for ${event.venue}`}
                src={mapEmbedSrc(event)}
                loading="lazy"
                className="h-64 w-full"
                style={{ border: 0 }}
              />
            </div>
            <a
              href={directionsUrl(event)}
              target="_blank"
              rel="noreferrer"
              className="font-body self-start rounded-full border px-5 py-2 text-sm transition hover:opacity-80"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
            >
              Get Directions →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
