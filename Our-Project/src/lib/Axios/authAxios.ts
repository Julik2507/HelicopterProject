import axios from "axios";
import type { loginDTO, registerDTO } from "../DTO/auth/authDTO";
import type { ResLoginDTO, ResRegisterDTO } from "../DTO/auth/authResponse";

// export const baseURL = "http://176.109.107.106:80/api";
export const baseURL = "http://localhost:3000/api";

export const $instance = axios.create({
  withCredentials: true, //при каждом запросе цеплять куки
  baseURL: baseURL,
});

$instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("accessToken");

  return config;
});

$instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: any) => {
    console.log(error);

    if (error.response.data.status === 401) {
      const result = await $instance.post<ResLoginDTO>("/auth/update");
      localStorage.setItem("accessToken", result.data.accessToken);
      const thisRequest = error.config;
      console.log(thisRequest);

      $instance.request(thisRequest);
    }
    throw error;
  }
);

export async function registerUser(dto: registerDTO): Promise<any> {
  try {
    const result = await $instance.post("/auth/register", dto);

    localStorage.setItem("accessToken", result.data.accessToken);

    // return jwtDecode(result.data.accessToken);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function loginUser(dto: loginDTO): Promise<ResLoginDTO> {
  try {
    const result = await $instance.post<ResLoginDTO>("/auth/login", dto);

    localStorage.setItem("accessToken", result.data?.accessToken);

    return result.data;
  } catch (error: any) {
    console.log(error.response?.data?.message);

    throw new Error(error.response?.data?.message);
  }
}
