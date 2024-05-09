import { $instance } from "./authAxios";

export async function findGoodsInSearch(letters: string) {
  try {
    const result = await $instance.get("/catalogue/search", {
      params: letters,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
