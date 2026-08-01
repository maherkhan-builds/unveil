import type { InviteConfig } from "../config/invite.config";

/**
 * Lets anyone generate a personalized shareable link without forking the repo —
 * e.g. ?theme=hindu&p1=Priya&p2=Arjun&date=2026-03-10&venue=The+Grand+Hall&address=...
 * Only overrides top-line details (names/date/first venue/note/photo); for a full
 * multi-event schedule, fork the repo and edit src/config/invite.config.ts.
 */
export function applyUrlOverrides(config: InviteConfig): InviteConfig {
  const params = new URLSearchParams(window.location.search);
  const p1 = params.get("p1");
  const p2 = params.get("p2");
  const date = params.get("date");
  const venue = params.get("venue");
  const address = params.get("address");
  const note = params.get("note");
  const photo = params.get("photo");

  if (!p1 && !p2 && !date && !venue && !address && !note && !photo) {
    return config;
  }

  return {
    ...config,
    partnerOne: p1 ?? config.partnerOne,
    partnerTwo: p2 ?? config.partnerTwo,
    weddingDate: date ?? config.weddingDate,
    heroPhoto: photo ?? config.heroPhoto,
    note: note ?? config.note,
    events: config.events.map((event, i) =>
      i === 0
        ? {
            ...event,
            date: date ?? event.date,
            venue: venue ?? event.venue,
            address: address ?? event.address,
          }
        : event,
    ),
  };
}
