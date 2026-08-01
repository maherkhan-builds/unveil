import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Ornament from "./Ornament";
import type { ThemeDefinition } from "../config/themes";

interface NamesHeroProps {
  partnerOne: string;
  partnerTwo: string;
  tagline: string;
  theme: ThemeDefinition;
}

function AnimatedName({ text, delayBase = 0 }: { text: string; delayBase?: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 24, rotateZ: -4 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: delayBase + i * 0.04, duration: 0.5, ease: "easeOut" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function NamesHero({ partnerOne, partnerTwo, tagline, theme }: NamesHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <section
      ref={ref}
      className="flex min-h-[90svh] flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, scale }} className="flex flex-col items-center gap-4">
        <p
          className="font-body text-sm tracking-[0.35em] uppercase"
          style={{ color: "var(--color-text-soft)" }}
        >
          {tagline}
        </p>
        <h1
          className="font-script text-6xl leading-tight sm:text-8xl"
          style={{ color: "var(--color-primary)" }}
        >
          <AnimatedName text={partnerOne} />
        </h1>
        <span className="font-display text-3xl" style={{ color: "var(--color-secondary)" }}>
          &amp;
        </span>
        <h1
          className="font-script text-6xl leading-tight sm:text-8xl"
          style={{ color: "var(--color-primary)" }}
        >
          <AnimatedName text={partnerTwo} delayBase={partnerOne.length * 0.04 + 0.3} />
        </h1>
        <Ornament motif={theme.motif} className="mt-6 h-8 w-40" />
      </motion.div>
    </section>
  );
}
