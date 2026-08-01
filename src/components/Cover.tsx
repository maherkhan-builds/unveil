import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SparkleField from "./SparkleField";

interface CoverProps {
  partnerOne: string;
  partnerTwo: string;
  onOpen: () => void;
}

export default function Cover({ partnerOne, partnerTwo, onOpen }: CoverProps) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const sfxRef = useRef<HTMLAudioElement>(null);

  function handleTap() {
    if (opening) return;
    setOpening(true);
    sfxRef.current?.play().catch(() => {});
    onOpen();
    window.setTimeout(() => setVisible(false), 1000);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="card-texture fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <audio ref={sfxRef} src="audio/envelope-sparkle.mp3" />
          <SparkleField count={opening ? 28 : 16} />

          <motion.button
            type="button"
            onClick={handleTap}
            className="relative z-10 flex flex-col items-center gap-6 px-10 py-14 outline-none"
            animate={
              opening
                ? { rotateX: 100, y: -40, opacity: 0, scale: 0.9 }
                : { rotateX: 0, y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="flex h-40 w-56 items-center justify-center border-2"
              style={{
                borderColor: "var(--color-secondary)",
                background: "var(--color-bg-soft)",
                boxShadow: "0 0 0 1px var(--color-silver), 0 12px 32px rgba(0,0,0,0.15)",
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 100 60" className="h-24 w-40" aria-hidden="true">
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="56"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 2 L50 36 L98 2"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="30" r="7" fill="var(--color-secondary)" stroke="var(--color-primary)" strokeWidth="1" />
              </svg>
            </motion.div>
            <span
              className="font-script text-3xl"
              style={{ color: "var(--color-primary)" }}
            >
              {partnerOne} &amp; {partnerTwo}
            </span>
            <motion.span
              className="font-body text-base tracking-[0.2em] uppercase"
              style={{ color: "var(--color-text-soft)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to open
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
