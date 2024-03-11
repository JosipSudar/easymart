import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const handleDecreaseQuantity = (index) => {
    const updatedCartProducts = [...cartProducts];
    if (updatedCartProducts[index].quantity > 1) {
      updatedCartProducts[index].quantity--;
      setCartProducts(updatedCartProducts);
      updateLocalStorage(updatedCartProducts);
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCartProducts = [...cartProducts];
    updatedCartProducts[index].quantity++;
    setCartProducts(updatedCartProducts);
    updateLocalStorage(updatedCartProducts);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <main className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl">Cart</h1>
      <hr className="border-2 border-slate-500 my-5" />
      <div className="flex flex-col">
        <div className="flex-1">
          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-2 border-2 border-slate-500 my-5 p-5 rounded-sm"
              >
                <div className="flex items-center">
                  <img
                    src={product.thumbnail}
                    alt="img"
                    className="w-20 h-20 mr-4"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>{product.price}$</p>
                  </div>
                </div>
                <div className="flex items-center justify-around">
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    <FaArrowLeft />
                  </button>
                  <span className="mx-4">{product?.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    <FaArrowRight />
                  </button>
                  <div className="mx-4">
                    {product.price * product.quantity}$
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products in the cart.</p>
          )}
        </div>
        <hr className="border-2 border-slate-300 my-10 " />
        <div className="flex gap-3">
          <div className="border-2 border-slate-500 p-5 w-1/2 rounded-md">
            <h2 className="text-xl mb-10">Delivery information</h2>
            <form className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 items-center">
                <label>First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 items-center">
                <label>Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 items-center">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 items-center">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 items-center">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 items-center">
                <label>ZIP Code</label>
                <input
                  type="number"
                  placeholder="ZIP"
                  className="w-full bg-slate-100 p-2 text-black rounded-md"
                />
              </div>
            </form>
          </div>
          <div className="border-2 border-slate-500 p-5 w-1/2 rounded-md">
            <h2 className="text-xl">Payment method</h2>
            <form>
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
                    <option value="card">Credit or Debit Card</option>
                    <option value="cash">Cash on Delivery</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label>Card number</label>
                  <input
                    type="number"
                    placeholder="Card number"
                    className="w-full bg-slate-100 p-2 text-black rounded-md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label>CVV</label>
                  <input
                    type="number"
                    placeholder="CVV"
                    className="w-full bg-slate-100 p-2 text-black rounded-md"
                  />
                  <label>Expiry date</label>
                  <input
                    type="date"
                    placeholder="Expiry date"
                    className="w-full bg-slate-100 p-2 text-black rounded-md"
                  />
                </div>
                <hr className="border-2 border-slate-100" />
                <div className="flex flex-col text-right space-y-3">
                  <p className="text-xl font-bold">
                    Order total:{" "}
                    <span className="text-blue-500 ml-3">
                      {cartProducts.reduce(
                        (acc, curr) => acc + curr.price * curr.quantity,
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
            </form>
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-center">
        <button className="bg-blue-500 text-white p-3 rounded-md w-1/3">
          Confirm order
        </button>
      </div>
    </main>
  );
};

export default Cart;
