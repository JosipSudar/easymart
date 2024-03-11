import { useEffect } from "react";
import { useState } from "react";
import Featured from "../Components/Featured";
import axios from "axios";
import Gallery from "../Components/Gallery";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const fetchFP = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products?limit=5&skip=10"
      );
      setFeaturedProducts(res.data.products);
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
          className="absolute top-0 left-0 w-full h-full object-fill bg-blend-darken"
          style={{
            transform: `translateY(-${scrollPosition * 0.5}px)`,
          }}
        >
          <source
            src="https://player.vimeo.com/external/538645836.sd.mp4?s=7adf7715469f5f425f29e5a0667545e78234e748&profile_id=164&oauth2_token_id=57447761"
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
        <div className="flex justify-between mb-20 items-center">
          <h2 className="text-3xl font-bold">Featured Categories</h2>
          <p className="text-gray-500 text-lg">
            From Fashion to Electronics, Our Featured Categories Have Something
            for Everyone!
          </p>
        </div>
        <div className="grid grid-cols-5 gap-10 text-center">
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              className="p-2 hover:bg-blue-200 rounded-lg scale-110 duration-300"
            >
              <p className="text-lg font-bold">{category}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-36 bg-blue-500 py-20">
        <div className="max-w-[1200px] mx-auto flex justify-around items-center text-white">
          <div>
            <h3 className="text-5xl">Newsletter</h3>
            <p className="text-2xl mt-4">Subscribe to our newsletter</p>
          </div>
          <div className="">
            <form>
              <input
                type="text"
                className="p-2 outline-none text-black"
                placeholder="Email address..."
              />
              <button className="p-2 bg-white text-black hover:bg-black hover:text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
