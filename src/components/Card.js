import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import './Card.css';



const Card= ({product}) => {
    const imgSrc=`data/products/${product.sku}_1.jpg`;

    return(
        <li className="card-container">
            <img src={imgSrc} alt="" />
            <p>{product.title}</p>
            <p style={{fontWeight:"800"}}>{`$${product.price}`}</p>
            <Button>Add to Cart</Button>
        </li>
    );
};


export default Card;