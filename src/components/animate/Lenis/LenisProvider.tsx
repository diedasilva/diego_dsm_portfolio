'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Gestion smooth scroll pour les ancres
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash.length > 1) {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
          }
        }
      }
    }
    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick);
    }
  }, [])

  return <>{children}</>
}