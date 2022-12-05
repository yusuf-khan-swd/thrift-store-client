/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar-bg-color': '#e5e7eb',
        'btn-bg-color': '#64e546',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#b6becd",
          secondary: "#a78bfa",
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
