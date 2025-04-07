import Cookies from "js-cookie";

const isLogin = () => {
  // check if user is logged in
  const token = Cookies.get("access_token");
  if (token && token !== "undefined") {
    return true;
  }

  console.warn("Access token is invalid or undefined:", token); // Log giá trị token để debug
  return false;
};

export default isLogin;
