import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:desigrafix.studio@gmail.com" data-cursor="disable">
                desigrafix.studio@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+917404331266" data-cursor="disable">
                +91 74043 31266
              </a>
            </p>
            <h4>Location</h4>
            <p style={{ color: "#a5a5a5", fontSize: "14px", marginTop: "4px" }}>
              Mahendergarh, Haryana, India
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.instagram.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.behance.net"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Behance <MdArrowOutward />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Dribbble <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed & Created <br /> by <span>Karan Soni</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
