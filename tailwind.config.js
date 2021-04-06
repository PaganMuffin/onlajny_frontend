const { green, purple } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            red: colors.rose,
            indigo: colors.indigo,
            purple: colors.purple
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
        
            'md': '768px',
            // => @media (min-width: 768px) { ... }
        
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
        
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
        
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                bg_dark:'#121212'
            },
            backgroundOpacity: {
                '8':'0.08'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
