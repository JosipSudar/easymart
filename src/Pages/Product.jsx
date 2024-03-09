import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Product = () => {
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/1`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product && (
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
              <button className="w-full bg-blue-500 text-white rounded-md p-4">
                Add to cart
              </button>
            </div>
          </div>
          <div className="my-20">
            <p className="text-3xl text-center">{product.description}</p>
          </div>
          <div>
            <h3 className="text-2xl my-10">Product Gallery</h3>
            <div className="flex gap-5 overflow-x-auto">
              <img src={product.images[0]} alt="image" />
              <img src={product.images[1]} alt="image" />
              <img src={product.images[2]} alt="image" />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Product;
