"use client";

import React, { useRef } from "react";
import "./Hero.css";
import SplitText from "@/components/animate/SplitText/SplitText";
import Typewriter, { TypewriterRef } from "../../animate/Typewriter/Typewriter";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const t = useTranslations("Hero");
  const typewriterRef = useRef<TypewriterRef>(null);

  const titleLines = t.raw("title") as string[];

  const handleSplitTextComplete = () => {
    if (typewriterRef.current) {
      typewriterRef.current.start();
    }
  };

  const scrollToNextSection = () => {
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const scrollDistance = windowHeight * 0.8; // 80% de la hauteur de la fenêtre
    
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: currentScroll + scrollDistance },
      ease: "power2.out"
    });
  };

  return (
    <section className="hero" id="hero">
      <SplitText
        text={
          <>
            {titleLines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </>
        }
        className="signature"
        delay={50}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        onLetterAnimationComplete={handleSplitTextComplete}
      />
      <Typewriter
        ref={typewriterRef}
        text={t("typewriter")}
        className="heading"
        speed={50}
        wordReplacements={{
          [t("wordToReplace")]: t.raw("typewriterReplacements") as string[],
        }}
        pauseDuration={2000}
        autoStart={false}
      />
      
      {/* Flèche de scroll */}
      <div className="scroll-arrow" onClick={scrollToNextSection}>
        <div className="scroll-arrow-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
