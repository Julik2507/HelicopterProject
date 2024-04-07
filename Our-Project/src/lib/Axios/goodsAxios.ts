import type { CreateGoodsDTO, GetGoodsDTO } from "$lib/DTO/goods/goodsDTO";
import axios from "axios";

export async function getGoods(dto: GetGoodsDTO): Promise<any> {
  try {
    const result = await axios.get("http://localhost:3000/api/get-goods", {
      params: dto,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getOneGoods(id: number): Promise<any> {
  try {
    const result = await axios.get(
      `http://localhost:3000/api/get-one-goods/${id}`
    );

    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function createGoods(dto: CreateGoodsDTO): Promise<any> {
  try {
    const result = await axios.post(
      "http://localhost:3000/api/create-goods/",
      dto
    );
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
