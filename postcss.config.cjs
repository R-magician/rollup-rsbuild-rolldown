// postcss.config.cjs
module.exports = {
    plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
        require('postcss-preset-env')({ stage: 1 }),
    ],
};