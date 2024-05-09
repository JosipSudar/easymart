import DarkModeContext from "@/state/DarkMode";
import { useContext, useEffect } from "react";

/* eslint-disable react/no-unescaped-entities */
const About = () => {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.title = "Easymart | About";
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <main className="max-w-7xl mx-auto md:py-40 space-y-56 px-5 py-10">
          <div>
            <h1 className="text-5xl text-center mb-10">Welcome to easymart.</h1>
            <p className="text-3xl">
              At easymart, we are committed to revolutionizing the way you shop
              online. Just like the world-renowned Amazon, we strive to provide
              an unparalleled shopping experience that combines convenience,
              affordability, and reliability.
            </p>
          </div>
          <div className="flex gap-10 flex-wrap md:flex-nowrap">
            <div>
              <h2 className="text-4xl mb-10">Our Story</h2>
              <p className="text-3xl">
                easymart was founded with a simple yet powerful vision: to
                connect people with the products they love in the most efficient
                and enjoyable way possible. Inspired by the success of
                e-commerce giants like Amazon, we set out to create a platform
                that caters to the diverse needs of shoppers worldwide.
              </p>
            </div>
            <img
              src="/src/assets/images/thumbnail.png"
              alt="img"
              className="md:w-1/3 object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-4xl mb-10">What sets us apart</h3>
            <ul className="text-2xl space-y-5 text-justify">
              <li className="list-inside list-disc">
                Extensive Product Selection: With millions of products across
                various categories, from electronics and fashion to home
                essentials and beyond, easymart offers something for everyone.
              </li>
              <li className="list-inside list-disc">
                Competitive Pricing: We work tirelessly to bring you the best
                deals and discounts on your favorite items, ensuring that you
                get the most value for your money.
              </li>
              <li className="list-inside list-disc">
                Fast and Reliable Shipping: Our streamlined logistics network
                ensures prompt delivery to your doorstep, wherever you are in
                the world.
              </li>
              <li className="list-inside list-disc">
                Exceptional Customer Service: Our dedicated support team is
                always available to assist you with any inquiries or concerns
                you may have, ensuring a hassle-free shopping experience from
                start to finish.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-4xl mb-10">Join us:</h3>
            <p className="text-3xl">
              Whether you're a seasoned online shopper or new to the world of
              e-commerce, we invite you to discover the convenience and
              excitement of shopping at easymart. Browse our extensive catalog,
              enjoy unbeatable deals, and experience the future of online
              shopping today.
            </p>
          </div>
          <p
            className="w-full h-96 md:text-3xl text-white text-center items-center justify-center flex font-bold bg-gray-300 text-xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            Thank you for choosing easymart. Happy Shopping!
          </p>
        </main>
      </div>
    </div>
  );
};

export default About;
