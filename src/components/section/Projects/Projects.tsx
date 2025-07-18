"use client";

import React, { useEffect, useRef } from "react";
import "./Projects.css";
import Image from "next/image";
import projectsData from "@/../public/data/projects.json";
import { Project } from "@/types/Project";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeContent from "../../animate/FadeContent/FadeContent";
import ModalProjects from "../../animate/ModalProjects/ModalProjects";

gsap.registerPlugin(ScrollTrigger);

const projects = projectsData as Project[];

let modalOpen = false;
let selectedProject: Project | null = null;
let rerender: (() => void) | null = null;

function openModal(project: Project) {
  selectedProject = project;
  modalOpen = true;
  if (rerender) rerender();
}

function closeModal() {
  modalOpen = false;
  if (rerender) rerender();
}

export default function Projects() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;

    if (!section || !path) return;

    // Animation du tracé de la courbe avec GSAP
    const totalLength = path.getTotalLength();

    gsap.fromTo(
      path,
      {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "95% top",
          scrub: true,
          markers: false,
          onUpdate: () => {
            if (!pathRef.current || !arrowRef.current) return;
            const currentOffset = parseFloat(path.style.strokeDashoffset) || 0;
            const visibleLength = totalLength - currentOffset;
            const p1 = path.getPointAtLength(visibleLength);
            const p0 = path.getPointAtLength(Math.max(visibleLength - 2, 0));
            const angle =
              (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI;
            arrowRef.current.setAttribute(
              "transform",
              `translate(${p1.x},${p1.y}) rotate(${angle})`
            );
          },
        },
      }
    );

    // Animation d'apparition progressive des project-content
    const projectContents = gsap.utils.toArray(".project-content");
    projectContents.forEach((content, index) => {
      const isLeft = index % 2 === 0;
      const xOffset = isLeft ? -100 : 100;

      gsap.fromTo(
        content as HTMLElement,
        {
          opacity: 0,
          x: xOffset,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out",
          scrollTrigger: {
            trigger: content as HTMLElement,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });

    // Animation des dates avec mouvement opposé
    const projectDates = gsap.utils.toArray(".project-date");
    projectDates.forEach((date, index) => {
      const isLeft = index % 2 === 0;
      const xOffset = isLeft ? 100 : -100;

      gsap.fromTo(
        date as HTMLElement,
        {
          opacity: 0,
          x: xOffset,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.75,
          ease: "elastic.out",
          scrollTrigger: {
            trigger: date as HTMLElement,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });

    // Cleanup ScrollTrigger et events
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const [, setTick] = React.useReducer((x) => x + 1, 0);
  rerender = setTick;

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <svg
        ref={svgRef}
        viewBox="0 0 1920 2366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="squiggle"
      >
          <path
            ref={pathRef}
            d="M1921.99 185C1921.99 185 1265 -198 1279.95 209.648C1279.95 819.173 634.554 475.659 634.554 819.174C634.554 1162.69 1288.46 919.678 1288.46 1251.19C1288.46 1582.71 634.554 1398.7 634.554 1698.21C634.554 1997.72 1009.46 1873.72 1009.46 2119.23"
            stroke="#F97516"
            strokeWidth="4"
          />
          <g ref={arrowRef}>
            <polygon
              points="-40,-20 0,0 -40,20"
              stroke="#F97516"
              strokeWidth="5"
            />
          </g>
      </svg>
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="subheading title-projects">
          Learning, Creating, Delivering: My Work in Action
        </div>
      </FadeContent>

      <div className="project-content-head">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-content ${index % 2 === 0 ? "left" : ""}`}
          >
            <div className="project-info">
              <Image
                alt={`Logo de ${project.title}`}
                src={project.logo}
                width={120}
                height={60}
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.stack}</p>
              <button
                className="project-link"
                onClick={() => openModal(project)}
              >
                En savoir plus
              </button>
            </div>
            <div
              className={`project-date ${index % 2 === 0 ? "right" : "left"}`}
            >
              {project.date}
            </div>
          </div>
        ))}
      </div>
      <ModalProjects
        open={modalOpen}
        project={selectedProject || projects[0]}
        onClose={closeModal}
      />
    </section>
  );
}
