export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface':               '#0f150e',
        'surface-dim':           '#0a1009',
        'surface-card':          '#1E3B20',
        'surface-container':     '#1b211a',
        'primary':               '#78dc77',
        'on-primary':            '#00390a',
        'primary-container':     '#4caf50',
        'on-surface':            '#dee4d9',
        'on-surface-variant':    '#becab9',
        'outline-variant':       '#3f4a3c',
        'text-muted':            '#A5D6A7',
        'karma-gold':            '#FFD700',
        'footer-black':          '#0F1A0F',
        'sdg-3':                 '#4C9F38',
        'sdg-6':                 '#26BDE2',
        'sdg-7':                 '#FCC30B',
        'sdg-11':                '#FD9D24',
        'sdg-13':                '#3F7E44',
        'sdg-15':                '#56C02B',
        'sdg-17':                '#d64040'
                                  #7a9a7e
                                  #2d6a35
                                  #2d6a35
                                  #f5a623
                                  #d64040
                                  #d64040
                                  
    

      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}