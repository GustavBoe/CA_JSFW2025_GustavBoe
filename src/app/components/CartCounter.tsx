import useCartStore from "@/stores/CartStore"

export default function CartCounter(){
const items = useCartStore((state)=>state.items);
const totalItems = items.reduce((total, item)=> total + item.quantity,  0);


return <p>{totalItems}</p>
}