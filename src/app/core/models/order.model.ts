import { CartItem } from './cart.model';

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  totalAmount: number;
  items: CartItem[];
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}
