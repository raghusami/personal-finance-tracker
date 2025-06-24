module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
      'fade-in': 'fadeIn 0.3s ease-out',
    },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark","business"], // you can add more or use custom
  },
  keyframes: {
      fadeIn: {
        from: { opacity: 0, transform: 'translateY(-5%)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
    },
};

