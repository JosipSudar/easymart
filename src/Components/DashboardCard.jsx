import PropTypes from "prop-types";

const DashboardCard = ({ title, number, icon, desc }) => {
  return (
    <div className="flex flex-col gap-2 bg-blue-50 p-5 rounded-sm w-full">
      <div className="flex justify-between items-center gap-14">
        <div className="">
          <h2 className="text-2xl">{title}</h2>
          <p className="text-3xl">{number}</p>
        </div>
        <div className="text-5xl">{icon}</div>
      </div>
      <p className="text-gray-500 my-5">{desc}</p>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string,
  number: PropTypes.string,
  icon: PropTypes.element,
  desc: PropTypes.string,
};

export default DashboardCard;
