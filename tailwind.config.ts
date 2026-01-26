
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['PT Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        amber: 'hsl(var(--amber))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'deep-purple': 'hsl(var(--deep-purple))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'shake-sm': {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(2px)' },
            '75%': { transform: 'translateX(-2px)' },
        },
        'shake': {
          '10%, 90%': { transform: 'rotate(-3deg)' },
          '20%, 80%': { transform: 'rotate(3deg)' },
          '30%, 50%, 70%': { transform: 'rotate(-3deg)' },
          '40%, 60%': { transform: 'rotate(3deg)' },
        },
        'pulse-strong': {
            '0%, 100%': { transform: 'scale(1)', opacity: '1' },
            '50%': { transform: 'scale(1.25)', opacity: '0.75' },
        },
        'icon-fly-out': {
          '0%, 40%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-35px) rotate(-15deg)' },
          '100%': { transform: 'translateX(-500%) rotate(-90deg)', opacity: '0' },
        },
        'text-slide-in': {
          '0%, 40%': { transform: 'translateX(500%)', opacity: '0' },
          '60%': { transform: 'translateX(-10px)', opacity: '1' },
          '80%': { transform: 'translateX(5px)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'gradient-flow': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shake-sm': 'shake-sm 0.2s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'pulse-strong': 'pulse-strong 1.5s ease-in-out infinite',
        'icon-fly-out': 'icon-fly-out 0.8s ease-out forwards',
        'text-slide-in': 'text-slide-in 0.8s ease-out forwards',
        'gradient-flow': 'gradient-flow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
