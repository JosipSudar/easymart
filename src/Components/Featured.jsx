import { FaStar } from "react-icons/fa";
import { PropTypes } from "prop-types";

const Featured = ({ image, desc, name, price, rating }) => {
  return (
    <section
      className="flex flex-col
     items-center h-[500px] hover:scale-105"
    >
      <img src={image} alt={desc} className=" w-[300px] h-[300px]" />
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
    </section>
  );
};

Featured.propTypes = {
  image: PropTypes.string.isRequired,
  desc: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.string,
};

export default Featured;
