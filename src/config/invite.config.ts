import type { ThemeId } from "./themes";

export interface WeddingEvent {
  name: string;
  /** e.g. "2026-02-14" */
  date: string;
  time: string;
  venue: string;
  address: string;
  /**
   * Optional: paste a full Google Maps "Embed a map" <iframe> src here for pixel-exact
   * pin placement. If omitted, an embed is generated automatically from `address`.
   */
  mapEmbedSrc?: string;
  /** Optional: link used by the "Get Directions" button. Defaults to a Maps search for `address`. */
  directionsUrl?: string;
}

export interface InviteConfig {
  /** "hindu" | "muslim" | "christian" | "universal" — can be overridden live with ?theme= */
  theme: ThemeId;
  partnerOne: string;
  partnerTwo: string;
  tagline: string;
  /** Main wedding date, ISO format, used for the hero reveal + countdown. */
  weddingDate: string;
  heroPhoto?: string;
  note: string;
  events: WeddingEvent[];
  rsvp: {
    enabled: boolean;
    /**
     * A form endpoint (e.g. https://formspree.io/f/xxxxxxx) that emails submissions to you.
     * Leave blank to fall back to a mailto: link using `notifyEmail`.
     */
    formEndpoint?: string;
    notifyEmail?: string;
  };
  music?: {
    /** Path under /public, e.g. "/audio/theme-song.mp3". Leave unset to hide the music toggle. */
    src?: string;
    title?: string;
  };
}

// ---------------------------------------------------------------------------
// EDIT ME — this is the only file most people need to touch to make this
// their own invitation. Swap the sample data below, pick a theme, and the
// whole scroll experience (colors, fonts, opening blessing, motifs) updates
// automatically.
// ---------------------------------------------------------------------------
export const inviteConfig: InviteConfig = {
  theme: "universal",
  partnerOne: "Aisha",
  partnerTwo: "Rohan",
  tagline: "are getting married",
  weddingDate: "2026-02-14",
  heroPhoto: "",
  note:
    "With hearts full of joy, we invite you to celebrate the beginning of our forever. Your presence would mean the world to us.",
  events: [
    {
      name: "Mehendi & Sangeet",
      date: "2026-02-12",
      time: "6:00 PM",
      venue: "The Garden Pavilion",
      address: "12 Rose Avenue, Bandra, Mumbai, India",
    },
    {
      name: "Wedding Ceremony",
      date: "2026-02-14",
      time: "11:00 AM",
      venue: "Sunset Palace Lawns",
      address: "88 Marine Drive, Mumbai, India",
    },
    {
      name: "Reception",
      date: "2026-02-14",
      time: "7:30 PM",
      venue: "Sunset Palace Ballroom",
      address: "88 Marine Drive, Mumbai, India",
    },
  ],
  rsvp: {
    enabled: true,
    formEndpoint: "",
    notifyEmail: "yourname@example.com",
  },
  music: {
    src: "",
    title: "",
  },
};
