import axios from "axios";
import { jwtDecode } from "jwt-decode";

import type { loginDTO, registerDTO } from "../DTO/auth/authDTO";
import type { ResLoginDTO, ResRegisterDTO } from "../DTO/auth/authResponse";

const baseURL = "http://176.109.107.106";

export async function registerUser(dto: registerDTO): Promise<any> {
  try {
    const result = await axios.post(
      `http://localhost:3000/api/auth/register`,
      dto
    );

    localStorage.setItem("token", result.data.accessToken);

    return jwtDecode(result.data.accessToken);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function loginUser(dto: loginDTO) {
  try {
    const result = await axios.post(
      "http://localhost:3000/api/auth/login",
      dto
    );
    localStorage.setItem("token", result.data.accessToken);
    return jwtDecode(result.data.accessToken);
  } catch (error: any) {
    console.log(error);

    throw new Error(error.response.data.message);
  }
}
