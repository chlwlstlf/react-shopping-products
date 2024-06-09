import { http, HttpResponse } from 'msw';
import products from '../product/products.json';
import cartItemsData from '../cartItem/cartItem.json';
import { CartItem } from '../../types/CartItem.type';
import { Product } from '../../types/Product.type';
import { API_ENDPOINTS } from '../../api/endpoints';

let cartItems: CartItem[] = cartItemsData;

export const handlers = [
  http.get(`${API_ENDPOINTS.CART}`, () => HttpResponse.json({ content: cartItems })),

  http.post(`${API_ENDPOINTS.CART}`, async ({ request }) => {
    const { productId } = (await request.json()) as { productId: number };

    const product = products.find((product: Product) => product.id === productId);

    const cartItemId = Math.max(0, ...cartItems.map((cartItem) => cartItem.id)) + 1;

    if (product) {
      cartItems.push({ product, quantity: 1, id: cartItemId });
    }

    return HttpResponse.json({ status: 201 });
  }),

  http.delete(`${API_ENDPOINTS.CART}/:cartItemId`, async ({ params }) => {
    const { cartItemId } = params;

    cartItems = cartItems.filter((cartItem) => cartItem.id !== Number(cartItemId));

    return HttpResponse.json({ status: 201 });
  }),
];
