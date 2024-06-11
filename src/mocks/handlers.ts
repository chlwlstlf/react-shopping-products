import { handlers as cartItemHandlers } from './cartItem/cartItem';
import { handlers as productHandlers } from './product/product';

const handlers = [...productHandlers, ...cartItemHandlers];

export default handlers;
