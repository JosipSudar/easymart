import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PropTypes } from "prop-types";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import Login from "./Pages/Login";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
