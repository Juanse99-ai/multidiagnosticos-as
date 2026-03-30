"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { src: "/bosch.png", alt: "Bosch" },
  { src: "/tudor.png", alt: "Tudor" },
  { src: "/oil.png", alt: "Lubricantes / Mobil" },
  { src: "/pads.png", alt: "Frenos" },
  { src: "/generic.png", alt: "Marca aliada" },
];

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const items = listRef.current?.querySelectorAll("li");
    if (!items?.length) return;

    gsap.fromTo(
      Array.from(items),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  });

  return (
    <section ref={sectionRef} className="bg-brand-dark py-0 mb-8 overflow-hidden">
      <div className="overflow-hidden">
        <ul
          ref={listRef}
          className="flex gap-16 items-center py-5 px-8 list-none m-0 animate-brands-scroll"
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <li key={i} className="flex-none" style={{ opacity: 0 }}>
              <Image
                src={brand.src}
                alt={i < brands.length ? brand.alt : ""}
                width={120}
                height={42}
                className="h-10 w-auto"
                aria-hidden={i >= brands.length}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
