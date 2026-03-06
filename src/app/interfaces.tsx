

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
export interface ApiResponse{
  data: Product[];
}
export interface SingleApiResponse{
  data: Product;
}