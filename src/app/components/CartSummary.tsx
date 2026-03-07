import useCartStore from "@/stores/CartStore";


export default function CartSummary(){
  const items = useCartStore((state)=>state.items)

    const summary = items.reduce((acc,item)=>{

      const activePrice = item.discountedPrice< item.price ? item.discountedPrice : item.price;
      const total = Math.round(activePrice * item.quantity);
      
      acc.total += total;
      acc.itemCount += item.quantity;

      return acc
    },
    {total: 0,
    itemCount:0
    })
    return(
      <p>Cart total: {summary.total} kr</p>
    )

}

