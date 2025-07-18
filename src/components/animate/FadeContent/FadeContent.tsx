"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = "sine.in",
  delay = 0,
  initialOpacity = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Fonction pour remettre l'état initial
    const setInitial = () => {
      gsap.set(ref.current, {
        opacity: initialOpacity,
        filter: blur ? "blur(10px)" : "none",
      });
    };

    setInitial();

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          filter: blur ? "blur(0px)" : "none",
          duration: duration / 1000,
          delay: delay / 1000,
          ease: easing,
        });
      },
      onLeave: () => {
        setInitial();
      },
      onEnterBack: () => {
        gsap.to(ref.current, {
          opacity: 1,
          filter: blur ? "blur(0px)" : "none",
          duration: duration / 1000,
          delay: delay / 1000,
          ease: easing,
        });
      },
      onLeaveBack: () => {
        setInitial();
      },
      // markers: true, // pour debug
    });

    return () => {
      trigger.kill();
    };
  }, [blur, duration, delay, easing, initialOpacity]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default FadeContent;