import { Product } from './Product.type';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
