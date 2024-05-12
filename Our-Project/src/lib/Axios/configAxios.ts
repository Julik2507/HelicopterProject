import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const $instance = axios.create({
  withCredentials: true, //при каждом запросе цеплять куки
  baseURL: baseURL,
});

// $instance.interceptors.request.use((config) => {
//   config.headers.Authorization = localStorage.getItem("accessToken");

//   return config;
// });

// $instance.interceptors.response.use(
//   (config) => {
//     console.log(11);

//     return config;
//   },
//   async (error: any) => {
//     console.log(error);

//     if (error.response.status === 401) {
//       const result = await $instance.post<ResLoginDTO>("/auth/update");
//       console.log(1);

//       localStorage.setItem("accessToken", result.data.accessToken);

//       const thisRequest = error.config;

//       $instance.request(thisRequest);
//     }
//     console.log("test");

//     // return Promise.reject(error);
//     throw error;
//   }
// );
