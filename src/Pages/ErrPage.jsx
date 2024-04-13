import { Link } from "react-router-dom";

const ErrPage = () => {
  return (
    <div className="text-center flex flex-col items-center h-screen justify-center">
      <h1 className="text-6xl">404</h1>
      <p className="text-3xl">Page not found</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
};

export default ErrPage;
