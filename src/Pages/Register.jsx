import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DarkModeContext from "@/state/DarkMode";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const register = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:3000/api/user/register",
          { username, email, password },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          alert(res.data.msg);
          if (res.status === 201) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        });
    } catch (error) {
      console.log("Error in login:", error);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <section className="bg-gray-50 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={register}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="kminchelle"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="kminchelle"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                        required=""
                        onChange={() => handlePasswordVisibility()}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Show password
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full  bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  text-white"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
