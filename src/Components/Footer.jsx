import { Link } from "react-router-dom";
import footerImg from "../assets/images/payment.png";

const Footer = () => {
  return (
    <footer className="flex justify-between h-24 items-center p-5 bg-white mt-24 mb-10">
      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Contact
        </Link>
        <p>User</p>
      </nav>
      <nav className="flex flex-col gap-3">
        <Link
          to="/legal-notice"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Legal Notice
        </Link>
        <Link
          to="/privacy-policy"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Privacy Policy
        </Link>
        <Link
          to="/cookies"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Cookies
        </Link>
        <Link
          to="/terms-and-conditions"
          className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
        >
          Terms and Conditions
        </Link>
      </nav>
      <div>
        <p>© 2024 EasyMart. All rights reserved.</p>
        <img src={footerImg} alt="footerimg" />
      </div>
    </footer>
  );
};

export default Footer;
