export const formatPrice = (value) => {
  if ( value === "" || value === null || value === undefined ) return "";
  return new Intl.NumberFormat("ko-KR").format(value);
};

export const parseNumber = (value) => {
  const cleanedValue = value.replace(/[^0-9]/g, "");

  return cleanedValue === "" ? "" : Number(cleanedValue);
}