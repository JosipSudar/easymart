import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PropTypes } from "prop-types";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MiscComponent from "./Components/miscComponent";
import { useEffect, useState } from "react";
import ErrPage from "./Pages/ErrPage";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn]);

  return (
    <Router>
      <Layout>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="privacy-policy"
              element={
                <MiscComponent
                  title={"Privacy Policy"}
                  desc={
                    "Welcome to the Privacy Policy of easymart. This page outlines how we collect, use, maintain, and disclose information obtained from users of our website and services. We are committed to protecting your privacy and ensuring the security of your personal information. By using our website, you agree to the terms outlined in this Privacy Policy."
                  }
                />
              }
            />
            <Route
              path="legal-notice"
              element={
                <MiscComponent
                  title={"Legal Notice"}
                  desc={
                    "Welcome to the Legal Notice of easymart. This page contains important information regarding the use of our website and services. All content, trademarks, logos, and intellectual property displayed on this website are the property of easymart and protected by copyright laws. Unauthorized use, reproduction, or distribution of our content is strictly prohibited and may result in legal action."
                  }
                />
              }
            />
            <Route
              path="cookies"
              element={
                <MiscComponent
                  title={"Cookies"}
                  desc={
                    "Welcome to our Cookie Policy. This page explains how easymart uses cookies to enhance user experience and provide personalized services. By using our website, you consent to the use of cookies in accordance with this Cookie Policy."
                  }
                />
              }
            />
            <Route
              path="terms-and-conditions"
              element={
                <MiscComponent
                  title={"Terms and Conditions"}
                  desc={
                    "Welcome to the Terms and Conditions of easymart. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our website. If you do not agree with any part of these Terms and Conditions, you may not access the website or use our services."
                  }
                />
              }
            />
            <Route path="*" element={<ErrPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
