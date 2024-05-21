import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DarkModeContext from "@/state/DarkMode";
import { baseUrl } from "@/utils/baseUrl";

const VerifyEmail = () => {
  const { id } = useParams();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    localStorage.setItem("token", id);
    axios
      .get(
        `${baseUrl}/api/user/verify/${id}`,
        {
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-slate-800 dark:text-white">
        <h1 className=" text-center text-4xl font-medium pt-20">
          Thank you for verifying your email you can continue shopping now!{" "}
        </h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
