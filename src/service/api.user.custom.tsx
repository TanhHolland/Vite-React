import axios from "./axios.custom";

const API_Register = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  return axios({
    method: "post",
    url: "/api/v1/user/register",
    data: {
      fullName,
      email,
      password,
      phone,
    },
  });
};

const API_Login = (username: string, password: string) => {
  return axios({
    method: "post",
    url: "/api/v1/auth/login",
    data: {
      username,
      password,
    },
  });
};
const API_FetchAccount = () => {
  return axios({
    method: "get",
    url: "/api/v1/auth/account",
  });
};
const API_Logout = () => {
  return axios({
    method: "post",
    url: "/api/v1/auth/logout",
  });
};
export { API_Register, API_Login, API_FetchAccount, API_Logout };
