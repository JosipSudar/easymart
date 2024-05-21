import DarkModeContext from "@/state/DarkMode";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const [orders, setOrders] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    axios.get(`${baseUrl}/api/orders`).then((res) => {
      setOrders(res.data.orders);
    });
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <section className=" max-w-[1200px] mx-auto text-center py-10 space-y-10">
          <FaRegCircleCheck size={200} className="mx-auto text-green-500" />
          <h1 className="text-3xl">Order Successful</h1>
          <p className="text-2xl">Thank you for your order.</p>
          <p className="text-2xl">
            You will receive an email with the details of your order.
          </p>
          <p className="text-2xl">
            Order ID:{" "}
            <span className="font-bold">
              {orders.length ? orders[orders.length - 1]._id : ""}
            </span>
          </p>
          <Link
            to="/"
            className="text-2xl hover:text-blue-600 underline transition-all duration-300 text-blue-500"
          >
            Go back to home
          </Link>
        </section>
      </div>
    </div>
  );
};

export default OrderSuccess;
