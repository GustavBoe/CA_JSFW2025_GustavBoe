//Inspired by answers given using module 3.3 and chatGPT

"use client"
import { useState, useMemo, useEffect } from "react";

import { Product , ApiResponse} from "../interfaces";
import Link from "next/link";

const API_URL = 'https://v2.api.noroff.dev/online-shop';

export default function ProductSearch(){
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    const fetchAllProducts = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error(`Unable to get products from API: ${response.status}`);
        const result: ApiResponse = await response.json();
        setAllProducts(result.data || []);
      }
      catch(error){
        console.log(error)
      }
    };
    fetchAllProducts();
  }, []);
  
  const processedProducts = useMemo(()=>{
    let productsToProcess = [...allProducts];
    if(searchTerm.trim() !== ""){
      const lowerSearchTerm = searchTerm.toLowerCase();
      productsToProcess = productsToProcess.filter((product)=>product.title.toLowerCase().includes(lowerSearchTerm)|| (product.description && product.description.toLowerCase().includes(lowerSearchTerm)),);
    }
    return productsToProcess
  }, [allProducts, searchTerm]);

  return(
    <section>
      <div>
        <label htmlFor="productSearchInput"> Search products: </label>
        <input type="text" id="productSearchInput" placeholder="Headphones, perfume etc.." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      </div>
      <div>
        {processedProducts.length > 0 ? (
          <ul>
            {processedProducts.map((product) =>(
              
              <li key={product.id}>
                <Link href={`/shop/${product.id}`}>
                <div>
                  <img src={product.image.url} alt={product.image.alt || product.title} />
                  <p>{product.title}</p>
                  {product.discountedPrice < product.price ? (<p>{product.discountedPrice}</p> ): <p>{product.price}</p>}
                </div>
                </Link>
              </li>
            ))}
          </ul>
        ): (<p>No product matches your search {searchTerm}</p>)}
      </div>
    </section>
  );

}