import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                DEFAULT: '#31509e',
                bg: '#fefefe',
                },
                danger: 'rgb(242, 73, 73)',
            },
            borderRadius: {
                card: '1.5rem',
            },
        },
    },
    plugins: [],
}

export default config