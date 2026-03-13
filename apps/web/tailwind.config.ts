import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b0d',
        gold: '#f1c232',
        red: '#c0161d',
        redDark: '#8f1116'
      }
    }
  },
  plugins: []
};

export default config;
