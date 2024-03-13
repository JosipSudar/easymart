import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { increaseQuantity } from "@/state/cart/cartSlice";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  let quantity = 1;
  const dispach = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setProduct((prev) => ({ ...prev, quantity }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const products = cart.cart;
    const productInCart = products.find((item) => item.id === product.id);
    if (productInCart) {
      dispach(increaseQuantity({ id: product.id }));
      toast("Increased quantity of product in cart");
    } else {
      dispach({ type: "cart/addToCart", payload: product });
      toast("Added to cart");
    }
  };

  return (
    <>
      {product?.id && (
        <main className="max-w-7xl mx-auto my-20">
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
              <button
                className="w-full bg-blue-500 text-white rounded-md p-4"
                onClick={() => addToCart()}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="my-20">
            <p className="text-3xl text-center">{product.description}</p>
          </div>
          <div>
            <h3 className="text-2xl my-10">Product Gallery</h3>
            <div className="flex overflow-x-auto h-60">
              {product?.images.map((image, index) => (
                <img src={image} alt="product" key={index} className="w-1/3" />
              ))}
            </div>
          </div>
          <Toaster />
        </main>
      )}
    </>
  );
};

export default Product;
