import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("token", id);
    axios
      .get(
        `http://localhost:3000/api/user/verify/${id}`,
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
    <div>
      <h1 className=" text-center text-4xl font-medium mt-20">
        Thank you for verifying your email you can continue shopping now!{" "}
      </h1>
    </div>
  );
};

export default VerifyEmail;
