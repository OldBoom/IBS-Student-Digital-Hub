import type { Config } from 'tailwindcss'

// TailwindCSS configuration.
// Extend theme here: custom colors, fonts, spacing tokens.
// Add plugins (e.g. @tailwindcss/typography) when needed.
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
