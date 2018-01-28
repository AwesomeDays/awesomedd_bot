const moment = require('moment');
const sheets = require('./sheets.js');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const tg = config.tg;

const bot = new TelegramBot(tg.token, { polling: true });

bot.onText(/\/theme (.+)/, (msg, match) => {
  if (msg.chat.id != tg.orgChatId) { return; }
  const theme = match[1];
  if (!theme) { return; }
  const user = msg.from.username ? `@${msg.from.username}` : `@${msg.from.first_name}`;
  const rowData = {
    'Отметка времени': moment().format('DD.MM.YYYY H:mm:ss'),
    'Тема': theme,
    'username': user,
  };
  sheets.addRow(rowData, (status) => {
    if (!status) { return bot.sendMessage(tg.orgChatId, 'Spreadsheets error!'); }
    return bot.sendMessage(tg.orgChatId, 'Added!');
  });
});

bot.onText(/\/randomTheme/, (msg) => {
  if (msg.chat.id != tg.orgChatId) { return; }
  sheets.getRandom((theme) => {
    if (!theme) { return; }
    return bot.sendMessage(tg.orgChatId, `Random theme: *${theme}*`, { parse_mode: 'markdown' });
  });
});
