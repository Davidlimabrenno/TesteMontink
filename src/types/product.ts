
export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
}

export interface ProductColor {
  id: string;
  name: string;
  value: string; // hex color code
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: ProductVariant[];
  colors: ProductColor[];
}

export interface DeliveryInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  loading: boolean;
  error: boolean;
}
