import axios from "axios";
import type { registerDTO } from "./dto";

export async function registerUser(dto: registerDTO) {
  const result = await axios.post("http://localhost:3000/user/register", dto);
  return result;
}
