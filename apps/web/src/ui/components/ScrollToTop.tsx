"use client"

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// helper function for throttling to improve performance
function throttle<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

export default function ScrollToTop() {
  const [ isVisible, setIsVisible ] = useState<boolean>(false);
  const THRESHOLD = 700;

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible((prev) => {
        const next = window.scrollY > THRESHOLD;
        return prev !== next ? next : prev;
      })
    }

    const throttledToggle = throttle(toggleVisibility, 150);

    window.addEventListener("scroll", throttledToggle, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledToggle)
    }
  }, [])

  if (!isVisible) return;

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button onClick={scrollTop} className="scroll-to-top" aria-hidden>
      <ArrowUp />
    </button>
  )
}