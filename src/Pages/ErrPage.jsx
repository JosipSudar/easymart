import DarkModeContext from "@/state/DarkMode";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ErrPage = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="text-center flex flex-col items-center h-screen justify-center dark:bg-slate-800 dark:text-white">
        <h1 className="text-6xl">404</h1>
        <p className="text-3xl">Page not found</p>
        <Link
          to="/"
          className="text-xl hover:text-blue-500 underline mt-10 transition-all duration-500"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrPage;
