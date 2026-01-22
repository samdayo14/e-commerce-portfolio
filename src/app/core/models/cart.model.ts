// import { Product } from './product.model';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  loading: boolean;
  error: string | null;
}

export interface AddToCartRequest {
  userId: number;
  products: { id: number; quantity: number }[];
}
