import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import { useState } from "react";

const Newsletter = () => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const sendEmail = (email) => {
    axios.post(`${baseUrl}/api/newsletter`, { email }).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.match(regex)) {
      sendEmail(email);
      setSuccess(true);
      setEmail("");
      setErr(false);
    } else {
      setErr(true);
      setEmail("");
    }
  };

  return (
    <div className=" bg-blue-500 py-20">
      <div className="max-w-[1200px] mx-auto flex justify-around items-center text-white flex-col md:flex-row">
        <div>
          <h3 className="text-5xl text-center md:text-left">Newsletter</h3>
          <p className="text-2xl mt-4 text-center md:text-left">
            Subscribe to our newsletter
          </p>
        </div>
        <div className="mt-5 md:mt-0 ">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="p-2 outline-none text-black"
              placeholder="Email address..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button className="p-2 bg-white text-black hover:bg-black hover:text-white">
              Subscribe
            </button>
          </form>
          <div className=" mt-5">
            {success && (
              <p className=" text-green-600 text-xl text-center">
                Email sent successfully
              </p>
            )}
            {err && (
              <p className=" text-red-700 text-xl text-center">Invalid email</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
