import PropTypes from "prop-types";

const MiscComponent = ({ title, desc }) => {
  return (
    <main className="max-w-7xl mx-auto space-y-10 h-[80vh] mt-10">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-lg">{desc}</p>
    </main>
  );
};

MiscComponent.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default MiscComponent;
