import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
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
