module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moderateblue: "hsl(238, 40%, 52%)",
        softred: "hsl(358, 79%, 66%)",
        lightgrayishblue: "hsl(239, 57%, 85%)",
        palered: "hsl(357, 100%, 86%)",
        darkblue: "hsl(212, 24%, 26%)",
        grayishblue: "hsl(211, 10%, 45%)",
        lightgray: "hsl(223, 19%, 93%)",
        verylightgray: "hsl(228, 33%, 97%)",
      },
    },
  },
  plugins: [],
};
