import footerImg from "../assets/images/payment.png";

const Footer = () => {
  return (
    <footer className="flex justify-between h-24 items-center p-5 bg-white mt-24 mb-10">
      <nav className="flex flex-col gap-3">
        <p>Home</p>
        <p>Products</p>
        <p>About</p>
        <p>Contact</p>
        <p>User</p>
      </nav>
      <nav className="flex flex-col gap-3">
        <p>Legal Notice</p>
        <p>Privacy Policy</p>
        <p>Cookies</p>
        <p>Terms and Conditions</p>
      </nav>
      <div>
        <p>© 2024 EasyMart. All rights reserved.</p>
        <img src={footerImg} alt="footerimg" />
      </div>
    </footer>
  );
};

export default Footer;
