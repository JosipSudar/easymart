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
      <div className="flex">
        <div className="w-2/3">
          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between my-4"
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
                <div className="flex items-center">
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    <FaArrowLeft />
                  </button>
                  <span className="mx-4">{product?.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    <FaArrowRight />
                  </button>
                </div>
                <div>{product.price * product.quantity}$</div>
              </div>
            ))
          ) : (
            <p>No products in the cart.</p>
          )}
        </div>
        <div className="w-1/3 p-5">
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
