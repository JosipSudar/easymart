import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className=" max-w-[1200px] mx-auto text-center py-10 space-y-10">
      <FaRegCircleCheck size={200} className="mx-auto text-green-500" />
      <h1 className="text-3xl">Order Successful</h1>
      <p className="text-2xl">Thank you for your order.</p>
      <p className="text-2xl">
        You will receive an email with the details of your order.
      </p>
      <p className="text-2xl">
        Order ID: <span className="font-bold">12345</span>
      </p>
      <Link to="/" className="text-2xl hover:text-blue-500 underline">
        Go back to home
      </Link>
    </section>
  );
};

export default OrderSuccess;
