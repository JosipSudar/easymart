import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Aside from "../Components/Aside";
import { Button } from "@/Components/ui/button";
import Loader from "../assets/loading.svg";
import DarkModeContext from "@/state/DarkMode";
import { baseUrl } from "@/utils/baseUrl";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const query = new URLSearchParams(window.location.search).get("category");
  const [filteredProducts, setFilteredProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const { darkMode } = useContext(DarkModeContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/products`);
      const products = res.data.products;
      const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = products.slice(startIndex, endIndex);
      setFilteredProducts(paginatedProducts);
      setAllProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
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
    if (currentPage < Math.ceil(allProducts.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (
      currentPage > 1 &&
      currentPage <= Math.ceil(allProducts.length / pageSize)
    ) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div className={darkMode ? "dark" : ""}>
      {isLoading ? (
        <div className="flex justify-center items-center dark:bg-slate-800 h-screen">
          <img src={Loader} alt="" className=" h-[20%] w-[10%]" />
        </div>
      ) : (
        <div className="dark:bg-slate-800 dark:text-white">
          <main className=" container mx-auto h-fit">
            <div className="mb-10 flex flex-col justify-between items-center lg:flex-row">
              <h1 className="text-5xl font-bold my-10">Products</h1>
              <form className="flex gap-2 items-center">
                <label className="font-md">Search by name</label>
                <input
                  type="text"
                  className="border-2 border-blue-500 rounded-lg p-2 outline-none dark:text-black"
                  onChange={handleSearchInputChange}
                />
              </form>
            </div>
            <hr className="border-2 border-blue-500 mb-10" />
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className=" w-full lg:w-1/4 text-black">
                <Aside
                  products={allProducts}
                  onFilterChange={handleFilterChange}
                  query={query}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              </div>
              <div className=" w-full grid grid-cols-1 gap-4 h-full lg:w-3/4 lg:grid-cols-4">
                {filteredProducts.length > 0 &&
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.thumbnail}
                      name={product.title}
                      price={product.price}
                      id={product._id}
                    />
                  ))}
              </div>
            </div>

            {filteredProducts.length > 0 && (
              <div className="mt-10">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold">
                    {pageSize * (currentPage - 1) + 1} -{" "}
                    {pageSize * currentPage > allProducts.length
                      ? allProducts.length
                      : pageSize * currentPage}{" "}
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0 gap-1">
                    <Button
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-blue-500 text-white rounded-l-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </Button>
                    <Button
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={nextPage}
                      disabled={
                        currentPage === Math.ceil(allProducts.length / pageSize)
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Products;
