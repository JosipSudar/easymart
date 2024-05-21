import { baseUrl } from "./baseUrl";

const getUserData = async (userID) => {
  const response = await fetch(`${baseUrl}/api/user/${userID}`);
  const data = await response.json();
  return data;
};

export default getUserData;
