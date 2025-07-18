import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Project } from "@/types/Project";
import "./ModalProjects.css";
import { createPortal } from "react-dom";

interface ModalProjectsProps {
  open: boolean;
  project: Project & {
    context?: string;
    challenges?: string[];
    stackIcons?: string[]; // URLs or icon class names
  };
  onClose: () => void;
}

export default function ModalProjects({
  open,
  project,
  onClose,
}: ModalProjectsProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (open && modalRef.current && overlayRef.current) {
      closingRef.current = false;
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(modalRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleClose() {
    if (closingRef.current) return;
    closingRef.current = true;
    if (modalRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          onClose();
        },
      });
    } else {
      onClose();
    }
  }

  if (!open) return null;

  const stackIconLabels: Record<string, string> = {
    "logo_react.svg": "React",
    "logo_express.svg": "Express.js",
    "logo_nodejs.svg": "Node.js",
    "logo_mongodb.svg": "MongoDB",
    "logo_docker.svg": "Docker",
    "logo_git.svg": "Git",
    "logo_nextjs.svg": "Next.js",
    "logo_java.svg": "Java",
    "logo_spring.svg": "Spring Boot",
    "logo_postgresql.svg": "PostgreSQL",
    "logo_angular.svg": "Angular",
    "logo_azure.svg": "Azure",
    "logo_mysql.svg": "MySQL",
  };

  return createPortal(
    <div className="modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div
        className="modal-projects"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="modal-header">
          <Image
            src={project.logo}
            alt={project.title}
            width={80}
            height={80}
            className="modal-logo"
          />
          <h2 className="subheading">{project.title}</h2>
          <p>{project.date}</p>
        </div>
        <div className="modal-description">
          <div className="modal-title subheading">Description : </div>
          {project.description}
        </div>
        {project.context && (
          <div className="modal-context">
            <div className="modal-title subheading">Context : </div>
            {project.context}
          </div>
        )}
        {project.challenges && project.challenges.length > 0 && (
          <div className="modal-challenges">
            <div className="modal-title subheading">
              Challenges :
            </div>
            <ul>
              {project.challenges.map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="modal-stack">
          <div className="modal-stack-icons">
            <div className="modal-title subheading">Stacks techniques :</div>
            {project.stackIcons && project.stackIcons.length > 0 ? (
              project.stackIcons.map((icon, i) => {
                const iconFile = icon.split("/").pop() || "";
                const label = stackIconLabels[iconFile] || iconFile.replace("logo_", "").replace(".svg", "");
                return (
                  <div key={i} className="stack-icon-wrapper">
                    <span className="stack-icon-tooltip">{label}</span>
                    <Image
                      width={48}
                      height={48}
                      src={icon}
                      alt={label}
                      className="stack-icon"
                    />
                  </div>
                );
              })
            ) : (
              <span>{project.stack}</span>
            )}
          </div>
        </div>
      </div>
    </div>,
    typeof window !== "undefined"
      ? document.body
      : document.createElement("div")
  );
}
