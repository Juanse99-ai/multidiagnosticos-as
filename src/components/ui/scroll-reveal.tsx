"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  /** Selector for child elements to stagger. If omitted, animates the wrapper itself. */
  stagger?: string;
  /** Distance (px) to slide up from. */
  y?: number;
  /** Optional className for the wrapper. */
  className?: string;
  /** Wrapper tag, defaults to div. */
  as?: ElementType;
  /** Delay between staggered items in seconds. */
  staggerAmount?: number;
  /** Duration of each tween in seconds. */
  duration?: number;
  /** When the trigger fires. */
  start?: string;
};

export function ScrollReveal({
  children,
  stagger,
  y = 60,
  className,
  as: Tag = "div",
  staggerAmount = 0.12,
  duration = 0.8,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const targets: Element[] = stagger
        ? Array.from(root.querySelectorAll(stagger))
        : [root];

      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: root,
        start,
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            stagger: staggerAmount,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
