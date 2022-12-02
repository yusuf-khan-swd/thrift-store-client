/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06b6d4",
          secondary: "#2563eb",
          // secondary: "#3b82f6",

          // my try
          // primary: "#2ed08a",
          // secondary: "#2bf29c",

          // color from anas
          // primary: "#2bf29c",
          // secondary: "#002333",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#f54747",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
