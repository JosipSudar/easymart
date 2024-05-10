/* eslint-disable react-hooks/exhaustive-deps */
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Aside = ({ products, onFilterChange, query, currentPage, pageSize }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        newSelectedCategories.length === 0 ||
        newSelectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesCategory && matchesBrand;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    onFilterChange(paginatedProducts);
  };

  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newSelectedBrands);

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesBrand =
        newSelectedBrands.length === 0 ||
        newSelectedBrands.includes(product.brand);
      return matchesCategory && matchesBrand;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    onFilterChange(paginatedProducts);
  };

  useEffect(() => {
    if (query) {
      setSelectedCategories([query]);
    }
  }, [selectedCategories, selectedBrands]);

  return (
    <aside className=" bg-slate-300 p-5 rounded-lg">
      <Accordion type="single" collapsible className=" space-y-4">
        <AccordionItem value="item-1" className=" border-b border-slate-800">
          <AccordionTrigger className=" text-xl font-medium hover:no-underline">
            Select a brand
          </AccordionTrigger>
          <AccordionContent className=" text-lg">
            {[...new Set(products.map((product) => product.brand))].map(
              (brand) => (
                <div key={brand} className="flex flex-col my-2">
                  <div className="flex justify-between">
                    <label key={brand}>{brand}</label>{" "}
                    <input
                      type="checkbox"
                      onChange={() => handleBrandChange(brand)}
                      checked={selectedBrands.includes(brand)}
                    />
                  </div>
                </div>
              )
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className=" border-b border-slate-800">
          <AccordionTrigger className=" text-xl font-medium hover:no-underline">
            Select a category
          </AccordionTrigger>
          <AccordionContent className=" text-lg">
            {[...new Set(products.map((product) => product.category))].map(
              (category) => (
                <div key={category} className="flex flex-col my-2">
                  <div className="flex justify-between">
                    <label key={category}>{category}</label>{" "}
                    <input
                      type="checkbox"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                  </div>
                </div>
              )
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

Aside.propTypes = {
  products: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  query: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Aside;
