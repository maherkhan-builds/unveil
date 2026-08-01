import { useEffect, useRef, useState } from "react";

interface MusicToggleProps {
  src?: string;
  /** Flips to true the moment the guest taps the envelope open (a valid audio-unlock gesture). */
  armed: boolean;
}

export default function MusicToggle({ src, armed }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!armed || !src || !audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [armed, src]);

  if (!src) return null;

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true));
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 items-center justify-center rounded-full border shadow-sm backdrop-blur"
        style={{
          borderColor: "var(--color-secondary)",
          background: "var(--color-bg-soft)",
          color: "var(--color-primary)",
        }}
      >
        {playing ? "♪" : "♫"}
      </button>
    </div>
  );
}
