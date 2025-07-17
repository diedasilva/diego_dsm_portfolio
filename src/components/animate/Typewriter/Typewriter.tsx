"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import "./Typewriter.css";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  wordReplacements?: { [key: string]: string[] }; // mots à remplacer et leurs alternatives
  pauseDuration?: number; // durée de pause avant de changer de mot
  autoStart?: boolean; // si false, l'animation ne démarre pas automatiquement
}

export interface TypewriterRef {
  start: () => void;
}

const Typewriter = forwardRef<TypewriterRef, TypewriterProps>(({
  text,
  speed = 50,
  className,
  wordReplacements = {},
  pauseDuration = 2000,
  autoStart = true,
}, ref) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const currentWordIndexRef = useRef(0);
  const currentReplacementIndexRef = useRef(0);
  const wordsToReplaceRef = useRef<string[]>([]);
  const animationStartedRef = useRef(false);

  // Fonction pour démarrer manuellement l'animation
  const startAnimation = () => {
    if (animationStartedRef.current) return;
    
    animationStartedRef.current = true;
    
    // Extraire les mots à remplacer du texte
    const words = text.split(' ');
    const wordsToReplace: string[] = [];
    
    words.forEach((word) => {
      if (wordReplacements[word]) {
        wordsToReplace.push(word);
      }
    });
    
    wordsToReplaceRef.current = wordsToReplace;
    
    // Reset
    currentIndexRef.current = 0;
    isDeletingRef.current = false;
    currentWordIndexRef.current = 0;
    currentReplacementIndexRef.current = 0;
    
    if (textRef.current) {
      textRef.current.textContent = "";
    }
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Définir la fonction animate ici
    const animate = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!isDeletingRef.current) {
          // Mode écriture
          if (currentIndexRef.current < text.length) {
            currentIndexRef.current++;
            if (textRef.current) {
              textRef.current.textContent = text.slice(0, currentIndexRef.current);
            }
            
            // Vérifier si on a fini d'écrire le texte complet
            if (currentIndexRef.current === text.length) {
              console.log("Typewriter completed, starting word replacement loop");
              setTimeout(() => {
                startWordReplacementLoop();
              }, pauseDuration);
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          }
        } else {
          // Mode suppression
          if (currentIndexRef.current > 0) {
            currentIndexRef.current--;
            if (textRef.current) {
              textRef.current.textContent = text.slice(0, currentIndexRef.current);
            }
          } else {
            isDeletingRef.current = false;
            // Recommencer l'écriture avec le nouveau mot
            animate();
          }
        }
      }, speed);
    };

    const startWordReplacementLoop = () => {
      if (wordsToReplaceRef.current.length === 0) return;
      
      const currentWord = wordsToReplaceRef.current[currentWordIndexRef.current];
      const replacements = wordReplacements[currentWord];
      
      if (!replacements || replacements.length === 0) return;
      
      const currentReplacement = replacements[currentReplacementIndexRef.current];
      
      // Trouver la position du mot dans le texte
      const words = text.split(' ');
      let wordStartIndex = 0;
      let wordIndex = 0;
      
      for (let i = 0; i < words.length; i++) {
        if (words[i] === currentWord) {
          if (wordIndex === currentWordIndexRef.current) {
            break;
          }
          wordIndex++;
        }
        wordStartIndex += words[i].length + 1; // +1 pour l'espace
      }
      
      const wordEndIndex = wordStartIndex + currentWord.length;
      
      // Supprimer jusqu'au début du mot
      isDeletingRef.current = true;
      currentIndexRef.current = wordEndIndex;
      
      const deleteInterval = setInterval(() => {
        if (currentIndexRef.current > wordStartIndex) {
          currentIndexRef.current--;
          if (textRef.current) {
            textRef.current.textContent = text.slice(0, currentIndexRef.current);
          }
        } else {
          clearInterval(deleteInterval);
          
          // Écrire le nouveau mot
          const newText = text.slice(0, wordStartIndex) + currentReplacement + text.slice(wordEndIndex);
          let newIndex = wordStartIndex;
          
          const writeInterval = setInterval(() => {
            if (newIndex < wordStartIndex + currentReplacement.length) {
              newIndex++;
              if (textRef.current) {
                textRef.current.textContent = newText.slice(0, newIndex);
              }
            } else {
              clearInterval(writeInterval);
              currentIndexRef.current = newIndex;
              
              // Passer au mot suivant
              currentReplacementIndexRef.current = (currentReplacementIndexRef.current + 1) % replacements.length;
              if (currentReplacementIndexRef.current === 0) {
                currentWordIndexRef.current = (currentWordIndexRef.current + 1) % wordsToReplaceRef.current.length;
              }
              
              // Pause avant le prochain changement
              setTimeout(() => {
                startWordReplacementLoop();
              }, pauseDuration);
            }
          }, speed);
        }
      }, speed);
    };

    animate();
  };

  // Exposer la méthode start via ref
  useImperativeHandle(ref, () => ({
    start: startAnimation,
  }));

  useEffect(() => {
    console.log("Typewriter starting with text:", text);
    
    // Si autoStart est false, ne pas démarrer l'animation
    if (!autoStart) {
      console.log("Typewriter autoStart is false, waiting for manual start");
      animationStartedRef.current = false;
      return;
    }
    
    animationStartedRef.current = true;
    
    // Extraire les mots à remplacer du texte
    const words = text.split(' ');
    const wordsToReplace: string[] = [];
    
    words.forEach((word) => {
      if (wordReplacements[word]) {
        wordsToReplace.push(word);
      }
    });
    
    wordsToReplaceRef.current = wordsToReplace;
    
    // Reset
    currentIndexRef.current = 0;
    isDeletingRef.current = false;
    currentWordIndexRef.current = 0;
    currentReplacementIndexRef.current = 0;
    
    if (textRef.current) {
      textRef.current.textContent = "";
    }
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    const animate = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!isDeletingRef.current) {
          // Mode écriture
          if (currentIndexRef.current < text.length) {
            currentIndexRef.current++;
            if (textRef.current) {
              textRef.current.textContent = text.slice(0, currentIndexRef.current);
            }
            
            // Vérifier si on a fini d'écrire le texte complet
            if (currentIndexRef.current === text.length) {
              console.log("Typewriter completed, starting word replacement loop");
              setTimeout(() => {
                startWordReplacementLoop();
              }, pauseDuration);
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          }
        } else {
          // Mode suppression
          if (currentIndexRef.current > 0) {
            currentIndexRef.current--;
            if (textRef.current) {
              textRef.current.textContent = text.slice(0, currentIndexRef.current);
            }
          } else {
            isDeletingRef.current = false;
            // Recommencer l'écriture avec le nouveau mot
            animate();
          }
        }
      }, speed);
    };

    const startWordReplacementLoop = () => {
      if (wordsToReplaceRef.current.length === 0) return;
      
      const currentWord = wordsToReplaceRef.current[currentWordIndexRef.current];
      const replacements = wordReplacements[currentWord];
      
      if (!replacements || replacements.length === 0) return;
      
      const currentReplacement = replacements[currentReplacementIndexRef.current];
      
      // Trouver la position du mot dans le texte
      const words = text.split(' ');
      let wordStartIndex = 0;
      let wordIndex = 0;
      
      for (let i = 0; i < words.length; i++) {
        if (words[i] === currentWord) {
          if (wordIndex === currentWordIndexRef.current) {
            break;
          }
          wordIndex++;
        }
        wordStartIndex += words[i].length + 1; // +1 pour l'espace
      }
      
      const wordEndIndex = wordStartIndex + currentWord.length;
      
      // Supprimer jusqu'au début du mot
      isDeletingRef.current = true;
      currentIndexRef.current = wordEndIndex;
      
      const deleteInterval = setInterval(() => {
        if (currentIndexRef.current > wordStartIndex) {
          currentIndexRef.current--;
          if (textRef.current) {
            textRef.current.textContent = text.slice(0, currentIndexRef.current);
          }
        } else {
          clearInterval(deleteInterval);
          
          // Écrire le nouveau mot
          const newText = text.slice(0, wordStartIndex) + currentReplacement + text.slice(wordEndIndex);
          let newIndex = wordStartIndex;
          
          const writeInterval = setInterval(() => {
            if (newIndex < wordStartIndex + currentReplacement.length) {
              newIndex++;
              if (textRef.current) {
                textRef.current.textContent = newText.slice(0, newIndex);
              }
            } else {
              clearInterval(writeInterval);
              currentIndexRef.current = newIndex;
              
              // Passer au mot suivant
              currentReplacementIndexRef.current = (currentReplacementIndexRef.current + 1) % replacements.length;
              if (currentReplacementIndexRef.current === 0) {
                currentWordIndexRef.current = (currentWordIndexRef.current + 1) % wordsToReplaceRef.current.length;
              }
              
              // Pause avant le prochain changement
              setTimeout(() => {
                startWordReplacementLoop();
              }, pauseDuration);
            }
          }, speed);
        }
      }, speed);
    };

    animate();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, wordReplacements, pauseDuration, autoStart]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        whiteSpace: "pre-wrap",
      }}
    >
      <span ref={textRef}></span>
      <span className="typewriter-cursor">
        |
      </span>
    </span>
  );
});

Typewriter.displayName = 'Typewriter';

export default Typewriter;
