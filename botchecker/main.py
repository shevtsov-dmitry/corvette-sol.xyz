import logging
import os

import requests
from telegram import ReplyKeyboardMarkup, Update
from telegram.ext import (
    filters,
    ApplicationBuilder,
    MessageHandler,
    CommandHandler,
    ContextTypes,
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)

bot_token = os.getenv('BOT_TOKEN')
host_server = "http://localhost:8080"


async def hello(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(f'Hello {update.effective_user.first_name}')


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        f"Hi, dear {update.effective_user.first_name}! I will check your wallet real quick.\n" +
        "Send it to me to get verification ✅."
    )


async def verify(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_input = update.message.text

    try:
        resp = requests.get(host_server + "/wallets/check/" + user_input)
        print(resp.status_code)
        if resp.status_code == 409:
            await update.message.reply_text("Nice, Your wallet is verified. ✅")
        else:
            await update.message.reply_text("Sorry, I can't find your wallet ❌\nPlease try again.")

    except requests.RequestException as e:
        await update.message.reply_text("An error occurred while verifying")


app = ApplicationBuilder().token(bot_token).build()

app.add_handler(CommandHandler("hello", hello))
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), verify))

app.run_polling()
