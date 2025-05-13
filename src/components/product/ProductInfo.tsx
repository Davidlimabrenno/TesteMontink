
import React from "react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
      
      <div className="flex items-center">
        <p className="text-3xl font-semibold text-ecommerce-primary">
          {formatPrice(product.price)}
        </p>
        <p className="ml-3 text-sm text-gray-500">
          Em até 12x sem juros
        </p>
      </div>
      
      <p className="mt-4 text-gray-600">{product.description}</p>
      
      <div className="h-px w-full bg-gray-200 my-2"></div>
    </div>
  );
};

export default ProductInfo;
