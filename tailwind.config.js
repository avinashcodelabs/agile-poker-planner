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
          primary: "#509eb2",
          secondary: "#a9aefc",
          accent: "#f7277e",
          neutral: "#1b1820",
          "base-100": "#ececee",
          info: "#348fcb",
          success: "#118868",
          warning: "#ba720d",
          error: "#e56661",
        },
      },
    ], // the first one will be default one.
  },
};
