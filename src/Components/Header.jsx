import { GrLanguage } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaTrashAlt } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { removeFromCart } from "@/state/cart/cartSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = localStorage.getItem("username");
  const dispach = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    setItems(cart.cart);
  }, [cart, isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const removeItem = (id) => {
    dispach(removeFromCart({ id }));
  };

  return (
    <>
      <header className=" hidden lg:flex justify-between h-24 items-center p-5 shadow-lg bg-white">
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
              <DropdownMenu className=" p-4">
                <DropdownMenuTrigger>{user}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Link className={buttonVariants({ variant: "ghost" })}>
                      My Account
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      className=" text-center"
                      variant="ghost"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            {!isLoggedIn && (
              <Link
                to="/login"
                className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
              >
                Login
              </Link>
            )}
            <Sheet>
              <SheetTrigger>
                <FaCartShopping className=" relative" />
                <span className="absolute top-7 right-2 text-white bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">
                  {items ? items.length : 0}
                </span>
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between">
                <SheetHeader>
                  <SheetTitle>My cart</SheetTitle>
                  <SheetDescription className="grid grid-cols-2 gap-2 max-h-[80vh] overflow-y-scroll w-full">
                    {items ? (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col items-center gap-2 justify-between border border-slate-500 rounded-md pb-2 h-full"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className=" w-full object-cover h-28 rounded-md"
                          />
                          <p>{item.title}</p>
                          <p>${item.price}</p>
                          <Button
                            onClick={() => removeItem(item.id)}
                            variant="secondary"
                          >
                            <FaTrashAlt />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className=" text-center">No items in cart</p>
                    )}
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Link
                    to="/cart"
                    className="w-full bg-blue-500 text-white rounded-md p-2 text-center mt-auto"
                  >
                    View Cart
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>
      <header className="flex justify-between bg-white py-4 px-10 lg:hidden">
        <Popover>
          <PopoverTrigger>
            <CiMenuFries className=" w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent>
            <nav className="flex flex-col gap-3 text-xl items-center">
              <div>
                <Link className=" text-xl font-bold" to="/">
                  Easy<span className="text-blue-500">Mart</span>
                </Link>
              </div>
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
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="hover:text-blue-500 transition duration-300 hover:underline underline-offset-8"
                >
                  Login
                </Link>
              )}
              <div>
                {isLoggedIn ? (
                  <DropdownMenu className=" p-4">
                    <DropdownMenuTrigger>{user}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        <Link className={buttonVariants({ variant: "ghost" })}>
                          My Account
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button
                          className=" text-center"
                          variant="ghost"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <p>No user logged in</p>
                )}
              </div>
            </nav>
          </PopoverContent>
        </Popover>
        <Sheet>
          <SheetTrigger>
            <div className=" relative">
              <FaCartShopping className=" w-8 h-8" />
              <span className="absolute top-0 right-0 text-white bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">
                {items ? items.length : 0}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle>My cart</SheetTitle>
              <SheetDescription className="grid grid-cols-2 gap-2 max-h-[80vh] overflow-y-scroll w-full">
                {items ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-2 justify-between border border-slate-500 rounded-md pb-2 h-full"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className=" w-full object-cover h-28 rounded-md"
                      />
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="secondary"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className=" text-center">No items in cart</p>
                )}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Link
                to="/cart"
                className="w-full bg-blue-500 text-white rounded-md p-2 text-center mt-auto"
              >
                View Cart
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};

export default Header;
