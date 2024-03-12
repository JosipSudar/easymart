import { GrLanguage } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    localStorage.getItem("cart");
  }, [isLoggedIn]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="flex justify-between h-24 items-center p-5 shadow-lg bg-white">
      <div className="flex gap-3 items-center text-xl">
        <div className="flex gap-2 items-center">
          <GrLanguage />
          <IoIosArrowDown />
        </div>
        <div className="flex items-center gap-2">
          <span>USD</span>
          <IoIosArrowDown />
        </div>
        <div>
          {isLoggedIn ? (
            <p>Logged in as {localStorage.getItem("username")}</p>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>
      <div>
        <Link className=" text-3xl font-bold" to="/">
          Easy<span className="text-blue-500">Mart</span>
        </Link>
      </div>
      <div>
        <nav className="flex gap-3 text-xl items-center">
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
          {isLoggedIn ? (
            <button
              onClick={Logout}
              className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
            >
              Login
            </Link>
          )}
          <Link to="/cart">
            <FaCartShopping className=" relative" />
            <span className="absolute top-7 right-2 text-white bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">
              {localStorage.getItem("cart") ? (
                JSON.parse(localStorage.getItem("cart")).length
              ) : (
                <>0</>
              )}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
