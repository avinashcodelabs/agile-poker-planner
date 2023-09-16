/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#469CA8",
          secondary: "#F0FDFA",
          accent: "#469067",
          neutral: "#1b1820",
          "base-100": "#fff",
          "base-200": "#ececee",
          info: "#348fcb",
          success: "#118868",
          warning: "#ba720d",
          error: "#e56661",
        },
      },
    ], // the first one will be default one.
  },
};
