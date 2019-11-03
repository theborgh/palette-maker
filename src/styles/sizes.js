export default {
  up() {},

  down(size) {
    const sizes = {
      xxs: '400px',
      xs: '575px',
      sm: '767px',
      md: '991px',
      lg: '1199px',
      xl: '1599px',
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};
