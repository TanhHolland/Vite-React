import axios from "./axios.custom";
const API_FetchUserPage = (current : number, pageSize : number ) => {
  return axios({
    method: "get",
    url: "/api/v1/user",
    params: {
        current : current,
        pageSize : pageSize
    },
  });
};
export {API_FetchUserPage}