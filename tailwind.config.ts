// tailwind.config.ts or tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{mdx,md}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.zinc.800"),
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.blue.800"),
              },
            },
            h1: {
              fontSize: theme("fontSize.4xl")[0],
              fontWeight: "700",
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontSize: theme("fontSize.3xl")[0],
              fontWeight: "700",
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.3"),
            },
            h3: {
              fontSize: theme("fontSize.2xl")[0],
              fontWeight: "600",
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.2"),
            },
            p: {
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("lineHeight.8"),
              marginBottom: theme("spacing.4"),
            },
            code: {
              backgroundColor: theme("colors.zinc.100"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.sm"),
              fontSize: theme("fontSize.sm")[0],
            },
            pre: {
              backgroundColor: theme("colors.zinc.900"),
              color: theme("colors.zinc.100"),
              borderRadius: theme("borderRadius.lg"),
              padding: theme("spacing.6"),
            },
            blockquote: {
              borderLeftColor: theme("colors.zinc.300"),
              fontStyle: "italic",
              paddingLeft: theme("spacing.4"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
