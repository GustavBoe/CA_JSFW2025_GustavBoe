/** This is the page for all products, also known as the home page */
import React from "react";
import Link from 'next/link';
import { ShowError } from "../error/page";

export interface Product{
  id:string;
  title:string;
  description:string;
  price:number;
  discountedPrice:number;
  image:{
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  reviews: string[];
}
export interface ApiResponse{
  data: Product[];
  //meta: any;
}

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
      {products && products.length > 0 ? (
        <ul>
          {products.map((product)=>{
            const onSale = product.price > product.discountedPrice;
            const difference = product.price - product.discountedPrice;
            const discountedPercentage = Math.round((difference / product.price) * 100);
            return(
            
            <li key={product.id} className="m-2">
              <Link href={`/shop/${product.id}`}>
              <h2>{product.title}</h2>
              <div className="relative">
              <img src={product.image.url}
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
