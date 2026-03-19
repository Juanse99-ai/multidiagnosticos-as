"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  sku: string;
  name: string;
  ref: string;
  price: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (index: number) => void;
  itemCount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.sku === item.sku);
      if (existing) {
        return prev.map((x) =>
          x.sku === item.sku ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const itemCount = cart.reduce((a, b) => a + b.qty, 0);
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        itemCount,
        total,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
