/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(20, 20, 20, 0.12)',
        glow: '0 10px 30px rgba(74, 93, 67, 0.2)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};
