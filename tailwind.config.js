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
        background: "#121212",
        accent: "#181818",
        hover: "#282828",
        text: "#949494",
      },
      green: "#1ed760",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
