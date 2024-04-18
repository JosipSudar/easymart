import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Footer, Header, MiscComponent } from "./Components";
import {
  About,
  Cart,
  Contact,
  Dashboard,
  ErrPage,
  Home,
  Login,
  OrderSuccess,
  Product,
  Products,
  Register,
} from "./Pages";
import Profile from "./Pages/Profile";
import VerifyEmail from "./Pages/VerifyEmail";

const Layout = ({ children }) => {
  return (
    <div className="site">
      <Header />
      {children}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setRole(localStorage.getItem("role"));
  }, [isLoggedIn]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="verify-email/:id" element={<VerifyEmail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {!isLoggedIn && <Route path="login" element={<Login />} />}
          {!isLoggedIn && <Route path="register" element={<Register />} />}
          {role === "admin" && (
            <Route path="dashboard" element={<Dashboard />} />
          )}
          {isLoggedIn && <Route path="profile" element={<Profile />} />}
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
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </Layout>
    </Router>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
