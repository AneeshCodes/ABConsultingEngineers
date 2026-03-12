/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0D0D12',
                accent: '#C9A84C',
                background: '#FAF8F5',
                textDark: '#2A2A35'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                drama: ['"Playfair Display"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'reverse-spin': 'reverse-spin 16s linear infinite',
                'scan-horizontal': 'scan-horizontal 2s ease-in-out infinite alternate',
            },
            keyframes: {
                'reverse-spin': {
                    from: { transform: 'rotate(360deg)' },
                    to: { transform: 'rotate(0deg)' }
                },
                'scan-horizontal': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(300px)' }
                }
            }
        },
    },
    plugins: [],
}
