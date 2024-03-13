/* eslint-disable react-hooks/exhaustive-deps */
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Aside = ({ products, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCategoryChange = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const newCategories = [...selectedCategories];
      newCategories.splice(index, 1);
      setSelectedCategories(newCategories);
    }
  };

  const handleBrandChange = (brand) => {
    const index = selectedBrands.indexOf(brand);
    if (index === -1) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      const newBrands = [...selectedBrands];
      newBrands.splice(index, 1);
      setSelectedBrands(newBrands);
    }
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }
      return true;
    });
    onFilterChange(filteredProducts);
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
};

export default Aside;
