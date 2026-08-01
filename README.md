<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Unveil&fontSize=60&fontColor=ffffff&animation=fadeIn&desc=A%20scroll-driven%20digital%20wedding%20invitation%20template&descAlignY=62&descSize=18" width="100%" />

<a href="https://readme-typing-svg.demolab.com">
  <img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&size=20&pause=1000&color=C8A24A&center=true&vCenter=true&width=600&lines=Tap+to+open...;Scroll+to+reveal+names%2C+date%2C+venue;Hindu+%C2%B7+Muslim+%C2%B7+Christian+%C2%B7+Universal+themes;Fork+it.+Edit+one+file.+Ship+your+invite." alt="Typing SVG" />
</a>

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

### 🔴 [Live Demo →](https://maherkhan-builds.github.io/unveil/)

</div>

## The Problem

Custom animated wedding invitation sites (the kind that go viral on Instagram — tap the
envelope, scroll through a cinematic reveal of the couple's names, tap to unlock the date,
see the venue on a map, RSVP with one tap) are normally either:

- built once by an agency for a few hundred dollars, non-reusable, or
- a generic template that ignores religious/cultural context — no dua, no mandala,
  no blessing verse, just a flat "modern minimalist" look that doesn't feel like *your*
  wedding.

## The Solution

**Unveil** is a single, open-source, config-driven template. Edit one file
([`src/config/invite.config.ts`](src/config/invite.config.ts)) with the couple's names, wedding
date, events, and venue addresses — everything else (colors, fonts, the opening blessing,
decorative motifs, background music) follows automatically from a theme preset.

| Feature | Description |
|---|---|
| 🎁 Tap-to-open envelope | Full-screen cover that unlocks on first tap — also the gesture that unlocks background audio |
| 🙏 Religion-aware opening | A short, respectful blessing plays right after opening — dua for Muslim weddings, a Ganpati/Shubh Vivah moment for Hindu weddings, a scripture verse for Christian weddings, or a neutral "Together, With Joy" for a Universal theme |
| ✍️ Scroll-triggered names reveal | Bride & groom names animate in with a calligraphy stagger and subtle 3D scroll parallax |
| 🔓 Tap-to-reveal date & schedule | The date stays hidden behind a themed seal until tapped, then reveals every event (mehendi, nikah, ceremony, reception…) with its own venue and time |
| 🗺️ Real Google Maps per venue | Each event gets its own embedded map + a "Get Directions" deep link, generated automatically from the address |
| 💌 RSVP that notifies you | Guests tap Accept/Decline; submissions post to a form endpoint of your choice (or fall back to a prefilled email) |
| 🎨 4 built-in themes | `hindu` \| `muslim` \| `christian` \| `universal` — swap live with `?theme=`, each with its own full demo couple/schedule/music |
| ✨ Gold & silver glitter | Twinkling particle accents and a soft dot-texture card background, so no scroll gap ever reads as a blank void |
| 🔗 Shareable link, no forking needed | Override names/date/venue via URL params to generate a personalized card instantly |
| 📱 Mobile-first, card-framed | Full-bleed on mobile (built for WhatsApp sharing), a centered card on desktop instead of a stretched-out page |

## Try It Without Forking

Generate a personalized shareable link off the [live demo](https://maherkhan-builds.github.io/unveil/) —
no install, no fork:

```
https://maherkhan-builds.github.io/unveil/?theme=hindu&p1=Priya&p2=Arjun&date=2026-03-10&venue=The+Grand+Hall&address=12+Palace+Rd%2C+Jaipur
```

Supported params: `theme`, `p1`, `p2`, `date`, `venue`, `address`, `note`, `photo` (an image URL).
This overrides the top-line details only (names/date/first venue/note/photo) — for a full
multi-event schedule with your own colors and audio, fork the repo below.

## How to Use It

1. **Fork or clone this repo.**
2. Open [`src/config/invite.config.ts`](src/config/invite.config.ts) and fill in:
   - `theme` — `"hindu"`, `"muslim"`, `"christian"`, or `"universal"`
   - `partnerOne`, `partnerTwo`, `tagline`, `weddingDate`, `note`, `heroPhoto` (optional, shown in a circular frame)
   - `events[]` — one entry per function, each with `name`, `date`, `time`, `venue`, `address`
     (a Google Maps embed + directions link are generated from `address` automatically —
     or paste your own `mapEmbedSrc` for pixel-exact pin placement)
   - `rsvp.formEndpoint` — point this at a [Formspree](https://formspree.io) (or similar)
     endpoint so RSVPs land in your inbox; leave blank to fall back to a `mailto:` link
   - `music.src` — drop an MP3 into `public/audio/` and reference it here (optional)
3. `npm install && npm run dev` to preview.
4. Deploy anywhere static — GitHub Pages, Vercel, Netlify. Share the link.
   For GitHub Pages specifically: `npm run build && npx gh-pages -d dist`, then enable
   Pages on the `gh-pages` branch in repo settings. Keep asset paths in config
   (`music.src`, etc.) **without a leading slash** — a leading `/` resolves against the
   domain root and 404s once the site lives under a subpath like `github.io/your-repo/`.

Want a 5th theme? Add an entry to [`src/config/themes.ts`](src/config/themes.ts) (colors, font,
blessing text, motif) and it's immediately selectable.

## How It Works

- **Config-driven, not code-driven.** All couple-specific data lives in one typed config
  object — no need to touch component code to personalize an invite.
- **Theme = CSS variables.** Each theme sets `--color-primary`, `--color-secondary`,
  `--font-blessing`, etc. via a `data-theme` attribute on the root element
  ([`src/index.css`](src/index.css)). Components never hardcode colors — they read the
  variables, so every section reskins instantly when the theme changes.
- **Scroll storytelling via Framer Motion.** Sections use `whileInView` for entrance
  reveals and `useScroll`/`useTransform` for a subtle parallax/3D tilt as you scroll
  past the names section.
- **The envelope gesture doubles as the audio unlock.** Browsers block autoplaying audio
  until a user gesture — the "tap to open" tap *is* that gesture, so music starts cleanly.
- **Maps are generated, not hand-placed.** `src/lib/utils.ts` builds a Google Maps embed
  URL and a directions deep link straight from each event's `address`, unless you override
  it with your own `mapEmbedSrc`.

## Tech Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion 12

## Run Locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. Try `?theme=hindu`, `?theme=muslim`,
`?theme=christian`, or `?theme=universal` to preview each preset live.

## Keywords

digital wedding invitation, e-invite template, scroll wedding card, wedding RSVP website,
React wedding invitation, tap to open envelope animation, Hindu wedding invitation website,
Muslim nikah invitation site, Christian wedding invitation template, open source wedding e-card,
wedding website generator, Framer Motion scrollytelling

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%" />
