"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { cart, removeItem, isOpen, closeCart } = useCart();

  const handleWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map((it) => `• ${it.name}${it.ref ? ` (${it.ref})` : ""} × ${it.qty}`)
      .join("\n");
    const msg = `Hola, quiero cotizar estos productos:\n${lines}\n\n¿Me confirman precio y disponibilidad?`;
    window.open(
      `https://wa.me/573003651525?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-screen w-[360px] max-w-full bg-white border-l border-border shadow-xl z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="font-bold text-lg">Tu cotización</h3>
        <button onClick={closeCart} aria-label="Cerrar carrito">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-auto flex flex-col gap-3">
        {cart.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">
            Tu lista está vacía
          </p>
        )}
        {cart.map((item, idx) => (
          <div
            key={item.sku}
            className="flex justify-between items-center p-3 bg-card rounded-lg border border-border"
          >
            <div>
              <p className="font-semibold text-sm">{item.name}</p>
              {item.ref && (
                <p className="text-xs text-muted-foreground">{item.ref}</p>
              )}
            </div>
            <div className="text-right text-sm shrink-0 ml-3">
              <p className="text-muted-foreground">× {item.qty}</p>
              <button
                onClick={() => removeItem(idx)}
                className="text-destructive text-xs hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border space-y-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Te confirmamos precio y disponibilidad por WhatsApp.
        </p>
        <Button
          onClick={handleWhatsApp}
          disabled={cart.length === 0}
          className="w-full"
        >
          Cotizar por WhatsApp
        </Button>
      </div>
    </aside>
  );
}
