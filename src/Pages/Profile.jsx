import { Button } from "@/Components/ui/button";
import DarkModeContext from "@/state/DarkMode";
import { baseUrl } from "@/utils/baseUrl";
import getUserData from "@/utils/getUserData";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const userID = localStorage.getItem("userID");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    userAdress: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
    verified: false,
  });
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    getUserData(userID).then((data) => {
      setUserData(data.user);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      userAdress: {
        ...userData.userAdress,
        [name]: value,
      },
    });
  };

  const updateUserData = (e) => {
    e.preventDefault();
    axios
      .put(
        `${baseUrl}/api/user/${userID}`,
        { userData },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const sendEmailVerification = () => {
    axios
      .post(`${baseUrl}/api/user/verify`, {
        email: userData.email,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const checkEmailVerification = userData.verified ? true : false;
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex gap-4 justify-center items-center p-10 dark:bg-slate-800 dark:text-white">
        <div className="w-1/2 space-y-5 text-center">
          <h1 className="text-5xl">Profile</h1>
          <p className="text-xl">
            Hello <span className="font-bold">{userData?.username}</span>
          </p>
          <p className="text-xl">Welcome to your profile page</p>
          <p className="text-xl">Here you can edit your profile</p>
        </div>
        <div className="w-1/2">
          <form className="flex flex-col space-y-5" onSubmit={updateUserData}>
            <h2 className="text-xl font-bold">Personal info</h2>
            <label htmlFor="name">Name</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              value={userData?.username}
              type="text"
              id="name"
              name="name"
              disabled
            />
            <label htmlFor="email">Email</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              value={userData?.email}
              type="email"
              id="email"
              name="email"
              disabled
            />
            <hr className="border-gray-300 border-1" />
            <h2 className="text-xl font-bold">Address info</h2>
            <label htmlFor="street">Street</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={userData?.userAdress?.street}
              type="text"
              id="street"
              name="street"
            />
            <label htmlFor="city">City</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={userData?.userAdress?.city}
              type="text"
              id="city"
              name="city"
            />
            <label htmlFor="zip">Zip</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={userData?.userAdress?.zip}
              type="text"
              id="zip"
              name="zip"
            />
            <label htmlFor="country">Country</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={userData?.userAdress?.country}
              type="text"
              id="country"
              name="country"
            />
            <hr className="border-gray-300 border-1" />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="dark:bg-slate-800 dark:text-white pt-10">
        {!checkEmailVerification && (
          <Button
            onClick={sendEmailVerification}
            className=" mx-auto flex items-center gap-2 text-white p-2 rounded-md hover:bg-blue-600 bg-blue-500"
          >
            Send email verification
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
