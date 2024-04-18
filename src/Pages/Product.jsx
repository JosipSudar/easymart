import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { increaseQuantity } from "@/state/cart/cartSlice";
import DarkModeContext from "@/state/DarkMode";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispach = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const products = cart.cart;
    const productInCart = products.find((item) => item.id === product._id);
    if (productInCart) {
      dispach(increaseQuantity({ id: product.id }));
      toast("Increased quantity of product in cart");
    } else {
      dispach({ type: "cart/addToCart", payload: product });
      toast("Added to cart");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {product?._id && (
        <div className="dark:bg-slate-800 dark:text-white">
          <main className="max-w-7xl mx-auto py-20">
            <div className="flex gap-10">
              <div className="w-2/3">
                <img
                  src={product.thumbnail}
                  alt="product"
                  className="w-full rounded-md"
                />
              </div>
              <div className="w-1/3 space-y-12">
                <h3 className="text-5xl font-bold text-center">
                  {product.title}
                </h3>
                <p className="text-3xl">Price: {product.price}$</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p>Rating: {product.rating}</p>
                    <FaStar className="text-yellow-500" />
                  </div>
                  <p>In stock: {product.stock}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xl">Brand: {product.brand}</p>
                  <p className="text-xl">Category: {product.category}</p>
                </div>
                {product.stock > 0 ? (
                  <button
                    onClick={addToCart}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                    disabled
                  >
                    Out of stock
                  </button>
                )}
              </div>
            </div>
            <div className="my-20">
              <p className="text-3xl text-center">{product.description}</p>
            </div>
            <div>
              <h3 className="text-2xl my-10">Product Gallery</h3>
              <div className="flex overflow-x-auto h-60 gap-4">
                {product?.images.map((image, index) => (
                  <img
                    src={image}
                    alt="product"
                    key={index}
                    className="w-1/3 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
            <Toaster position="bottom-left" />
          </main>
        </div>
      )}
    </div>
  );
};

export default Product;
