import axios from "axios";
import { jwtDecode } from "jwt-decode";

import type { loginDTO, registerDTO } from "../DTO/auth/authDTO";
import type { ResLoginDTO, ResRegisterDTO } from "../DTO/auth/authResponse";

export async function registerUser(
  dto: registerDTO
): Promise<ResRegisterDTO | undefined> {
  try {
    const result = await axios.post("http://localhost:3000/auth/register", dto);
    console.log(jwtDecode(result.data));

    localStorage.setItem("token", result.data);

    return jwtDecode(result.data);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function loginUser(dto: loginDTO) {
  try {
    const result = await axios.post("http://localhost:3000/auth/login", dto);
    localStorage.setItem("token", result.data);
    return result.data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.response.data.message);
  }
}
