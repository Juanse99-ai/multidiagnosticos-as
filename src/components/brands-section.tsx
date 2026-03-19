import Image from "next/image";

const brands = [
  { src: "/bosch.png", alt: "Bosch" },
  { src: "/tudor.png", alt: "Tudor" },
  { src: "/oil.png", alt: "Lubricantes / Mobil" },
  { src: "/pads.png", alt: "Frenos" },
  { src: "/generic.png", alt: "Marca aliada" },
];

export function BrandsSection() {
  return (
    <section className="bg-brand-dark py-0 mb-8 overflow-hidden">
      <div className="overflow-hidden">
        <ul className="flex gap-16 items-center py-5 px-8 list-none m-0 animate-brands-scroll">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <li key={i} className="flex-none opacity-90">
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
