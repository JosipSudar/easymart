import { useState } from "react";

const Newsletter = () => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const handleEmailChange = (event) => {
    event.preventDefault();
    if (email.match(regex)) {
      setSuccess(true);
      setEmail("");
    } else if (email === "") {
      setErr(true);
      setEmail("");
    }
  };

  return (
    <div className="mt-36 bg-blue-500 py-20">
      <div className="max-w-[1200px] mx-auto flex justify-around items-center text-white">
        <div>
          <h3 className="text-5xl">Newsletter</h3>
          <p className="text-2xl mt-4">Subscribe to our newsletter</p>
        </div>
        <div className="">
          <form onSubmit={handleEmailChange}>
            <input
              type="text"
              className="p-2 outline-none text-black"
              placeholder="Email address..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="p-2 bg-white text-black hover:bg-black hover:text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div>
        <p>{success ? "Thank you for subscribing!" : ""}</p>
        <p>{err ? "Please enter a valid email address" : ""}</p>
      </div>
    </div>
  );
};

export default Newsletter;
