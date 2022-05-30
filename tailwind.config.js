module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Circular Medium", "sans-serif"],
        bold: ["Circular Bold", "sans-serif"],
        light: ["Circular Light", "sans-serif"],
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      gray: {
        dark: "#121212",
        medium: "#181818",
        light: "#282828",
        text: "#949494",
      },
      green: {
        light: "#1fdf64",
        dark: "#1ed760",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
