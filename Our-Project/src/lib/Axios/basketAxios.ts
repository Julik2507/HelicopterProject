import type {
  ResPutGoodsDTO,
  ResSendDataToDeliveryDTO,
} from "$lib/DTO/basket/basketDTO";
import { $instance } from "./configAxios";

export async function putGoodsInBasket(id: number): Promise<ResPutGoodsDTO> {
  //Нажатие на + (либо в каталоге либо в корзине)
  try {
    const result = await $instance.post<ResPutGoodsDTO>(
      `/catalogue/add-goods/${id}`
    );
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getMyBasketGoods(): Promise<ResPutGoodsDTO> {
  //получить все продукты и с характеристикой и подсчетами цен и т.д (при входе в корзину)
  try {
    const result = await $instance.get("/catalogue/get-goods");
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function minusQuantityForGoods(id: number): Promise<any> {
  //при нажатии на минус (в каталоге или корзине). Если наличие количества товара в корзине 1 и нажать на -, то товар удалится и я сразу выдаю все товары и инфу по ним(цену общую, количество и т.д для КАЖДОГО)
  try {
    const result = await $instance.get(`/basket/minus-quantity/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteGoodsInBasket(id: number): Promise<any> {
  //при нажатии на крестик красный удалится продукт(и всё его количество) и я снова выдаю все продукты из БД, и характеристики, и подсчеты цен
  try {
    const result = await $instance.get(`/catalogue/delete-goods/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function sendUserDataToDelivery(
  dto: ResSendDataToDeliveryDTO
): Promise<any> {
  //пользователь заполняет поля, отправляет данные дальше боту по идее.
  try {
    const result = await $instance.post("/basket/send-data-to-delivery", dto);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
