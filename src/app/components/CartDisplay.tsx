import React from "react";
import useCartStore from "../../../stores/cartStore";
import Link from "next/link";


function CartDisplay(){
  const items = useCartStore((state)=>state.items);
  
  const removeItem = useCartStore((state)=>state.removeItem);

  const updateQuantity = useCartStore((state)=> state.updateQuantity);

  if(items.length === 0){
    return (
    <div>
    <p> Your cart is empty!</p>
    <Link href={"/shop"}>Find something you like!</Link>
    </div>
    )
  }
  return(
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item)=> (
          <li key={item.id}>
            <span>ID: {item.id}</span>
            <span>Amount: {item.quantity}</span>
            <div>
              <button onClick={()=>updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={()=>updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartDisplay;