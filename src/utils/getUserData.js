const getUserData = async (userID) => {
  const response = await fetch(`http://localhost:3000/api/user/${userID}`);
  const data = await response.json();
  return data;
};

export default getUserData;
