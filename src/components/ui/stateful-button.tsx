"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

type StatefulButtonProps = {
  children: React.ReactNode;
  /** Async work to run on click. While the promise is pending the button shows a spinner. */
  onClick?: () => Promise<void> | void;
  className?: string;
  loadingLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  /** ms to keep the success state before returning to idle */
  resetDelay?: number;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const swap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] as const },
};

export function StatefulButton({
  children,
  onClick,
  className,
  loadingLabel = "Enviando…",
  successLabel = "¡Listo!",
  resetDelay = 1800,
  disabled,
  ...props
}: StatefulButtonProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleClick = async () => {
    if (status !== "idle") return;
    try {
      setStatus("loading");
      await onClick?.();
      setStatus("success");
      timer.current = setTimeout(() => setStatus("idle"), resetDelay);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || status !== "idle"}
      data-status={status}
      className={cn("sb", className)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "loading" ? (
          <motion.span key="loading" className="sb-in" {...swap}>
            <Loader2 size={17} className="sb-spin" /> {loadingLabel}
          </motion.span>
        ) : status === "success" ? (
          <motion.span key="success" className="sb-in" {...swap}>
            <Check size={17} /> {successLabel}
          </motion.span>
        ) : (
          <motion.span key="idle" className="sb-in" {...swap}>
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
