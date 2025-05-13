
import React, { useState, useEffect } from "react";
import ProductImage from "@/components/product/ProductImage";
import ProductInfo from "@/components/product/ProductInfo";
import VariantSelector from "@/components/product/VariantSelector";
import DeliveryCheck from "@/components/product/DeliveryCheck";
import { productData } from "@/data/product";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils/product";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [selectedSize, setSelectedSize] = useState<string>(productData.sizes.find(s => s.inStock)?.id || "");
  const [selectedColor, setSelectedColor] = useState<string>(productData.colors.find(c => c.inStock)?.id || "");

  useEffect(() => {
    // Load user selections from localStorage
    const savedSize = getFromLocalStorage("selectedSize");
    const savedColor = getFromLocalStorage("selectedColor");
    
    if (savedSize && productData.sizes.some(s => s.id === savedSize && s.inStock)) {
      setSelectedSize(savedSize);
    }
    
    if (savedColor && productData.colors.some(c => c.id === savedColor && c.inStock)) {
      setSelectedColor(savedColor);
    }
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Por favor, selecione tamanho e cor antes de adicionar ao carrinho");
      return;
    }
    
    const selectedSizeObj = productData.sizes.find(s => s.id === selectedSize);
    const selectedColorObj = productData.colors.find(c => c.id === selectedColor);
    
    toast.success(
      `Produto adicionado ao carrinho: ${productData.name} - ${selectedSizeObj?.name}, ${selectedColorObj?.name}`
    );
    
    // Save selection to localStorage with 15 min expiration
    saveToLocalStorage("cartItem", {
      product: productData.id,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      dateAdded: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-lg font-semibold text-ecommerce-primary">LojaTech</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <ProductImage images={productData.images} />
            
            {/* Product Info and Variants */}
            <div className="flex-1">
              <ProductInfo product={productData} />
              
              <div className="space-y-6 my-6">
                {/* Size Selector */}
                <VariantSelector 
                  title="Tamanho"
                  variants={productData.sizes}
                  selectedVariant={selectedSize}
                  onSelect={setSelectedSize}
                  type="size"
                />
                
                {/* Color Selector */}
                <VariantSelector 
                  title="Cor"
                  variants={productData.colors}
                  selectedVariant={selectedColor}
                  onSelect={setSelectedColor}
                  type="color"
                  colors={productData.colors}
                />
                
                {/* Delivery Check */}
                <DeliveryCheck />
                
                {/* Add to Cart Button */}
                <div className="mt-8">
                  <Button 
                    onClick={handleAddToCart} 
                    className="w-full md:w-auto px-10 py-6 bg-ecommerce-primary hover:bg-ecommerce-secondary text-lg"
                  >
                    Adicionar ao Carrinho
                  </Button>
                  
                  <p className="mt-2 text-sm text-gray-500">
                    Frete grátis para todo o Brasil em compras acima de R$ 99,00.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-ecommerce-dark text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2023 LojaTech. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
