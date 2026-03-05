 // This is the page for a single product, interfacefetching and rendering 
import React from "react";
import Link from "next/link";
 import { SingleApiResponse } from "@/app/interfaces";
import { ShowError } from "@/app/error/page";
export default async function SingleProduct({params,}: {params:Promise<{id:string}>;}){
  const {id:productId} = await params;
  const response = await fetch(
    `https://v2.api.noroff.dev/online-shop/${productId}`
  )
  if(!response.ok){
    return(
      <ShowError/>
    )
  }
  const result:SingleApiResponse = await response.json();
  const product = result.data;
  if(!product){
    return(
      <span>
        <p>Unable to get product data</p>
      </span>
    )
  }

  const onSale = product.price > product.discountedPrice;
  const difference = product.price - product.discountedPrice;
  const discountedPercentage = Math.round((difference / product.price) * 100) + "%";

  
  return(
    <div>
      <h1>{product.title}</h1>
      <img src={product.image.url} alt={product.image.alt || product.title}/>
      <p>{product.description}</p>
      
     {onSale ? (<div><p>{product.discountedPrice}</p> <p className="line-through">{product.price}</p><p>{discountedPercentage} off!</p></div>):
              <div><p>{product.price}</p></div>}
               <p>{product.tags.join(",")}</p>
      <ul>
        {product.reviews.length > 0 ?(
          product.reviews.map((review)=>{
        return(
          <li key={review.id}>
            <p>{review.username}</p>
            <p>{review.rating}</p>
            <p>{review.description}</p>
          </li>
        )
      })): (<p>No reviews to show</p>)}
      
      </ul>
    </div>
  )
};