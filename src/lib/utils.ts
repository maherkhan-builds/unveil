import type { WeddingEvent } from "../config/invite.config";

export function formatLongDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function mapEmbedSrc(event: WeddingEvent): string {
  if (event.mapEmbedSrc) return event.mapEmbedSrc;
  const q = encodeURIComponent(event.address);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export function directionsUrl(event: WeddingEvent): string {
  if (event.directionsUrl) return event.directionsUrl;
  const q = encodeURIComponent(event.address);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}
