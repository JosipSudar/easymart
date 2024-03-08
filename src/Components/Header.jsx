import { GrLanguage } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
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
      </div>
      <div>
        <h1 className=" text-3xl font-bold">
          Easy<span className="text-blue-500">Mart</span>
        </h1>
      </div>
      <div>
        <nav className="flex gap-3 text-xl items-center">
          <p>Home</p>
          <p>Products</p>
          <p>About</p>
          <p>Contact</p>
          <p>User</p>
          <FaCartShopping className=" relative" />
          <span className="absolute top-7 right-2 text-white bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">
            0
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
