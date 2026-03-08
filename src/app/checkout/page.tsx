"use client"
import useCartStore from "@/stores/CartStore";
import Link from "next/link";
import CartSummary from "../components/CartSummary";

 export default function DisplayCheckout(){
  const items = useCartStore((state)=>state.items);
  const clearCart = useCartStore((state)=>state.clearCart);
  return(
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item)=> (
          <li key={item.id}>
            <span>Title: {item.title}</span>
            <img src={item.image.url} alt={item.image.alt || item.title}/>
            <span>Amount: {item.quantity}</span>
            
          </li>
        ))}
      </ul>
      <h3> <CartSummary/> </h3>
     <Link href="/" onClick={clearCart}>
        Shop
      </Link>
    
    </div>
    
  );
}

