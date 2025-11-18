// contexts/CartContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Interface para o Item do Jogo no Carrinho
interface CartItem {
  id: number;
  nome: string;
  custoAssinatura: string;
  src: string;
}

// 2. Interface para o Contexto
interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

// 3. Inicializar o Contexto com valores padrão
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Provedor do Contexto
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    // Para simplificar, adicionamos o item se ele não estiver no carrinho
    if (!cart.some(cartItem => cartItem.id === item.id)) {
        setCart(prevCart => [...prevCart, item]);
    }
  };

  const removeItem = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 5. Hook Personalizado para Uso Simples
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}