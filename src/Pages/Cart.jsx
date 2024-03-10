import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

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
                className="grid grid-cols-2 border-2 border-slate-500 my-5 p-5"
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
        <div className="">
          <div>
            <h2>Delivery information</h2>
            <form>
              <div>
                <label>First name</label>
                <input type="text" placeholder="First name" />
              </div>
              <div>
                <label>Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="example@email.com" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
              <div>
                <label>City</label>
                <input type="text" placeholder="City" />
              </div>
              <div>
                <label>ZIP Code</label>
                <input type="number" placeholder="ZIP" />
              </div>
            </form>
          </div>
          <div>
            <h2>Payment method</h2>
            <form>
              <div></div>
            </form>
          </div>
          <p>
            Total:{" "}
            <span>
              {cartProducts.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0
              )}
              $
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
