/* eslint-disable react/no-unescaped-entities */
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useContext, useEffect } from "react";
import DarkModeContext from "@/state/DarkMode";

const Contact = () => {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.title = "Easymart | Contact";
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <main className="max-w-7xl mx-auto space-y-20 pt-40">
          <div>
            <h1 className="text-5xl text-center mb-10">Contact Us</h1>
            <p className="text-xl">
              We value your feedback and inquiries. Whether you have questions
              about our products, need assistance with an order, or simply want
              to share your thoughts with us, we're here to help. Get in touch
              with us using the information below:
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl">Customer Support:</h2>
              <p className="text-lg">
                Our dedicated support team is available to assist you with any
                inquiries or concerns you may have. You can reach us via email,
                phone, or live chat during our business hours:
              </p>
              <ul className="space-y-2">
                <li className="text-lg">Email: support@example.com</li>
                <li className="text-lg">Phone: +1 (555) 123-4567</li>
                <li className="text-lg">
                  Live Chat: Visit our website and click on the chat icon in the
                  bottom right corner.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl">Business Inquiries:</h2>
              <p className="text-lg">
                For partnership opportunities, media inquiries, or other
                business-related matters, please contact us at:
              </p>
              <ul className="space-y-2">
                <li className="text-lg">Email: support@example.com</li>
                <li className="text-lg">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl">Headquarters:</h3>
              <p className="text-lg">
                123 Main Street City, State, ZIP Country
              </p>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63964849.956617534!2d18.507992450000007!3d11.897803549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b2d8a5fabd1%3A0xef7b63fa765a76eb!2sEasyMart!5e0!3m2!1shr!2shr!4v1710076173016!5m2!1shr!2shr"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[450px] rounded-md"
              ></iframe>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl">Social Media:</h3>
              <p className="text-lg">
                Stay connected with us on social media for the latest updates,
                promotions, and more:
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <FaFacebookSquare className="text-3xl hover:scale-105 hover:text-blue-500" />
              <FaInstagram className="text-3xl hover:scale-105 hover:text-pink-500" />
              <FaSquareXTwitter className="text-3xl hover:scale-105 hover:text-sky-500" />
              <FaLinkedin className="text-3xl hover:scale-105 hover:text-blue-500" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
