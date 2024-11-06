import { data } from "framer-motion/client";
import axios from "./axios.custom";
import qs from "qs";
const API_FetchAllUsers = () => {
  return axios({
    method: "get",
    url: "/api/v1/user",
  });
};
const API_FetchUserWithParams = (
  current: number,
  pageSize: number,
  fullName: string | undefined,
  email: string | undefined,
  sort: string[]
) => {
  return axios({
    method: "get",
    url: "/api/v1/user",
    params: {
      current: current,
      pageSize: pageSize,
      ...(fullName && { fullName: `/${fullName}/i` }), // Thêm name vào params nếu có giá trị
      ...(email && { email: `/${email}/i` }), // Thêm email vào params nếu có giá trị,
      sort,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { encode: false, arrayFormat: "repeat" });
    },
  });
};
const API_CreateUser = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  return axios({
    method: "post",
    url: "/api/v1/user",
    data: {
      fullName,
      email,
      password,
      phone,
    },
  });
};
const API_UpdateUser = (_id: string, fullName: string, phone: string) => {
  return axios({
    method: "put",
    url: "/api/v1/user",
    data: {
      _id,
      fullName,
      phone,
    },
  });
};
const API_DeleteUser = (_id: string) => {
  return axios({
    method: "delete",
    url: `/api/v1/user/${_id}`,
  });
};
const API_ImportUser = (dataSheet: any) => {
  return axios({
    method: "post",
    url: "/api/v1/user/bulk-create",
    data: dataSheet,
  });
};

// book
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
      return qs.stringify(params, { encode: false, arrayFormat: "repeat" });
    },
  });
};
const API_CreateBook = (data: any) => {
  return axios({
    method: "post",
    url: "/api/v1/book",
    data: data,
  });
};
const API_FetchCategory = () => {
  return axios({
    method : 'get',
    url: 'api/v1/database/category'
  })
}
export {
  API_FetchAllUsers,
  API_CreateUser,
  API_UpdateUser,
  API_DeleteUser,
  API_FetchUserWithParams,
  API_ImportUser,
  API_FetchBookWithParams,
  API_CreateBook,
  API_FetchCategory
};
