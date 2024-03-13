import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Aside from "../Components/Aside";
import { useDispatch } from "react-redux";
import { Button } from "@/Components/ui/button";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const dispach = useDispatch();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=0");
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
    fetchProducts(currentPage);
  };

  const prevPage = () => {
    if (
      currentPage > 1 &&
      currentPage <= Math.ceil(allProducts.length / pageSize)
    ) {
      setCurrentPage(currentPage - 1);
    }
    fetchProducts(currentPage);
  };

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, fetchProducts]);

  return (
    <>
      {isLoading ? (
        <div className="text-6xl text-center font-bold mt-10">Loading...</div>
      ) : (
        <main className="max-w-7xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-5xl font-bold my-10">Products</h1>
            <form className="flex gap-2 items-center">
              <label className="font-md">Search by name</label>
              <input
                type="text"
                className="border-2 border-blue-500 rounded-lg p-2 outline-none"
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
                Showing <span className="font-semibold">1</span> to
                <span className="font-semibold">{pageSize}</span> of{" "}
                <span className="font-semibold">{allProducts.length}</span>{" "}
                Entries
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
        </main>
      )}
    </>
  );
};

export default Products;
