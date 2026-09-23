import { useRef } from "react";
import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Career = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 75%",
          end: "bottom 75%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(
          ".career-timeline",
          { maxHeight: "10%", opacity: 0 },
          { maxHeight: "100%", opacity: 1, duration: 1 }
        )
        .fromTo(
          ".career-info-box",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.25, duration: 1 },
          0
        );
    },
    { scope: containerRef }
  );

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Fine Arts (BFA)</h4>
                <h5>Lovely Professional University</h5>
              </div>
              <h3>2022 - 2026</h3>
            </div>
            <p>
              Focused on Visual Communication, Fine Arts, and Digital Media.
              Multiple-time Gold Medalist in AIU National & State Level Poster Making & Fine Arts Festivals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer Intern</h4>
                <h5>Mindcraft Events</h5>
              </div>
              <h3>JUN 2025</h3>
            </div>
            <p>
              Assisted in event branding and marketing collateral design.
              Prepared production-ready artwork and visual assets for large-scale corporate and social events.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic & Motion Designer</h4>
                <h5>Mindcraft Events</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing end-to-end event and exhibition branding (stage backdrops, LED screens, standees, brochures).
              Creating high-impact social media posts, motion graphics, and promotional videos from concept to final delivery.
            </p>
          </div>
        </div>

        <div className="career-achievements">
          <h3 className="achievements-title">Honors & Achievements</h3>
          <div className="achievements-grid">
            <div className="achievement-card">
              <span className="achievement-badge">🏆 GOLD MEDAL</span>
              <h4>AIU National Youth Festival</h4>
              <p>Poster Making (National Level) • 2025</p>
            </div>
            <div className="achievement-card">
              <span className="achievement-badge">🏆 GOLD MEDAL</span>
              <h4>AIU North Zone Youth Festival</h4>
              <p>Poster Making (Zonal Level) • 2025</p>
            </div>
            <div className="achievement-card">
              <span className="achievement-badge">🏆 GOLD MEDAL</span>
              <h4>Punjab State Youth Festival</h4>
              <p>Still Life Fine Arts • 2025</p>
            </div>
            <div className="achievement-card">
              <span className="achievement-badge">⭐ 3× GOLD & 1× SILVER</span>
              <h4>Spectra Youth Festival</h4>
              <p>Poster Making, Spot Painting, Cartooning & Collage • 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
