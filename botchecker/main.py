import json
import logging
import os
from array import array

import requests
from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup
)
from telegram.ext import (
    filters,
    ApplicationBuilder,
    MessageHandler,
    CommandHandler,
    ContextTypes,
    CallbackContext,
    CallbackQueryHandler
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)

bot_token = os.getenv('BOT_TOKEN')
host_server = "http://localhost:8080"
admins = [749179973, 5006572203, 5519831621]

keyboard_options = [
    [InlineKeyboardButton("Check Wallets", callback_data='check_wallets')],
    [InlineKeyboardButton("Check URLs", callback_data='check_urls')],
    [InlineKeyboardButton("Change URLs", callback_data='change_urls')],
    [InlineKeyboardButton("Back", callback_data='start')]
]


async def start(update: Update, context: CallbackContext) -> None:
    # Create a button to enter the admin panel
    keyboard = [
        [InlineKeyboardButton("Enter Admin Panel", callback_data='admin_panel')]
    ]

    is_admin = update.effective_user.id in admins
    if not is_admin:
        await update.message.reply_text(
            f"Hi, dear {update.effective_user.first_name}! I will check your wallet real quick.\n" +
            "Send it to me to get verification ✅."
        )
    else:
        await update.message.reply_text(
            f"Hi, dear administrator {update.effective_user.first_name}! I will check your wallet real quick.\n" +
            "Send it to me to get verification ✅.", reply_markup=InlineKeyboardMarkup(keyboard)
        )


async def verify(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_input = update.message.text

    try:
        resp = requests.get(host_server + "/wallets/check/" + user_input)
        if resp.status_code == 409:
            await update.message.reply_text("Nice, Your wallet is verified. ✅")
        else:
            await update.message.reply_text("Sorry, I can't find your wallet ❌\nPlease try again.")

    except requests.RequestException as e:
        await update.message.reply_text("An error occurred while verifying")


async def admin_panel(update: Update, context: CallbackContext) -> None:
    reply_markup = InlineKeyboardMarkup(keyboard_options)

    await update.callback_query.edit_message_text(text="Admin Panel", reply_markup=reply_markup)


async def admin_options(update: Update, context: CallbackContext) -> None:
    query = update.callback_query
    await query.answer()

    if query.data == 'admin_panel':
        await admin_panel(update, context)
    elif query.data == 'check_wallets':
        await query.edit_message_text(text="Checking Wallets...")
        # Implement the logic for checking wallets
    elif query.data == 'check_urls':
        await query.edit_message_text(text="Checking URLs...")
        await options_list_urls(query)

    elif query.data == 'change_urls':
        await query.edit_message_text(text="Changing URLs...")
        # Implement the logic for changing URLs
    elif query.data == 'start':
        await start(update, context)


async def options_list_urls(query) -> None:
    try:
        resp = requests.get(host_server + "/urls/list")
        text = ""
        m = resp.json()
        for k, v in m.items():
            text = f"{text} website: {k} | url: {v}\n"
        await query.edit_message_text(text=text, parse_mode="HTML", reply_markup=InlineKeyboardMarkup(keyboard_options),
                                      disable_web_page_preview=True)
    except requests.RequestException as e:
        await query.message.reply_text("An error occurred while trying to get URLs")


app = ApplicationBuilder().token(bot_token).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), verify))
app.add_handler(CallbackQueryHandler(admin_options))

app.run_polling()
