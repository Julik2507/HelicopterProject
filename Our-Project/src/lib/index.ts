import axios from "axios";
import type { loginDTO, registerDTO } from "./dto";
import type { ResLoginDTO, ResRegisterDTO } from "./response";

export async function registerUser(
  dto: registerDTO
): Promise<ResRegisterDTO | undefined> {
  try {
    const result = await axios.post("http://localhost:3000/auth/register", dto);
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function loginUser(dto: loginDTO) {
  try {
    const result = await axios.post("http://localhost:3000/auth/login", dto);
    console.log(result);
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
