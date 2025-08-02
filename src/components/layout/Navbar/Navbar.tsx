"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const switchLanguage = (locale: string) => {
    // Extraire le chemin sans la locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const toggleDropdown = (event: React.MouseEvent) => {
    const dropdownContainer = event.currentTarget.closest('.dropdown-container');
    if (dropdownContainer) {
      dropdownContainer.classList.toggle('open');
    }
  };

  // Détecter la locale actuelle
  const currentLocale = pathname.startsWith('/fr') ? 'fr' : 'en';

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
          <li><Link href="#hero" className="nav-link" onClick={closeMenu}>{t("home")}</Link></li>
          <li><Link href="#bio" className="nav-link" onClick={closeMenu}>{t("biography")}</Link></li>
          <li><Link href="#projects" className="nav-link" onClick={closeMenu}>{t("projects")}</Link></li>
          <li><Link href="#contacts" className="nav-link" onClick={closeMenu}>{t("contact")}</Link></li>
          
          {/* Sélecteur de langue - Desktop */}
          <li className="language-selector desktop-only">
            <button
              onClick={() => switchLanguage('en')}
              className={`lang-btn ${currentLocale === 'en' ? 'active' : ''}`}
            >
              EN
            </button>
            <span className="lang-separator">|</span>
            <button
              onClick={() => switchLanguage('fr')}
              className={`lang-btn ${currentLocale === 'fr' ? 'active' : ''}`}
            >
              FR
            </button>
          </li>

          {/* Sélecteur de langue - Mobile */}
          <li className="language-selector mobile-only">
            <div className="dropdown-container">
              <button
                className="dropdown-toggle"
                onClick={toggleDropdown}
              >
                {currentLocale.toUpperCase()}
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-menu">
                <button
                  className={`dropdown-item ${currentLocale === 'en' ? 'active' : ''}`}
                  onClick={() => switchLanguage('en')}
                >
                  EN
                </button>
                <button
                  className={`dropdown-item ${currentLocale === 'fr' ? 'active' : ''}`}
                  onClick={() => switchLanguage('fr')}
                >
                  FR
                </button>
              </div>
            </div>
          </li>
        </ul>
    </nav>
  );
}
