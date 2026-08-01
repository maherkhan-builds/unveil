import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Ornament from "./Ornament";
import SparkleField from "./SparkleField";
import type { ThemeDefinition } from "../config/themes";

interface NamesHeroProps {
  partnerOne: string;
  partnerTwo: string;
  tagline: string;
  theme: ThemeDefinition;
}

export default function NamesHero({ partnerOne, partnerTwo, tagline, theme }: NamesHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80svh] flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center"
      style={{ perspective: 1000 }}
    >
      <SparkleField count={16} />
      <motion.div
        style={{ rotateX, scale }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <p
          className="font-body text-xs tracking-[0.35em] uppercase sm:text-sm"
          style={{ color: "var(--color-text-soft)" }}
        >
          {tagline}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-script px-2 pb-2 leading-[1.15] text-6xl sm:text-7xl"
          style={{ color: "var(--color-primary)" }}
        >
          {partnerOne}
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-display text-2xl"
          style={{ color: "var(--color-secondary)" }}
        >
          &amp;
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="font-script px-2 pb-2 leading-[1.15] text-6xl sm:text-7xl"
          style={{ color: "var(--color-primary)" }}
        >
          {partnerTwo}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Ornament motif={theme.motif} className="mt-4 h-8 w-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
