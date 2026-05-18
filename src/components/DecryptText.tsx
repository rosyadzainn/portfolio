"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface DecryptTextProps {
  text: string;
  trigger: boolean;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
}

export default function DecryptText({ text, trigger, delay = 0, speed = 28, style }: DecryptTextProps) {
  const [displayed, setDisplayed] = useState(() =>
    text.split("").map((c) => (c === " " ? " " : "█")).join("")
  );
  const iterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const start = setTimeout(() => {
      iterRef.current = 0;
      timerRef.current = setInterval(() => {
        const iter = iterRef.current;
        setDisplayed(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        iterRef.current += 0.4;
        if (iterRef.current >= text.length) {
          clearInterval(timerRef.current!);
          setDisplayed(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [trigger, text, delay, speed]);

  return <span style={style}>{displayed}</span>;
}
