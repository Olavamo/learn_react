import React from "react";

const SizeBox = ({ state }) => {
  const { product, shoppingCart, setShoppingCart, setOpen } = state;

  const addShoppingCart = size => {
    setShoppingCart([...shoppingCart, { ...product, size }]);
    setOpen(true);
  };

  return (
    <div>
      <button onClick={() => addShoppingCart("S")}>S</button>
      <button onClick={() => addShoppingCart("M")}>M</button>
      <button onClick={() => addShoppingCart("L")}>L</button>
      <button onClick={() => addShoppingCart("XL")}>XL</button>
    </div>
  );
};

export default SizeBox;