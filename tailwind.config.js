const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'page-header-img': "url('/assets/images/home-image.png')",
        'gradient-theme-primary':
          'linear-gradient(90deg, rgba(93,3,3,1) 0%, rgba(174,16,16,1) 50%, rgba(93,3,3,1) 100%)'
      },
      colors: {
        'theme-primary': '#df1414',
        'theme-secondary': '#F1DD80'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        'decorative-serif': ['var(--font-literata)'],
        'decorative-script': ['var(--font-ballet)']
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        }
      },
      letterSpacing: {
        tightest: '-.075em'
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    }),
    plugin(({ addComponents }) => {
      addComponents({
        '.bg-full-fill': {
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        },
        '.font-small-caps': {
          fontVariant: 'small-caps'
        },
        '.text-shadow-sm': {
          textShadow: '1px 2px 3px black'
        }
      });
    })
  ]
};
