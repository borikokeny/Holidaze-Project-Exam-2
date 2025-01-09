const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"], // Include your content paths
  theme: {
    extend: {
      boxShadow: {
        custom: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      // Add other custom styles here if needed
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-custom": {
          "clip-path": "polygon(0 0, 100% 0, 100% 82%, 0 89%)",
        },
      });
    },
  ],
});

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js,jsx}"],
//   theme: {
//     extend: {
//       boxShadow: {
//         'custom': '0 4px 8px rgba(0, 0, 0, 0.1)',
//       },
//       // You can add other custom styles here if needed
//     },
//   },
//   plugins: [
//     function({ addUtilities }) {
//       addUtilities({
//         '.clip-custom': {
//           'clip-path': 'polygon(0 0, 100% 0, 100% 82%, 0 89%)',
//         },
//       })
//     },
//   ],
// };
