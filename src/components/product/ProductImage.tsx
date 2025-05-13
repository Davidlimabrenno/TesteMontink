
import React, { useState, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils/product";

interface ProductImageProps {
  images: string[];
}

const ProductImage = ({ images }: ProductImageProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  useEffect(() => {
    // Load selected image from localStorage
    const savedImage = getFromLocalStorage("selectedImage");
    if (savedImage !== null && savedImage < images.length) {
      setSelectedImage(savedImage);
    }
  }, [images.length]);
  
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    saveToLocalStorage("selectedImage", index);
  };
  
  return (
    <div className="w-full md:w-[35%] flex flex-col space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {images[selectedImage] ? (
          <img
            src={images[selectedImage]}
            alt="Product"
            className="h-full w-full object-cover object-center transition-opacity duration-300"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Imagem não disponível</span>
          </div>
        )}
      </div>
      
      <div className="flex overflow-x-auto space-x-2 py-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`cursor-pointer flex-shrink-0 relative w-20 h-20 rounded ${
              selectedImage === index ? "ring-2 ring-ecommerce-primary" : "ring-1 ring-gray-200"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover object-center rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
