"use client";

import React, { useEffect, useRef } from "react";
import "./LoaderPortfolio.css";
import { gsap } from "gsap";

export default function LoaderPortfolio() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  // Pour Hero animation
  useEffect(() => {
    gsap.set("body", { overflow: "hidden" });
    let currentValue = 0;
    function updateCounter() {
      if (!counterRef.current) return;
      if (currentValue === 100) {
        return;
      }
      currentValue += Math.floor(Math.random() * 10) + 1;
      if (currentValue > 100) {
        currentValue = 100;
      }
      counterRef.current.textContent = currentValue.toString();
      const delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateCounter, delay);
    }
    updateCounter();

    // Fade out du compteur
    gsap.to(counterRef.current, {
      delay: 3.5,
      opacity: 0,
      duration: 0.25,
    });

    // Animation des barres
    if (barsRef.current.length) {
      gsap.to(barsRef.current, {
        delay: 3.5,
        height: 0,
        duration: 1.5,
        stagger: { amount: 0.5 },
        ease: "power4.inOut",
        onComplete: () => {
          // Display none du loader-portfolio
          gsap.to(loaderRef.current, {
            display: "none",
            onComplete: () => {
              gsap.set("body", { overflow: "auto" });
            },
          });
        },
      });
    }
  }, []);

  return (
    <div className="loader-portfolio" ref={loaderRef}>
      <h1 className="counter" ref={counterRef}>
        0
      </h1>
      <div className="overlay">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="bar"
            key={i}
            ref={(el) => {
              barsRef.current[i] = el!;
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
