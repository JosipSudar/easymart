import { Button } from "@/Components/ui/button";
import getUserData from "@/utils/getUserData";
import axios from "axios";
import { useEffect, useState } from "react";

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
        `http://localhost:3000/api/user/${userID}`,
        { userData },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const sendEmailVerification = () => {
    axios
      .post("http://localhost:3000/api/user/verify", {
        email: userData.email,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const checkEmailVerification = userData.verified ? true : false;
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Profile</h1>
      <p>Welcome to your profile page</p>
      <form className="flex flex-col gap-4" onSubmit={updateUserData}>
        <label htmlFor="name">Name</label>
        <input
          className="border-2 border-gray-300 "
          value={userData?.username}
          type="text"
          id="name"
          name="name"
          disabled
        />
        <label htmlFor="email">Email</label>
        <input
          className="border-2 border-gray-300 "
          value={userData?.email}
          type="email"
          id="email"
          name="email"
          disabled
        />
        <h2>Adress info</h2>
        <label htmlFor="street">Street</label>
        <input
          className="border-2 border-gray-300 "
          onChange={handleChange}
          value={userData?.userAdress?.street}
          type="text"
          id="street"
          name="street"
        />
        <label htmlFor="city">City</label>
        <input
          className="border-2 border-gray-300 "
          onChange={handleChange}
          value={userData?.userAdress?.city}
          type="text"
          id="city"
          name="city"
        />
        <label htmlFor="zip">Zip</label>
        <input
          className="border-2 border-gray-300 "
          onChange={handleChange}
          value={userData?.userAdress?.zip}
          type="text"
          id="zip"
          name="zip"
        />
        <label htmlFor="country">Country</label>
        <input
          className="border-2 border-gray-300 "
          onChange={handleChange}
          value={userData?.userAdress?.country}
          type="text"
          id="country"
          name="country"
        />
        <button type="submit">Update</button>
      </form>
      {!checkEmailVerification && (
        <Button onClick={sendEmailVerification}>Send email verification</Button>
      )}
    </div>
  );
};

export default Profile;
