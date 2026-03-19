"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

function fmt(n: number) {
  return `$${n.toLocaleString("es-CO")}`;
}

export function CartDrawer() {
  const { cart, removeItem, total, isOpen, closeCart } = useCart();

  const handleWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map(
        (it) =>
          `• ${it.name} (${it.ref || ""}) × ${it.qty} – ${fmt(it.price)}`
      )
      .join("\n");
    const msg = `Hola, quiero comprar:\n${lines}\nTotal: ${fmt(total)}`;
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
        <h3 className="font-bold text-lg">Tu Carrito</h3>
        <button onClick={closeCart} aria-label="Cerrar carrito">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-auto flex flex-col gap-3">
        {cart.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">
            Tu carrito está vacío
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
            <div className="text-right text-sm">
              <p>
                {fmt(item.price)} × {item.qty}
              </p>
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

      <div className="p-4 border-t border-border flex justify-between items-center">
        <div>
          <span className="text-sm">Total:</span>{" "}
          <strong className="text-lg">{fmt(total)}</strong>
        </div>
        <Button onClick={handleWhatsApp} disabled={cart.length === 0}>
          Finalizar por WhatsApp
        </Button>
      </div>
    </aside>
  );
}
