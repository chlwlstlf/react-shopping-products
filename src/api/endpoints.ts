const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {
  CART: `${API_BASE_URL}/cart-items`,
  PRODUCT: `${API_BASE_URL}/products`,
};

export default API_ENDPOINTS;
