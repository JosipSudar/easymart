import { FaStar } from "react-icons/fa";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Featured = ({ image, desc, name, price, rating, id }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="flex flex-col
     items-center h-[500px] hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <img
        src={image}
        alt={desc}
        className=" w-[300px] h-[300px] object-cover rounded-lg"
      />
      <div className="flex flex-1 items-center justify-center">
        <p className="text-xl m-4 text-center">{name}</p>
      </div>
      <div className="flex gap-2 h-[50px] items-center">
        <p className="flex-1 text-right pr-2">{price}$</p>
        <div className="flex items-center gap-1">
          <p className="flex-1 text-left pl-2">{rating}</p>
          <FaStar />
        </div>
      </div>
    </Link>
  );
};

Featured.propTypes = {
  image: PropTypes.string.isRequired,
  desc: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.string,
  id: PropTypes.number,
};

export default Featured;
