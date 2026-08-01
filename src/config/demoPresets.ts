import type { InviteConfig } from "./invite.config";
import type { ThemeId } from "./themes";

// ---------------------------------------------------------------------------
// Demo-only sample data, one full couple per theme, used by the live hosted
// showcase so flipping themes with the switcher shows a complete, coherent
// card each time (not just recolored text). Safe to delete for a real
// deployment — real use only needs src/config/invite.config.ts.
// ---------------------------------------------------------------------------
export const demoPresets: Record<ThemeId, InviteConfig> = {
  hindu: {
    theme: "hindu",
    partnerOne: "Priya",
    partnerTwo: "Arjun",
    tagline: "together with their families, invite you to their wedding",
    weddingDate: "2026-03-10",
    heroPhoto: "",
    note:
      "With the blessings of our elders and the grace of the divine, we begin our journey together. Your presence would make our celebration complete.",
    events: [
      {
        name: "Haldi & Mehendi",
        date: "2026-03-08",
        time: "10:00 AM",
        venue: "The Marigold Courtyard",
        address: "21 Lotus Lane, Jaipur, India",
      },
      {
        name: "Sangeet Night",
        date: "2026-03-09",
        time: "7:00 PM",
        venue: "Royal Vatika Lawns",
        address: "9 Palace Road, Jaipur, India",
      },
      {
        name: "Vivah Ceremony",
        date: "2026-03-10",
        time: "11:30 AM",
        venue: "Amber Heritage Hall",
        address: "9 Palace Road, Jaipur, India",
      },
    ],
    rsvp: { enabled: true, formEndpoint: "", notifyEmail: "yourname@example.com" },
    music: { src: "/audio/gayatri-mantra.mp3", title: "Gayatri Mantra" },
  },
  muslim: {
    theme: "muslim",
    partnerOne: "Zainab",
    partnerTwo: "Imran",
    tagline: "request the honour of your presence at their Nikah",
    weddingDate: "2026-02-14",
    heroPhoto: "",
    note:
      "By the grace of Allah, we are beginning our journey together and would be blessed to have you share this joy with us.",
    events: [
      {
        name: "Nikah Ceremony",
        date: "2026-02-14",
        time: "11:00 AM",
        venue: "Noor Banquet Hall",
        address: "45 Crescent Road, Bandra, Mumbai, India",
      },
      {
        name: "Walima Reception",
        date: "2026-02-15",
        time: "7:30 PM",
        venue: "Al Zahra Gardens",
        address: "88 Marine Drive, Mumbai, India",
      },
    ],
    rsvp: { enabled: true, formEndpoint: "", notifyEmail: "yourname@example.com" },
    music: { src: "/audio/dua-bismillah.mp3", title: "Bismillahi Arqeek" },
  },
  christian: {
    theme: "christian",
    partnerOne: "Grace",
    partnerTwo: "Michael",
    tagline: "together with their families request the pleasure of your company",
    weddingDate: "2026-06-20",
    heroPhoto: "",
    note:
      "Two souls, one heart. We would be honoured to have you join us as we begin this new chapter together.",
    events: [
      {
        name: "Wedding Ceremony",
        date: "2026-06-20",
        time: "4:00 PM",
        venue: "St. Anne's Chapel",
        address: "14 Church Street, Goa, India",
      },
      {
        name: "Reception",
        date: "2026-06-20",
        time: "7:00 PM",
        venue: "Seaside Manor",
        address: "2 Coastal Road, Goa, India",
      },
    ],
    rsvp: { enabled: true, formEndpoint: "", notifyEmail: "yourname@example.com" },
    music: { src: "", title: "" },
  },
  universal: {
    theme: "universal",
    partnerOne: "Aisha",
    partnerTwo: "Rohan",
    tagline: "are getting married",
    weddingDate: "2026-04-18",
    heroPhoto: "",
    note:
      "With hearts full of joy, we invite you to celebrate the beginning of our forever. Your presence would mean the world to us.",
    events: [
      {
        name: "Wedding Ceremony",
        date: "2026-04-18",
        time: "11:00 AM",
        venue: "Sunset Palace Lawns",
        address: "88 Marine Drive, Mumbai, India",
      },
      {
        name: "Reception",
        date: "2026-04-18",
        time: "7:30 PM",
        venue: "Sunset Palace Ballroom",
        address: "88 Marine Drive, Mumbai, India",
      },
    ],
    rsvp: { enabled: true, formEndpoint: "", notifyEmail: "yourname@example.com" },
    music: { src: "", title: "" },
  },
};
