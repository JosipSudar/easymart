import DarkModeContext from "@/state/DarkMode";
import PropTypes from "prop-types";
import { useContext } from "react";

const MiscComponent = ({ title, desc }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <main className="max-w-7xl mx-auto space-y-10 h-[80vh] pt-10">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <p className="text-lg">{desc}</p>
        </main>
      </div>
    </div>
  );
};

MiscComponent.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default MiscComponent;
