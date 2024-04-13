import { useEffect, useState } from "react";
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

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userID = localStorage.getItem("userID");
  const [userData, setUserData] = useState();
  const [itemsPrice, setItemsPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(5);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setCartProducts(cart.cart);
    document.title = "Easymart | Cart";
  }, [cart]);

  useEffect(() => {
    getUserData(userID).then((data) => {
      setUserData(data.user);
    }
  )}, []);

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
   setUserData({
     ...userData.userAdress={
      ...userData.userAdress,
      country: "Croatia"
     }
    })
    calculateTotal();
    const order = {
      orderItems: cartProducts,
      shippingAdress: {
        address: userData.userAdress.street,
        city: userData.userAdress.city,
        postalCode: userData.userAdress.zip,
        country: userData.userAdress.country,
      },
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      deliveryPrice: deliveryPrice,
      totalPrice: itemsPrice + deliveryPrice,
      user: userID
    }
    axios.post("http://localhost:3000/api/orders", {
      order
    })
    .then((res) => {
      console.log(res);
    })
  };

  return (
    <main className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl text-center">Cart</h1>
      <div className="flex flex-col">
        <div className="flex-1">
          {cartProducts && cartProducts.length > 0 ? (
            <>
            {cartProducts.map((product, index) => (
              <>
                <div
                  key={index}
                  className="grid grid-cols-2 border-2 border-slate-500 my-5 p-5 rounded-sm"
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
                    <button onClick={() => handleDecreaseQuantity(product._id)}>
                      <FaArrowLeft />
                    </button>
                    <span className="mx-4">{product?.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(product._id)}>
                      <FaArrowRight />
                    </button>
                    <div className="mx-4">
                      {product?.price * product?.quantity}$
                    </div>
                    <button onClick={() => removeProduct(product._id)}>
                      Remove
                    </button>
                  </div>
                </div>
                
              </>
            ))}
            <hr className="border-2 border-slate-300 my-10 " />
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-3">
                    <div className="border-2 border-slate-500 p-5 w-1/2 rounded-md">
                      <h2 className="text-xl mb-10">Delivery information</h2>
                      <div className="flex flex-col space-y-6">
                        <div className="grid grid-cols-2 items-center">
                          <label>Name</label>
                          <input
                            type="text"
                            placeholder="Name"
                            value={userData?.username}
                            className="w-full bg-slate-100 p-2 text-black rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="example@email.com"
                            value={userData?.email}
                            className="w-full bg-slate-100 p-2 text-black rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <label>Address</label>
                          <input
                            type="text"
                            placeholder="Address"
                             value={userData?.userAdress?.street}
                            className="w-full bg-slate-100 p-2 text-black rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <label>City</label>
                          <input
                            type="text"
                            placeholder="City"
                            value={userData?.userAdress?.city}
                            className="w-full bg-slate-100 p-2 text-black rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <label>ZIP Code</label>
                          <input
                            type="number"
                            placeholder="ZIP"
                            value={userData?.userAdress?.zip}
                            className="w-full bg-slate-100 p-2 text-black rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-slate-500 p-5 w-1/2 rounded-md">
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
                                (acc, curr) => acc + curr.price * curr.quantity,
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
                      className="bg-blue-500 text-white p-3 rounded-md w-1/3"
                    >
                      Confirm order
                    </button>
                  </div>
                </form>
            </>
          ) : (
            <div className="text-center text-2xl my-10">
              No products in cart
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default Cart;
