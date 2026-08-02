/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D1001F",
        secondary: "#F59E0B",
        background: "#FFF7F5",
        surface: "#FFFFFF",
        text: "#1F2937",
      },
      borderRadius: {
        card: "24px",
        button: "16px",
        input: "16px",
      },
    },
  },
  plugins: [],
};
