import { useEffect, useState } from "react";
import { inviteConfig } from "./config/invite.config";
import { themes, type ThemeId } from "./config/themes";
import Cover from "./components/Cover";
import OpeningBlessing from "./components/OpeningBlessing";
import NamesHero from "./components/NamesHero";
import DateReveal from "./components/DateReveal";
import MapSection from "./components/MapSection";
import RSVP from "./components/RSVP";
import MusicToggle from "./components/MusicToggle";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Ornament from "./components/Ornament";

function getInitialTheme(): ThemeId {
  const param = new URLSearchParams(window.location.search).get("theme");
  if (param && param in themes) return param as ThemeId;
  return inviteConfig.theme;
}

export default function App() {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme);
  const [opened, setOpened] = useState(false);
  const theme = themes[themeId];

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  function handleThemeChange(id: ThemeId) {
    setThemeId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("theme", id);
    window.history.replaceState({}, "", url);
  }

  return (
    <div data-theme={themeId} className="relative">
      <ThemeSwitcher current={themeId} onChange={handleThemeChange} />
      <Cover
        partnerOne={inviteConfig.partnerOne}
        partnerTwo={inviteConfig.partnerTwo}
        onOpen={() => setOpened(true)}
      />
      <MusicToggle src={inviteConfig.music?.src} armed={opened} />

      <main>
        <OpeningBlessing theme={theme} />
        <NamesHero
          partnerOne={inviteConfig.partnerOne}
          partnerTwo={inviteConfig.partnerTwo}
          tagline={inviteConfig.tagline}
          theme={theme}
        />

        {inviteConfig.heroPhoto && (
          <section className="flex flex-col items-center px-6 py-10">
            <div
              className="h-72 w-72 overflow-hidden rounded-full border-4 sm:h-80 sm:w-80"
              style={{ borderColor: "var(--color-secondary)" }}
            >
              <img
                src={inviteConfig.heroPhoto}
                alt={`${inviteConfig.partnerOne} & ${inviteConfig.partnerTwo}`}
                className="h-full w-full object-cover"
              />
            </div>
          </section>
        )}

        <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
          <Ornament motif={theme.motif} className="h-8 w-32" />
          <p
            className="font-body max-w-xl text-lg italic leading-relaxed"
            style={{ color: "var(--color-text-soft)" }}
          >
            {inviteConfig.note}
          </p>
        </section>

        <DateReveal
          weddingDate={inviteConfig.weddingDate}
          events={inviteConfig.events}
          theme={theme}
        />
        <MapSection events={inviteConfig.events} />
        <RSVP
          rsvp={inviteConfig.rsvp}
          partnerOne={inviteConfig.partnerOne}
          partnerTwo={inviteConfig.partnerTwo}
        />

        <footer className="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <Ornament motif={theme.motif} className="h-8 w-32" />
          <p className="font-script text-3xl" style={{ color: "var(--color-primary)" }}>
            {inviteConfig.partnerOne} &amp; {inviteConfig.partnerTwo}
          </p>
          <p className="font-body text-sm" style={{ color: "var(--color-text-soft)" }}>
            See you there
          </p>
        </footer>
      </main>
    </div>
  );
}
