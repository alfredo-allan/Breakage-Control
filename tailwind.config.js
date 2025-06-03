/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // seus arquivos React
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ffffff',    // Exemplo: cor primária do seu tema
                secondary: '#abcdef',  // cor secundária
                accent: '#ff9900',     // cor de destaque/acento
                background: '#f5f5f5', // fundo geral
                textPrimary: '#222222',// texto principal
                textSecondary: '#555555', // texto secundário
                footerBg: '#3700FF',   // fundo do footer
                headerBg: '#3700FF',   // fundo do header
            },
            fontFamily: {
                lubrifont: ['"WDXL Lubrifont TC"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

