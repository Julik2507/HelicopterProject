import TelegramBot from "node-telegram-bot-api";

const token = "6100257122:AAE2pG2KUcYxq5ISYoBUCVEQ0LEXCpUVjc0";
const bot = new TelegramBot(token, { polling: true });

const chats: any = {};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return await bot.sendMessage(chatId, "Добро пожаловать в Helicopter Delivery!");
    } else if (text === "/order") {
      return await bot.sendMessage(chatId, `Дорогой ${msg.from?.first_name}, Ваш заказ уже в пути!`);
    } else if (text === "/game") {
      await bot.sendMessage(chatId, "Сейчас я загадаю цифру от 0 до 9, а ты отгадай");
      let randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      await bot.sendMessage(chatId, "Отгадывай!!!");
    }
    return await bot.sendMessage(chatId, "Я вас не понимаю");
  });
};

start();
