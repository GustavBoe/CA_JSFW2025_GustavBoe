"use client"
import useCartStore from "@/stores/cartStore";
import { Product} from "../interfaces";

interface Props{
  product:Product
}

export default function ProductAdder({product}:Props){

const addItem = useCartStore((state)=> state.addItem)

return(
  <div>
    <button onClick={()=>addItem(product)}>Add to cart</button>
  </div>
)
}