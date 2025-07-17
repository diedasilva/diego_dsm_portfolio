import React, { useRef } from "react";
import "./Hero.css";
import SplitText from "@/components/animate/SplitText/SplitText";
import Typewriter, { TypewriterRef } from "../../animate/Typewriter/Typewriter";

export default function Hero() {
  const typewriterRef = useRef<TypewriterRef>(null);

  const handleSplitTextComplete = () => {
    if (typewriterRef.current) {
      typewriterRef.current.start();
    }
  };

  return (
    <section className="hero" id="hero">
      <SplitText
        text={
          <>
            Hello ! i&apos;m Diego,<br />
            a Fullstack Developper
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
        text="Developing is my passion, and I love turning ideas into experiences worth sharing."
        className="heading"
        speed={50}
        wordReplacements={{
          "sharing.": ["exploring.", "celebrating.", "showcasing.", "experiencing."],
        }}
        pauseDuration={2000}
        autoStart={false}
      />
    </section>
  );
}
