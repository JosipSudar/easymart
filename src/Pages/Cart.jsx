import { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../state/cart/cartSlice";
import { Toaster, toast } from "sonner";
import getUserData from "@/utils/getUserData";
import axios from "axios";
import DarkModeContext from "@/state/DarkMode";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/utils/baseUrl";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userID = localStorage.getItem("userID");
  const [userData, setUserData] = useState();
  const [itemsPrice, setItemsPrice] = useState(0);
  const deliveryPrice = 5;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setCartProducts(cart.cart);
    document.title = "Easymart | Cart";
  }, [cart]);

  useEffect(() => {
    getUserData(userID).then((data) => {
      setUserData(data.user);
    });
  }, []);

  const handleIncreaseQuantity = (productId) => {
    const product = cartProducts.filter((item) => item._id === productId);
    console.log(product);
    if (product) {
      dispatch(increaseQuantity({ _id: productId }));
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cartProducts.filter((item) => item._id === productId);
    if (product) {
      dispatch(decreaseQuantity({ _id: productId }));
    }
  };

  const removeProduct = (productId) => {
    const newCart = cartProducts.filter((item) => item._id !== productId);
    if (newCart) {
      dispatch(removeFromCart({ _id: productId }));
    }
  };

  const calculateTotal = () => {
    const total = cartProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setItemsPrice(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You need to login to confirm the order");
      return;
    }
    calculateTotal();
    axios
      .post(`${baseUrl}/api/orders`, {
        orderItems: cartProducts,
        adress: userData.userAdress.street,
        city: userData.userAdress.city,
        postalCode: userData.userAdress.zip,
        country: userData.userAdress.country,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        deliveryPrice: deliveryPrice,
        totalPrice: itemsPrice + deliveryPrice,
        user: userID,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Order placed successfully");
          localStorage.removeItem("reduxState");
          navigate("/order-success");
          window.location.reload();
        }
      });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <main className="max-w-7xl mx-auto py-20 px-2">
          <h1 className="text-3xl text-center">Cart</h1>
          <div className="flex flex-col">
            <div className="flex-1">
              {cartProducts && cartProducts.length > 0 ? (
                <>
                  {cartProducts.map((product, index) => (
                    <>
                      <div
                        key={index}
                        className="grid grid-cols-2 border-2 border-slate-500 my-5 p-5 rounded-sm bg-white text-black"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.thumbnail}
                            alt="img"
                            className="w-20 h-20 mr-4 object-cover"
                          />
                          <div>
                            <p>{product.title}</p>
                            <p>{product.price}$</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-around">
                          <button
                            disabled={product.quantity === 1}
                            onClick={() => handleDecreaseQuantity(product._id)}
                            className=" disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <FaArrowLeft />
                          </button>
                          <span className="mx-4">{product?.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(product._id)}
                            disabled={product.quantity === product.stock}
                            className=" disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <FaArrowRight />
                          </button>
                          <div className="mx-4">
                            {product?.price * product?.quantity}$
                          </div>
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                  <hr className="border-2 border-slate-300 my-10" />
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-3 flex-col lg:flex-row">
                      <div className="border-2 border-slate-500 p-5 lg:w-1/2 rounded-md bg-white text-black">
                        <h2 className="text-xl mb-10">Delivery information</h2>
                        <div className="flex flex-col space-y-6">
                          <div className="grid grid-cols-2 items-center">
                            <label>Name</label>
                            <input
                              type="text"
                              placeholder="Name"
                              value={userData?.username}
                              className="w-full bg-slate-300 p-2 text-black rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center">
                            <label>Email</label>
                            <input
                              type="email"
                              placeholder="example@email.com"
                              value={userData?.email}
                              className="w-full bg-slate-300 p-2 text-black rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center">
                            <label>Address</label>
                            <input
                              type="text"
                              placeholder="Address"
                              value={userData?.userAdress?.street}
                              className="w-full bg-slate-300 p-2 text-black rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center">
                            <label>City</label>
                            <input
                              type="text"
                              placeholder="City"
                              value={userData?.userAdress?.city}
                              className="w-full bg-slate-300 p-2 text-black rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center">
                            <label>ZIP Code</label>
                            <input
                              type="number"
                              placeholder="ZIP"
                              value={userData?.userAdress?.zip}
                              className="w-full bg-slate-300 p-2 text-black rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="border-2 border-slate-500 p-5 lg:w-1/2 rounded-md bg-white text-black">
                        <h2 className="text-xl">Payment method</h2>
                        <div>
                          <div>
                            <p className="text-md text-center my-5">Pay with</p>
                            <div className="flex gap-3 text-3xl justify-center">
                              <FaApple />
                              <FaGoogle />
                              <FaPaypal />
                            </div>
                          </div>
                          <hr className="border-2 border-slate-100 my-10" />
                          <div className="flex flex-col space-y-6">
                            <div className="grid grid-cols-2 items-center">
                              <label>Payment method</label>
                              <select
                                name="payment"
                                id="payment"
                                className="w-full bg-slate-100 p-2 text-black rounded-md"
                              >
                                <option
                                  value="card"
                                  onClick={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                >
                                  Credit or Debit Card
                                </option>
                                <option
                                  value="cash"
                                  onClick={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                  selected
                                >
                                  Cash on Delivery
                                </option>
                              </select>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                              <label>Card number</label>
                              <input
                                type="number"
                                placeholder="Card number"
                                className={
                                  paymentMethod !== "card"
                                    ? "w-full bg-slate-100 p-2 text-black rounded-md cursor-not-allowed"
                                    : "w-full bg-slate-100 p-2 text-black rounded-md"
                                }
                                disabled={paymentMethod !== "card"}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label>CVV</label>
                              <input
                                type="number"
                                placeholder="CVV"
                                className={
                                  paymentMethod !== "card"
                                    ? "w-full bg-slate-100 p-2 text-black rounded-md cursor-not-allowed"
                                    : "w-full bg-slate-100 p-2 text-black rounded-md"
                                }
                                disabled={paymentMethod !== "card"}
                              />
                              <label>Expiry date</label>
                              <input
                                type="date"
                                placeholder="Expiry date"
                                className={
                                  paymentMethod !== "card"
                                    ? "w-full bg-slate-100 p-2 text-black rounded-md cursor-not-allowed"
                                    : "w-full bg-slate-100 p-2 text-black rounded-md"
                                }
                                disabled={paymentMethod !== "card"}
                              />
                            </div>
                            <hr className="border-2 border-slate-100" />
                            <div className="flex flex-col text-right space-y-3">
                              <p className="text-xl font-bold">
                                Order total:{" "}
                                <span className="text-blue-500 ml-3">
                                  {cartProducts.reduce(
                                    (acc, curr) =>
                                      acc + curr.price * curr.quantity,
                                    0
                                  )}
                                  $
                                </span>
                              </p>
                              <p className="text-md">Delivery cost: 5$</p>
                              <p className="text-xl font-bold">
                                Total:{" "}
                                {cartProducts.reduce(
                                  (acc, curr) =>
                                    acc + curr.price * curr.quantity,
                                  0
                                ) + 5}
                                $
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-10 flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md lg:w-1/3 w-full hover:bg-blue-600"
                      >
                        Confirm order
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center text-2xl my-10 md:h-[80vh]">
                  No products in cart
                </div>
              )}
            </div>
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default Cart;
