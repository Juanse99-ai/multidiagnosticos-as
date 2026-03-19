"use client";

import { usePathname } from "next/navigation";
import { Dock } from "@/components/ui/dock-two";
import {
  Home,
  Wrench,
  ShoppingBag,
  CalendarDays,
  Phone,
  MessageCircle,
} from "lucide-react";

export function NavigationDock() {
  const pathname = usePathname();

  const items = [
    {
      icon: Home,
      label: "Inicio",
      href: "/",
      onClick: () => {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    },
    {
      icon: Wrench,
      label: "Taller",
      href: "/taller",
    },
    {
      icon: ShoppingBag,
      label: "Autopartes",
      href: "/#catalogo",
      onClick: () => {
        if (pathname === "/") {
          const el = document.getElementById("catalogo");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
      },
    },
    {
      icon: CalendarDays,
      label: "Agendar",
      href: "/#agenda",
      onClick: () => {
        if (pathname === "/") {
          const el = document.getElementById("agenda");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
      },
    },
    {
      icon: Phone,
      label: "Contacto",
      href: "/#contacto",
      onClick: () => {
        if (pathname === "/") {
          const el = document.getElementById("contacto");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
      },
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/573003651525?text=Hola,%20quisiera%20información",
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <Dock items={items} />
      </div>
    </div>
  );
}
