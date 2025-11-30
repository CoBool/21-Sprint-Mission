export const formatPrice = (value) => {
  return new Intl.NumberFormat("ko-KR").format(value);
};