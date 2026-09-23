import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  useEffect(() => {
    // Clean up any existing smoother before creating a new one (handles React StrictMode)
    const existing = ScrollSmoother.get();
    if (existing) {
      existing.kill();
    }

    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        speed: 1.5,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true);
    } catch (e) {
      console.warn("ScrollSmoother initialization:", e);
    }

    const clickHandlers: Array<{ elem: HTMLAnchorElement; handler: (e: MouseEvent) => void }> = [];
    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");

    links.forEach((elem) => {
      const handler = (e: MouseEvent) => {
        if (window.innerWidth > 1024 && smoother) {
          e.preventDefault();
          const section = elem.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      };
      elem.addEventListener("click", handler);
      clickHandlers.push({ elem, handler });
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clickHandlers.forEach(({ elem, handler }) => {
        elem.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", onResize);
      if (smoother) {
        smoother.kill();
        smoother = null;
      }
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Karan Soni
        </a>
        <a
          href="mailto:desigrafix.studio@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          desigrafix.studio@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
