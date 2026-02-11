import "../App.css";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-modern">
      <div className="contact-content">
        <h2>
          Let’s Stay <span>Connected</span>
        </h2>

        <p>
          If you love our recipes and want more delicious inspiration,
          follow us and don’t hesitate to reach out anytime 💌
        </p>

        <div className="contact-social-modern">

          <a 
            href="https://wa.me/212612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn whatsapp"
          >
            <FaWhatsapp />
          </a>

          <a 
            href="https://instagram.com/username_dialek"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn instagram"
          >
            <FaInstagram />
          </a>

          <a 
            href="https://facebook.com/username_dialek"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn facebook"
          >
            <FaFacebookF />
          </a>

        </div>
      </div>
    </div>
  );
}
