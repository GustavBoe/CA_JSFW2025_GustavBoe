

export interface Image{
  url:string;
  alt?:string;
}
export interface Review{
  id:string;
  username:string;
  rating:number;
  description:string;
}

export interface Product{
  id:string;
  title:string;
  description:string;
  price:number;
  discountedPrice:number;
  image:Image;
  rating: number;
  tags: string[];
  reviews: Review[];
}
export interface CartItem extends Product{
  quantity: number;
}

//Interface inspired from answer given by ChatGPT
export interface CartStore{
  items: CartItem[];

  addItem: (product:Product) => void;
  removeItem:(id:string)=>void;
  updateQuantity:(id:string, quantity:number) => void;
  clearCart:()=>void;
 
}

export interface CartSummary{
  itemCount: number;
  total: number;

}

//
export interface ApiResponse{
  data: Product[];
}
export interface SingleApiResponse{
  data: Product;
}

export interface ContactData{
  name:string;
  subject:string;
  email:string;
  message:string;
 

}