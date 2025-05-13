
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCEP, fetchAddressByCEP, getFromLocalStorage, saveToLocalStorage } from "@/lib/utils/product";
import { DeliveryInfo } from "@/types/product";
import { toast } from "@/components/ui/sonner";

const DeliveryCheck = () => {
  const [cep, setCep] = useState<string>("");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Load saved CEP and address from localStorage
    const savedCEP = getFromLocalStorage("userCEP");
    const savedInfo = getFromLocalStorage("deliveryInfo");
    
    if (savedCEP) setCep(savedCEP);
    if (savedInfo) setDeliveryInfo(savedInfo);
  }, []);
  
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCEP(e.target.value);
    setCep(formattedCep);
    saveToLocalStorage("userCEP", formattedCep);
  };
  
  const checkDelivery = async () => {
    setIsLoading(true);
    try {
      const cleanCep = cep.replace(/\D/g, '');
      
      if (cleanCep.length !== 8) {
        toast.error("CEP inválido. Por favor, informe um CEP válido.");
        setIsLoading(false);
        return;
      }
      
      const info = await fetchAddressByCEP(cleanCep);
      
      if (!info) {
        toast.error("CEP não encontrado. Verifique e tente novamente.");
        setIsLoading(false);
        return;
      }
      
      setDeliveryInfo(info);
      saveToLocalStorage("deliveryInfo", info);
      toast.success("Endereço encontrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao buscar o endereço. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-sm font-medium text-gray-900">Calcular frete e prazo de entrega</h3>
      
      <div className="flex flex-wrap gap-2">
        <div className="w-full max-w-[200px]">
          <Input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
            className="border-gray-300 focus:border-ecommerce-primary focus:ring-ecommerce-primary"
          />
        </div>
        
        <Button 
          onClick={checkDelivery} 
          disabled={isLoading}
          className="bg-ecommerce-primary hover:bg-ecommerce-secondary"
        >
          {isLoading ? "Consultando..." : "Consultar"}
        </Button>
        
        <a 
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ecommerce-primary hover:underline self-center"
        >
          Não sei meu CEP
        </a>
      </div>
      
      {deliveryInfo && (
        <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Endereço de entrega:</h4>
          <p className="text-gray-700">
            {deliveryInfo.logradouro}{deliveryInfo.complemento ? `, ${deliveryInfo.complemento}` : ''}
          </p>
          <p className="text-gray-700">
            {deliveryInfo.bairro} - {deliveryInfo.localidade}/{deliveryInfo.uf}
          </p>
          <p className="text-gray-700">CEP: {deliveryInfo.cep}</p>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-medium">Prazo de entrega:</span>
              <span className="text-green-600 font-medium">Em até 7 dias úteis</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-medium">Frete:</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;
