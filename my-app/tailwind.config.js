/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        heading1: [
          '72px',
          {
            lineHeight: '94px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-2.16px'
          }
        ],
        heading2: [
          '48px',
          {
            lineHeight: '60px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-1.44px'
          }
        ],
        heading3: [
          '32px',
          {
            lineHeight: '48px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.96px'
          }
        ],
        heading4: [
          '24px',
          {
            lineHeight: '36px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.72px'
          }
        ],
        heading5: [
          '20px',
          {
            lineHeight: '30px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.6px'
          }
        ],
        heading6: [
          '18px',
          {
            lineHeight: '27px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.54px'
          }
        ],
        subTitle1: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.48px'
          }
        ],
        subTitle2: [
          '14px',
          {
            lineHeight: '21px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.42px'
          }
        ],
        body1: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '500',
            fontFamily: 'Inter',
            letterSpacing: '-0.48px'
          }
        ],
        body2: [
          '14px',
          {
            lineHeight: '21px',
            fontWeight: '500',
            fontFamily: 'Inter',
            letterSpacing: '-0.42px'
          }
        ],
        caption: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '500',
            fontFamily: 'Inter',
            letterSpacing: '-0.36px'
          }
        ],
        captionCaps: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '500',
            fontFamily: 'Inter',
            letterSpacing: '-0.36px',
            textTransform: 'uppercase'
          }
        ],
        label: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '600',
            fontFamily: 'Inter',
            letterSpacing: '-0.36px',
            textTransform: 'uppercase'
          }
        ],
        overline: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '700',
            fontFamily: 'Inter',
            letterSpacing: '-0.36px',
            textTransform: 'uppercase'
          }
        ]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        tWhite: {
          default: '#EEE',
          100: '#EEE',
          90: '#D1D2D3',
          80: '#ABABAD',
          70: '#9A9A9D',
          60: '#7B7C7E'
        },
        bBlack: {
          default: '#0F1115',
          100: '#0F1115',
          90: '#181A1F',
          80: '#1F2125',
          70: '#27292D',
          60: '#3D3E42',
          50: '#EEE'
        },
        primary: '#ffff',
        black: '#080808',
        grey: {
          90: '#333333',
          75: '#4F4F4F',
          65: '#595959',
          50: '#808080',
          40: '#BDBDBD',
          25: '#E0E0E0',
          10: '#F2F2F2'
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}