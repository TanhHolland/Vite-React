import axios from "axios";
const instance = axios.create({
    baseURL: import.meta.env.VITE_LOCALHOST,
    withCredentials: true,
});
instance.interceptors.request.use(
    function (config) {
        if (localStorage.getItem("access_token")) {
            const token = localStorage.getItem("access_token");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Làm gì đó với lỗi request
        console.log(error);
        return Promise.reject(error);
    }
);
const handleRefreshToken = async () => {
    const res = await instance.get("/api/v1/auth/refresh");
    console.log(res);
    if (res && res.data) return res.data.data.access_token;
    else null;
};

const NO_RETRY_HEADER = "x-no-retry";
// Thêm một bộ đón chặn response
instance.interceptors.response.use(
    function (response) {
        // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
        // Làm gì đó với dữ liệu response
        return response;
    },
    async function (error) {
        // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
        // Làm gì đó với lỗi response

        // token het han
        if (
            error &&
            error.response &&
            error.response.status === 401 &&
            !error.config.headers[NO_RETRY_HEADER] // Kiểm tra nếu chưa có NO_RETRY_HEADER 
        ) {
            console.log(1);
            const new_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = "true";
            if (new_token) {
                localStorage.setItem("access_token", new_token);
                error.config.headers.Authorization = `Bearer ${new_token}`;
            }
            // Gửi lại request với token mới
            return instance.request(error.config);
        }

        // Kiểm tra nếu refresh token hết hạn và chuyển hướng
        if (
            error.config &&
            error.response &&
            +error.response.status === 400 &&
            error.config.url === "/api/v1/auth/refresh"
        ) {
            // window.location.href = '/login';
            localStorage.removeItem("access_token");
        }

        return Promise.reject(error);
    }
);
export default instance;
