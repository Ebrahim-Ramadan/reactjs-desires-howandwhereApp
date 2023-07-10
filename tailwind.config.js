const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@themesberg/flowbite/**/*.js"
  ],

  theme: {
    extend: {},
  },

  plugins: [
     require('@themesberg/flowbite/plugin')
  ],
};

module.exports = config;