import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, price, id }) => {
  return (
    <section className="rounded-lg flex flex-col gap-3 border-slate-500 border-2 p-5">
      <img
        src={image}
        alt="image"
        className="w-full h-[200px] object-fill rounded-lg"
      />
      <h2 className="text-md">{name}</h2>
      <p className="text-sm">{price}$</p>
      <Link
        className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 text-center"
        to={`/products/${id}`}
      >
        See Details
      </Link>
    </section>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
};

export default ProductCard;
