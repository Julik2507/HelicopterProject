import { $instance } from "./configAxios";
import type { loginDTO, registerDTO } from "../DTO/auth/authDTO";
import type { ResLoginDTO } from "../DTO/auth/authResponse";

export async function registerUser(dto: registerDTO): Promise<any> {
  try {
    const result = await $instance.post("/auth/register", dto);

    localStorage.setItem("accessToken", result.data.accessToken);
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
    console.log(error);

    // console.log(error.response?.data?.message);

    throw new Error(error.response?.data?.message);
  }
}

export async function getUserName() {
  try {
    const result = await $instance.get("/auth/user-name");
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
