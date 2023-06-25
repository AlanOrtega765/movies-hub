const useFormatToCurrecy = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export default useFormatToCurrecy;
