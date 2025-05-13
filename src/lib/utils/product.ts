
import { DeliveryInfo } from "@/types/product";

// Format price to BRL currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

// Format CEP with mask (12345-678)
export const formatCEP = (cep: string): string => {
  cep = cep.replace(/\D/g, ''); // Remove non-digits
  if (cep.length > 5) {
    cep = cep.substring(0, 5) + '-' + cep.substring(5);
  }
  return cep.substring(0, 9); // Limit to 9 chars (including hyphen)
};

// Fetch address information from ViaCEP API
export const fetchAddressByCEP = async (cep: string): Promise<DeliveryInfo | null> => {
  try {
    cep = cep.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      return null;
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      return null;
    }
    
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      loading: false,
      error: false
    };
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

// Save user selections to localStorage with expiration
export const saveToLocalStorage = (key: string, value: any): void => {
  const item = {
    value,
    expiry: new Date().getTime() + (15 * 60 * 1000) // 15 minutes
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Get saved user selections from localStorage
export const getFromLocalStorage = (key: string): any => {
  const itemStr = localStorage.getItem(key);
  
  // If item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();
  
  // Check if the item has expired
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};
