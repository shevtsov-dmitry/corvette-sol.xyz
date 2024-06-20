import logging
import os

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

QUERY = None


async def start(update: Update, context: CallbackContext) -> None:
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


async def handle_input(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_input = update.message.text
    match QUERY.data:
        case 'change_url_twitter':
            await QUERY.edit_message_text("Twitter URL changed.", reply_markup=InlineKeyboardMarkup(keyboard_options))
            resp = requests.get(host_server + "/wallets/check/" + user_input)
        case 'change_url_telegram':
            await QUERY.edit_message_text("Telegram URL changed.", reply_markup=InlineKeyboardMarkup(keyboard_options))
        case 'change_url_tensor':
            await QUERY.edit_message_text("Tensor URL changed.", reply_markup=InlineKeyboardMarkup(keyboard_options))
        case 'change_url_site':
            await QUERY.edit_message_text("Website URL changed.", reply_markup=InlineKeyboardMarkup(keyboard_options))
        case 'change_url_pumpfun_token':
            await QUERY.edit_message_text("Pumpfun token URL changed.", reply_markup=InlineKeyboardMarkup(keyboard_options))
        case _:
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
    global QUERY
    query = update.callback_query
    QUERY = query

    match query.data:
        case "admin_panel":
            await admin_panel(update, context)
        case 'check_wallets':
            await query.edit_message_text(text="Checking Wallets...")
            await options_check_wallets(query)
        case 'check_urls':
            await query.edit_message_text(text="Checking URLs...")
            await options_list_urls(query)
        case 'change_urls':
            await query.edit_message_text(text="Changing URLs...")
            await options_change_urls(query)
        case 'change_url_twitter':
            await query.edit_message_text("Please write new twitter url")
        case 'change_url_telegram':
            await query.edit_message_text("Please write new telegram url")
        case 'change_url_tensor':
            await query.edit_message_text("Please write new tensor url")
        case 'change_url_site':
            await query.edit_message_text("Please write new website url")
        case 'change_url_pumpfun_token':
            await query.edit_message_text("Please write new pumpfun token url")


async def options_check_wallets(query):
    try:
        resp = requests.get(host_server + "/wallets/list")
        text = ""
        m = resp.json()
        for k, v in m.items():
            text = f"{text}n: {k} | wallet: {v}\n"
        await query.edit_message_text(text=text, reply_markup=InlineKeyboardMarkup(keyboard_options),
                                      disable_web_page_preview=True)
    except requests.RequestException as e:
        await query.message.reply_text("An error occurred while trying to get wallets",
                                       reply_markup=InlineKeyboardMarkup(keyboard_options))


async def options_list_urls(query) -> None:
    try:
        resp = requests.get(host_server + "/urls/list")
        text = ""
        m = resp.json()
        for k, v in m.items():
            text = f"{text}{k} | url: {v}\n"
        await query.edit_message_text(text=text, reply_markup=InlineKeyboardMarkup(keyboard_options),
                                      disable_web_page_preview=True)
    except requests.RequestException as e:
        await query.message.reply_text("An error occurred while trying to get URLs",
                                       reply_markup=InlineKeyboardMarkup(keyboard_options))


async def options_change_urls(query):
    try:
        resp = requests.get(host_server + "/urls/list")
        m = resp.json()
        websites = []
        for website_name, _ in m.items():
            callback_data = f"change_url_{website_name}"
            websites.append([InlineKeyboardButton(website_name, callback_data=callback_data)])
        text = "Choose which website's URL you want to change"
        await query.edit_message_text(text=text, reply_markup=InlineKeyboardMarkup(websites))
    except requests.RequestException as e:
        await query.edit_message_text("An error occurred while trying to get URLs",
                                      reply_markup=InlineKeyboardMarkup(keyboard_options))


async def change_url(update: Update, context: CallbackContext) -> None:
    user_input = update.message.text
    print("you are changing TWITTER", user_input)


app = ApplicationBuilder().token(bot_token).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_input))
app.add_handler(CallbackQueryHandler(admin_options))

app.run_polling()
