import Link from 'next/link';
import ShowError  from "./error/page";
import { ApiResponse } from "./interfaces";
import ProductSearch from './components/ProductSearch';



export default async function ProductPage(){
  const response = await fetch('https://v2.api.noroff.dev/online-shop');
  if(!response){
    return(
      <ShowError />
    )
  }
  const result: ApiResponse = await response.json();
  const products = result.data;

  return(
   
    <div>
      <ProductSearch/>
    
       
      {products && products.length > 0 ? (
        <ul className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product)=>{
            const onSale = product.price > product.discountedPrice;
            const difference = product.price - product.discountedPrice;
            const discountedPercentage = Math.round((difference / product.price) * 100);
            return(
            
            <li key={product.id}>
              <Link href={`/shop/${product.id}`}>
              <h2>{product.title}</h2>
              <div className="relative">
              <img className="w-full h-auto" src={product.image.url}
              alt={product.image.alt || product.title}/>
              
              {onSale && <div className="absolute top-0 right-0 bg-amber-900 text-white"> {discountedPercentage} %</div>}
              </div>
              <div>
              {onSale ? (<div><p>{product.discountedPrice}</p> <p className="line-through">{product.price}</p></div>):
              <div><p>{product.price}</p></div>}
              </div>
              
              </Link>
            </li>
            
            )})}
        </ul>
      ) : (<ShowError />)}
    </div>
    
  )
};
