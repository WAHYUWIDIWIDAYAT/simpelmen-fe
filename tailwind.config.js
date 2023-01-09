/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      "2xsm": "576px",
      sm: "640px",
      md: "768px",
      xmd: "840px",
      "2md": "960px",
      lg: "1024px",
      xl: "1312px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        success: "#21B630",
        warning: "#FFBC0D",
        dark: "#352A2B",
        secondary: {
          900: "#6D6061",
          800: "#A69798",
          700: "#E2DCDC",
          600: "#F5F5F5",
        },
        primary: {
          900: "#C9111B",
          600: "#D64D54",
          400: "#E4888D",
        },
        orange: {
          900: "#ED7801",
          600: "#F19A40",
          400: "#F8CCA0",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        "17/sp": "17px",
        "18/sp": "18px",
        "30/sp": "30px",
        "60/sp": "60px",
        "100/sp": "100px",
      },
      fontSize: {
        "45/sp": "45px",
        "15/sp": "15px",
      },
      borderWidth: {
        "0.5/sp": "0.5px",
      },
      boxShadow: {
        gray: "0px .25rem 1.25rem 0px #E2DCDC",
        red: "0px .25rem 1.25rem 0px #C9111B33",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
