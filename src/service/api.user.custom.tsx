import axios from "./axios.custom";
import qs from "qs";
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
const API_FetchBookWithId = (_id : string) => {
  return axios({
    method: "get",
    url: `/api/v1/book/${_id}`,
  });
};
const API_FetchCategory = () => {
  return axios({
    method: "get",
    url: "api/v1/database/category",
  });
};
const API_FetchBookWithParams = (
  current: number,
  pageSize: number,
  mainText: string | undefined,
  author: string | undefined,
  sort: string[]
) => {
  return axios({
    method: "get",
    url: "/api/v1/book",
    params: {
      current: current,
      pageSize: pageSize,
      ...(mainText && { mainText: `/${mainText}/i` }), // Thêm name vào params nếu có giá trị
      ...(author && { author: `/${author}/i` }), // Thêm email vào params nếu có giá trị,
      sort,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, {
        encode: false,
        arrayFormat: "repeat",
      });
    },
  });
};
export {
  API_Register,
  API_Login,
  API_FetchAccount,
  API_Logout,
  API_FetchBookWithId,
  API_FetchCategory,
  API_FetchBookWithParams,
};
