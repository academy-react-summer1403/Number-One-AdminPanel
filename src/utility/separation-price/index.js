export const UnitPrice = (price) => {
  const reducer = Intl.NumberFormat("fa", {
    notation: "compact",
  });
  const newPrice = reducer.format(price);
  return newPrice;
};

export const SeparationPrice = (price) => {
  price = String(price);
  const CategorizedPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return CategorizedPrice;
};
