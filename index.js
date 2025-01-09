const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const groupId = process.env.GROUP_ID;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: [
        [
          {
            text: "📞 Поділитися контактом",
            request_contact: true, 
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, 'Привіт! 👋 Я твій бот 🤖. Щоб почати, поділись своїм контактом 📱.', options);
});

bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  const userContact = msg.contact.phone_number;
  const userName = msg.contact.first_name;

  bot.sendMessage(chatId, `Дякуємо за поділ контактами! 👍 Тепер напишіть ваше питання ❓.`);
  bot.sendMessage(chatId, 'Будь ласка, надішліть ваше питання ✍️.');

  bot.on('message', (msg) => {
    const userQuestion = msg.text;

    if (userQuestion && userQuestion !== '/start') {
      bot.sendMessage(groupId, `Нове питання від користувача! 📱\nІм'я: ${userName}\nТелефон: ${userContact}\nПитання: ${userQuestion}`);
      bot.sendMessage(chatId, `Ваше питання: "${userQuestion}" 🤔. Дякуємо за звернення! 🙏`);
    }
  });
});
