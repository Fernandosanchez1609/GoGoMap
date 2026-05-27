export default {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#0f150e',
        'surface-dim': '#0a1009',
        'surface-card': '#1E3B20',
        'surface-container': '#1b211a',
        primary: '#22c55e',
        'on-primary': '#00390a',
        'primary-container': '#4caf50',
        'on-surface': '#0f172a',
        'on-surface-variant': '#4b5563',
        'outline-variant': '#374151',
        'text-muted': '#6b7280',
        'karma-gold': '#FFD700',
        'footer-black': '#0F1A0F',
        'sdg-3': '#4C9F38',
        'sdg-6': '#26BDE2',
        'sdg-7': '#FCC30B',
        'sdg-11': '#FD9D24',
        'sdg-13': '#3F7E44',
        'sdg-15': '#56C02B',
        'sdg-17': '#d64040'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}