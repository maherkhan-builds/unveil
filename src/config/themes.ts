export type ThemeId = "hindu" | "muslim" | "christian" | "universal";

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  /** Shown right after the envelope opens, before the couple's names. */
  blessing: {
    primary: string;
    translation?: string;
  };
  /** Decorative motif used to pick which SVG ornament set renders in each section. */
  motif: "mandala" | "geometric" | "floral" | "stars";
  /** Word used for the sealed element guests tap to reveal the date ("bud", "seal", "scroll"...). */
  sealLabel: string;
}

export const themes: Record<ThemeId, ThemeDefinition> = {
  hindu: {
    id: "hindu",
    label: "Hindu",
    blessing: {
      primary: "२ शुभ विवाह २",
      translation: "Ganpati Bappa Morya — blessings on this union",
    },
    motif: "mandala",
    sealLabel: "the diya",
  },
  muslim: {
    id: "muslim",
    label: "Muslim",
    blessing: {
      primary: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful",
    },
    motif: "geometric",
    sealLabel: "the crescent",
  },
  christian: {
    id: "christian",
    label: "Christian",
    blessing: {
      primary: "Two Souls, One Heart",
      translation: "“Love never fails.” — 1 Corinthians 13:8",
    },
    motif: "floral",
    sealLabel: "the wax seal",
  },
  universal: {
    id: "universal",
    label: "Universal",
    blessing: {
      primary: "Together, With Joy",
      translation: "Two hearts, one beautiful beginning",
    },
    motif: "stars",
    sealLabel: "the seal",
  },
};

export const themeOrder: ThemeId[] = ["hindu", "muslim", "christian", "universal"];
