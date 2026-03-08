"use client"
import React from "react";
import Link from "next/link";
import useCartStore from "../../../stores/CartStore";
import CartSummary from "./CartSummary";



function CartDisplay(){
  const items = useCartStore((state)=>state.items);
  
  const removeItem = useCartStore((state)=>state.removeItem);

  const updateQuantity = useCartStore((state)=> state.updateQuantity);

 

  if(items.length === 0){
    return (
    <div>
    <p> Your cart is empty!</p>
    <Link href={"/"}>Find something you like!</Link>
    </div>
    )
  }
  return(
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item)=> (
          <li key={item.id}>
            <span>ID: {item.title}</span>
            <span>Amount: {item.quantity}</span>
            <div>
              <button onClick={()=>updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={()=>updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3> <CartSummary/> </h3>
     <Link href={"/checkout"}>Checkout</Link>
    </div>
  );
}

export default CartDisplay;