/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      // You can add other custom styles here if needed
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.clip-custom': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        },
      })
    },
  ],
};




// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js,jsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// // tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       boxShadow: {
//         'custom': '0 4px 8px rgba(0, 0, 0, 0.1)',
//       }
//     }
//   }
// }

// // tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       // No theme extension needed for clip-path
//     },
//   },
//   plugins: [
//     function({ addUtilities }) {
//       addUtilities({
//         '.clip-custom': {
//           'clip-path': 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
//         },
//       })
//     },
//   ],
// }


