import "./styles/Landing.css";
import KineticMotionHero from "./KineticMotionHero";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <KineticMotionHero />
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            KARAN
            <br />
            <span>SONI</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>A Creative</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Graphic</div>
            <div className="landing-h2-2">Motion</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Designer</div>
            <div className="landing-h2-info-1">Artist</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
