import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Aside from "../Components/Aside";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 20;
  let currentPage = 1;

  const fetchProducts = async (page) => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=0");
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = res.data.products.slice(startIndex, endIndex);
      setAllProducts(res.data.products);
      setFilteredProducts(paginatedProducts);
      setIsLoading(false);
      console.log(res.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterProductsByName = (searchTerm) => {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    filterProductsByName(searchTerm);
  };

  const nextPage = () => {
    currentPage++;
    fetchProducts(currentPage);
  };

  const prevPage = () => {
    currentPage > 1 && currentPage--;
    fetchProducts(currentPage);
  };

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <div className="text-6xl text-center font-bold mt-10">Loading...</div>
      ) : (
        <main className="max-w-7xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-5xl font-bold my-10">Products</h1>
            <form className="flex gap-2">
              <label className="font-md">Search by name</label>
              <input
                type="text"
                className="border-2 border-blue-500 rounded-lg px-1"
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
          <hr className="border-2 border-blue-500 mb-10" />
          <div className="flex gap-5">
            <div className=" w-1/3">
              <Aside
                products={allProducts}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className=" w-2/3 grid grid-cols-3 gap-4 h-full">
              {filteredProducts.length > 0 &&
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.thumbnail}
                    name={product.title}
                    price={product.price}
                    id={product.id}
                  />
                ))}
            </div>
          </div>

          <div className="mt-10 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-sm">
                Showing <span className="font-semibold">1</span> to{" "}
                <span className="font-semibold">{pageSize}</span> of{" "}
                <span className="font-semibold">{allProducts.length}</span>{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Products;
