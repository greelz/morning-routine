export default {
  theme: {
    extend: {
      keyframes: {
        'scale-pulse': {
          '0%, 100%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.1)'},
        },
      },
      animation: {
        'scale-pulse': 'scale-pulse 1s infinite ease-in-out',
      },
    },
  },
};

