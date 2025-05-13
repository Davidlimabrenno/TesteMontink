
import { Product } from "@/types/product";

export const productData: Product = {
  id: "1",
  name: "Smartphone Galaxy Ultra S24",
  price: 5999.99,
  description: "O mais avançado smartphone da nossa linha, com câmera de 108MP, tela AMOLED de 6.8 polegadas, processador Snapdragon 8 Gen 2, 12GB RAM e 512GB de armazenamento.",
  images: [
    "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&auto=format&fit=crop&q=80"
  ],
  sizes: [
    { id: "1", name: "128GB", inStock: true },
    { id: "2", name: "256GB", inStock: true },
    { id: "3", name: "512GB", inStock: true },
    { id: "4", name: "1TB", inStock: false },
  ],
  colors: [
    { id: "1", name: "Preto", value: "#000000", inStock: true },
    { id: "2", name: "Branco", value: "#FFFFFF", inStock: true },
    { id: "3", name: "Azul", value: "#1E90FF", inStock: true },
    { id: "4", name: "Verde", value: "#228B22", inStock: false },
    { id: "5", name: "Roxo", value: "#9b87f5", inStock: true },
  ]
};
