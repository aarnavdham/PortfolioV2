"use client";

import { motion } from "framer-motion";
import { useRef, type ElementType, useEffect, useState } from "react";

export default function SplitText({
  text,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2500 + delay * 500);
    return () => clearTimeout(t);
  }, [delay]);

  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.12em",
            lineHeight: "inherit",
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "110%" }}
            animate={revealed ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
