# Awesome Developers Days Telegram bot

AwesomeDD chat bot.

## Install & Run

    git clone https://github.com/AwesomeDays/awesomedd_bot
    cd awesomedd_bot
    npm i
    touch config.json

Add to `config.json` credentials like this:

    {
      "tg": {
        "token": "<telegram bot token>",
        "orgChatId": "<telegram org chat id>"
      },
      "random": "<random.org api key>",
      "gsheets": {
        "sheetId": "<sheet id>",
        "gjson": {
          ...
          google sheets API data
          ...
        }
      }
    }

Then start bot

    npm start