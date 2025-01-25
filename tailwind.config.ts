import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
const { heroui } = require('@heroui/react');

export default {
    darkMode: ['class'],
    content: [
        './src/**/*.tsx',
        './@/**/*.{ts,tsx}', // <- HERE
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'row-start-1',
        'row-start-2',
        'row-start-3',
        'row-start-4',
        'row-start-5',
        'row-start-6',
        'col-start-1',
        'col-start-2',
        'col-start-3',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', ...fontFamily.sans],
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
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [heroui(), require('tailwindcss-animate')],
} satisfies Config;
