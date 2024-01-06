import type { Config } from 'tailwindcss';
export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'montserrat-alternates': ['Montserrat Alternates', 'sans-serif'],
      },
      dropShadow: {
        amber: '0px 0px 2px rgba(246, 201, 108, 0.7)',
      },
      colors: {
        'jet-black': '#111111',
        'just-black': '#000000',
        'just-white': '#FFFFFF',
        gray: '#808080',
        silver: '#CCCCCC',
        amber: '#F6C96C',
        'steel-blue': '#595E69',
        'cadet-grey': '#AAADB2',
      },
    },
  },
};
