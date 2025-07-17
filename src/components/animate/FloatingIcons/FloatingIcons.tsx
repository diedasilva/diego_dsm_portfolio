"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Code,
  Server,
  Terminal,
  Database,
  Cpu,
  Zap,
  Globe,
  Shield,
  Palette,
  GitBranch,
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Cloud,
  CloudUpload,
  CloudDownload,
  HardDrive,
  Folder,
  FileCode,
  Bug,
  Settings,
  Wifi,
  Network,
  Key,
  Lock,
  Unlock,
  User,
  Users,
  Activity,
  BarChart,
  PieChart,
  Sliders,
  Search,
  Eye,
  MessageCircle,
  Mail,
  Bluetooth,
  Usb,
  MousePointer,
  Mouse,
  Keyboard,
  Printer,
  Camera,
  Image,
  Video,
  Headphones,
  Satellite,
  Bot,
  Brain,
  Code2,
  CodeSquare,
  GitCommit,
  GitMerge,
  GitPullRequest,
  GitCompare,
  GitFork,
  TerminalSquare,
  FileJson,
  FileEdit,
  FileLock,
  Globe2,
  GlobeLock,
} from "lucide-react";
import gsap from "gsap";

const FloatingIcons: React.FC = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocitiesRef = useRef<{ x: number; y: number }[]>([]);
  const allIcons = [
    Code,
    Server,
    Terminal,
    Database,
    Cpu,
    Zap,
    Globe,
    Shield,
    Palette,
    GitBranch,
    Monitor,
    Laptop,
    Smartphone,
    Tablet,
    Cloud,
    CloudUpload,
    CloudDownload,
    HardDrive,
    Folder,
    FileCode,
    Bug,
    Settings,
    Wifi,
    Network,
    Key,
    Lock,
    Unlock,
    User,
    Users,
    Activity,
    BarChart,
    PieChart,
    Sliders,
    Search,
    Eye,
    MessageCircle,
    Mail,
    Bluetooth,
    Usb,
    MousePointer,
    Mouse,
    Keyboard,
    Printer,
    Camera,
    Image,
    Video,
    Headphones,
    Satellite,
    Bot,
    Brain,
    Code2,
    CodeSquare,
    GitCommit,
    GitMerge,
    GitPullRequest,
    GitCompare,
    GitFork,
    TerminalSquare,
    FileJson,
    FileEdit,
    FileLock,
    Globe2,
    GlobeLock,
  ];
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    // Détecter si on est sur mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      // Initialiser les vélocités
      const iconCount = isMobile ? 30 : 75; // Moins d'icônes sur mobile
      velocitiesRef.current = Array.from({ length: iconCount }, () => ({
        x: 0,
        y: 0,
      }));

      // Position initiale aléatoire
      iconsRef.current.forEach((el) => {
        if (!el) return;

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        gsap.set(el, {
          x: startX,
          y: startY,
          opacity: 0.1,
          scale: 0.8,
        });
      });
    }, 100);

    // Détection de la souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation fluide avec repoussement
    const updateIcons = () => {
      iconsRef.current.forEach((el, index) => {
        if (!el) return;

        // S'assurer que la vélocité existe
        if (!velocitiesRef.current[index]) {
          velocitiesRef.current[index] = { x: 0, y: 0 };
        }

        const rect = el.getBoundingClientRect();
        const iconX = rect.x + rect.width / 2;
        const iconY = rect.y + rect.height / 2;

        const dx = iconX - mouseRef.current.x;
        const dy = iconY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const fleeDistance = isMobile ? 100 : 150; // Distance réduite sur mobile
        const velocity = velocitiesRef.current[index];

        // Ajouter un mouvement aléatoire léger
        velocity.x += (Math.random() - 0.5) * 0.1;
        velocity.y += (Math.random() - 0.5) * 0.1;

        // Repoussement de la souris
        if (distance < fleeDistance && distance > 0) {
          const force = (fleeDistance - distance) / fleeDistance;
          velocity.x += (dx / distance) * force * 0.5;
          velocity.y += (dy / distance) * force * 0.5;
        }

        // Limiter la vélocité
        velocity.x = Math.max(Math.min(velocity.x, 2), -2);
        velocity.y = Math.max(Math.min(velocity.y, 2), -2);

        // Appliquer la vélocité
        gsap.set(el, {
          x: `+=${velocity.x}`,
          y: `+=${velocity.y}`,
        });

        // Friction
        velocity.x *= 0.98;
        velocity.y *= 0.98;

        // Garder les icônes dans l'écran
        const newX = rect.x + velocity.x;
        const newY = rect.y + velocity.y;

        if (newX < 0 || newX > window.innerWidth - 20) {
          velocity.x *= -0.5;
        }
        if (newY < 0 || newY > window.innerHeight - 20) {
          velocity.y *= -0.5;
        }
      });

      requestAnimationFrame(updateIcons);
    };

    updateIcons();

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const iconCount = isMobile ? 30 : 75; // Moins d'icônes sur mobile
  const iconSize = isMobile ? 18 : 25; // Taille réduite sur mobile

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: iconCount }, (_, i) => {
        const Icon = allIcons[i % allIcons.length];
        return (
          <div
            key={i}
            ref={(el) => {
              iconsRef.current[i] = el;
            }}
            style={{
              position: "absolute",
              fontSize: "20px",
              color: "white",
              userSelect: "none",
            }}
          >
            <Icon size={iconSize} />
          </div>
        );
      })}
      <div className="background"></div>
    </div>
  );
};

export default FloatingIcons;
