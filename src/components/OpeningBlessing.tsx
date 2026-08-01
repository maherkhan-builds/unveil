import { motion } from "framer-motion";
import type { ThemeDefinition } from "../config/themes";
import Ornament from "./Ornament";
import SparkleField from "./SparkleField";

interface OpeningBlessingProps {
  theme: ThemeDefinition;
}

/** Short, respectful religion-specific moment shown right after the envelope opens. */
export default function OpeningBlessing({ theme }: OpeningBlessingProps) {
  return (
    <section className="relative flex min-h-[60svh] flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center">
      <SparkleField count={12} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <Ornament motif={theme.motif} className="mx-auto mb-6 h-8 w-32" />
        <p
          className="font-blessing text-3xl leading-relaxed sm:text-4xl"
          style={{ color: "var(--color-primary)" }}
        >
          {theme.blessing.primary}
        </p>
        {theme.blessing.translation && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-body mt-4 text-base italic"
            style={{ color: "var(--color-text-soft)" }}
          >
            {theme.blessing.translation}
          </motion.p>
        )}
        <Ornament motif={theme.motif} className="mx-auto mt-6 h-8 w-32 rotate-180" />
      </motion.div>
    </section>
  );
}
