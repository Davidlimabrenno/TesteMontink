
import React, { useState, useEffect } from "react";
import { ProductVariant, ProductColor } from "@/types/product";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils/product";

interface VariantSelectorProps {
  title: string;
  variants: ProductVariant[];
  selectedVariant: string;
  onSelect: (id: string) => void;
  type?: "size" | "color";
  colors?: ProductColor[];
}

const VariantSelector = ({
  title,
  variants,
  selectedVariant,
  onSelect,
  type = "size",
  colors = []
}: VariantSelectorProps) => {
  const handleSelect = (id: string) => {
    onSelect(id);
    saveToLocalStorage(`selected${type === "size" ? "Size" : "Color"}`, id);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {type === "size" ? (
          variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => variant.inStock && handleSelect(variant.id)}
              disabled={!variant.inStock}
              className={`px-3 py-1 rounded-md text-sm ${
                variant.id === selectedVariant
                  ? "bg-ecommerce-primary text-white"
                  : variant.inStock
                  ? "bg-white border border-gray-300 text-gray-700 hover:border-ecommerce-primary"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              } transition-all`}
            >
              {variant.name}
              {!variant.inStock && " (Indisponível)"}
            </button>
          ))
        ) : (
          colors.map((color) => (
            <button
              key={color.id}
              onClick={() => color.inStock && handleSelect(color.id)}
              disabled={!color.inStock}
              className={`relative w-9 h-9 rounded-full overflow-hidden ${
                color.id === selectedVariant
                  ? "ring-2 ring-ecommerce-primary ring-offset-2"
                  : "ring-1 ring-gray-300"
              } ${!color.inStock ? "opacity-40 cursor-not-allowed" : ""}`}
              title={color.name}
            >
              <span 
                className="absolute inset-0" 
                style={{ backgroundColor: color.value }}
              ></span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default VariantSelector;
