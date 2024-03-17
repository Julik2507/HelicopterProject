import axios from "axios";
import type { loginDTO, registerDTO } from "./dto";

export async function registerUser(dto: registerDTO) {
  const result = await axios.post("http://localhost:3000/auth/register", dto);
  return result;
}

export async function loginUser(dto: loginDTO) {
  const result = await axios.post("http://localhost:3000/auth/login", dto);
  return result;
}
