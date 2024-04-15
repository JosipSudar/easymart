import { useEffect } from "react";
import { useState } from "react";
import Featured from "../Components/Featured";
import axios from "axios";
import Gallery from "../Components/Gallery";
import Newsletter from "../Components/Newsletter";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const fetchFP = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      const sliceproducts = res.data.slice(0, 10);
      setFeaturedProducts(sliceproducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFC = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setFeaturedCategories(res.data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    fetchFP();
    fetchFC();
    document.title = "Easymart | Home";
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <div className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover bg-blend-darken"
          style={{
            transform: `translateY(-${scrollPosition * 0.5}px)`,
          }}
        >
          <source
            src="https://cdn.pixabay.com/video/2020/08/19/47601-451623945_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          Discover amazing deals and discounts on a wide range of products
        </div>
      </div>

      <div className=" max-w-[1200px] mx-auto">
        <div className="flex justify-between mb-10 items-center">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <p className="text-gray-500 text-lg">
            Discover our top picks from the latest trends and must-have items.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <Featured
              key={product.id}
              image={product.thumbnail}
              desc={product.description}
              name={product.title}
              price={product.price}
              rating={product.rating}
              id={product.id}
            />
          ))}
        </div>
      </div>

      <Gallery />

      <div className=" max-w-[1200px] mx-auto my-36">
        <div className="flex flex-col justify-between mb-20 items-center">
          <h2 className="text-3xl font-bold">Featured Categories</h2>
          <p className="text-gray-500 text-lg">
            From Fashion to Electronics, Our Featured Categories Have Something
            for Everyone!
          </p>
        </div>
        <div className="grid grid-cols-5 gap-10 text-center">
          {featuredCategories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="p-2 hover:bg-blue-200 rounded-lg scale-110 duration-300 cursor-pointer"
            >
              <p className="text-lg font-bold">{category}</p>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
    </main>
  );
};

export default Home;
