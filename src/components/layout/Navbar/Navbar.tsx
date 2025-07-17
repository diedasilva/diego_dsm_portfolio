"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        navRef.current.classList.add('navbar-visible');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current && menuToggleRef.current) {
      menuRef.current.classList.toggle('active');
      menuToggleRef.current.classList.toggle('active');
    }
  };

  const closeMenu = () => {
    if (menuRef.current && menuToggleRef.current) {
      menuRef.current.classList.remove('active');
      menuToggleRef.current.classList.remove('active');
    }
  };

  return (
    <nav ref={navRef} className="navbar">
        <div className="signature-nav">Diego Da Silva Marques</div>
        
        {/* Menu hamburger pour mobile */}
        <div ref={menuToggleRef} className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul ref={menuRef} className="flex space-x-6">
          <li><Link href="#hero" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link href="#bio" className="nav-link" onClick={closeMenu}>Biography</Link></li>
          <li><Link href="#projects" className="nav-link" onClick={closeMenu}>Projects</Link></li>
          <li><Link href="#contacts" className="nav-link" onClick={closeMenu}>Contact</Link></li>
        </ul>
    </nav>
  );
}
