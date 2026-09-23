import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const flexRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !flexRef.current) return;

      const getScrollAmount = () => {
        if (!flexRef.current) return 1800;
        const flexWidth = flexRef.current.scrollWidth;
        const winWidth = window.innerWidth;
        return Math.max(0, flexWidth - winWidth + 120);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work-pin",
        },
      });

      tl.to(flexRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Refresh ScrollTrigger once images/fonts settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(timer);
        tl.kill();
        ScrollTrigger.getById("work-pin")?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {[
            {
              title: "Event & Stage Experience Branding",
              category: "Event & Exhibition Design",
              tools: "LED Screen Visuals, Stage Backdrops, Standees, Illustrator",
            },
            {
              title: "Dynamic Motion Promos & Reels",
              category: "Motion Graphics & Video Editing",
              tools: "After Effects, Premiere Pro, Sound Design, Kinetic Typography",
            },
            {
              title: "3D Visuals & Product Renders",
              category: "3D Design & Animation",
              tools: "Blender, Texturing, Lighting, 3D Asset Creation",
            },
            {
              title: "Complete Brand Identity Suite",
              category: "Branding & Print Design",
              tools: "Brand Guidelines, Typography, InDesign, Production Artworks",
            },
            {
              title: "Social Media Campaign Creatives",
              category: "Digital Marketing Design",
              tools: "High-Engagement Visuals, Figma, Photoshop, Ad Creatives",
            },
            {
              title: "AIU National Youth Festival Posters",
              category: "Award-Winning Poster Design",
              tools: "Gold Medal Series, Fine Art, Visual Storytelling, Concept Art",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
