import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    setTimeout(() => {
      alert("Product added to cart!");
      const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const newProduct = { ...product, quantity: 1 };
      console.log(newProduct, "product");
      const updatedCartItems = [...existingCartItems, newProduct];
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }, 1000);
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
                onClick={addToCart}
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
        </main>
      )}
    </>
  );
};

export default Product;
