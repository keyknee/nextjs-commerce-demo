const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        community: "url('../assets/images/community1.jpg')",
        'textured-gold': "url('../assets/images/gold_textured_bg.jpg')",
        'gradient-theme-primary':
          'linear-gradient(90deg, rgba(93,3,3,1) 0%, rgba(174,16,16,1) 50%, rgba(93,3,3,1) 100%)',
        'gradient-theme-primary-75':
          'linear-gradient(90deg, rgba(93,3,3,.75) 0%, rgba(174,16,16,.75) 50%, rgba(93,3,3,.75) 100%)',
        'textured-gold': "url('../assets/images/gold_textured_bg.jpg')",
        'gradient-theme-secondary':
          'linear-gradient(60deg, rgba(225,194,49,1) 0%, rgba(232,205,79,1) 50%, rgba(225,194,49,1) 100%)',
        'gradient-theme-secondary-75':
          'linear-gradient(60deg, #715e06bf 0%, #3d3304bf 20%, #3d3304bf 60%, #715e06bf 100%)',
        'radial-dark':
          'radial-gradient(ellipse closest-side, rgba(0,0,0,0.0) 16%, rgba(23,23,23,1) 95%)',
        'radial-light': 'radial-gradient(ellipse closest-side, rgba(0, 0, 0, 0.0) 16%, #f5f5f5 95%)'
      },
      colors: {
        'theme-primary': '#df1414',
        'theme-secondary': '#D4AF37'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        'decorative-serif': ['var(--font-literata)'],
        'decorative-script': ['var(--font-ballet)'],
        icon: 'MaterialIcon'
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
      spacing: {
        video: 'calc((100vw/16) * 9)',
        portrait: 'calc((100vw/9) * 16)'
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
          backgroundSize: '100vw',
          backgroundRepeat: 'no-repeat'
        },
        '.embla-touch': {
          touchAction: 'pan-y pinch-zoom'
        },
        '.font-small-caps': {
          fontVariant: 'small-caps'
        },
        '.hashtag::before': {
          content: ''
        },
        '.text-shadow-sm': {
          textShadow: '1px 2px 3px black'
        },
        '.text-shadow-tiny': {
          textShadow: '0px 1px 1px black'
        },
        '.traslate3d-start': {
          transform: 'translate3d(0, 0, 0)'
        },
        '.video-vignette': {
          background:
            'linear-gradient(0deg, #171717 4%, transparent 15%, transparent 85%, #171717 96%)'
        }
      });
    })
  ]
};
