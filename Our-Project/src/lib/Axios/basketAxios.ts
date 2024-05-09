import { $instance } from "./authAxios";

export async function putGoodsInBasket(id: number) {
  try {
    const result = await $instance.post(`/catalogue/add-goods/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getMyBasketGoods() {
  try {
    const result = await $instance.get("/catalogue/get-goods");
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
