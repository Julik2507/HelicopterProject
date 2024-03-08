import axios from "axios";

export async function registerUser(dto: any) {
  const result = await axios.post("http://localhost:3000/users/register", dto);
  return result;
}
