import React, { useContext } from "react";
import "rbx/index.css";
import "./Card.css";
import SizeBox from "./SizeBox";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const Card = ({ product, inventory, setInventory }) => {
  const { shoppingCart, setShoppingCart, open, setOpen } = useContext(
    ShoppingCartContext
  );
  const imgSrc = `data/products/${product.sku}_1.jpg`;
  return(
    <li className="card-container">
        <img src={imgSrc} alt="" />
        <p>{product.title}</p>
        <p style={{fontWeight:"800"}}>{`$${product.price}`}</p>
        <SizeBox
        state={{ product, shoppingCart, setShoppingCart, open, setOpen, inventory, setInventory }}
      />
    </li>
);
};


export default Card;
