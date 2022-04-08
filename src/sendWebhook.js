const axios = require('axios');
const embed = require('./createEmbed.js');
require('dotenv').config();

const BOT_NAME = process.env.BOT_NAME || "Bot";
const BOT_ICON = process.env.BOT_ICON || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || false;
const DISCORD_ENDPOINT = "https://discord.com/api/webhooks/";

const menu = data => {
    const params = {
        username: BOT_NAME,
        avatar_url: BOT_ICON,
        embeds: [
            embed.genMealEmbed(data)
        ]
    };

    if(DISCORD_WEBHOOK && DISCORD_WEBHOOK.includes(DISCORD_ENDPOINT))
    {
        console.log("About to send this embed to the webhook:", params, "\n");

        axios.post(DISCORD_WEBHOOK, params)
            .then(res => {
                console.log("Successfully send the message!");
            })
            .catch(error => {
                console.log(`ERROR! Failed to send the message, HTTP status: ${error.response.status}`);
            });
    }
    else
    {
        console.log("Invalid Discord webhook, could not send data!");
    }
}

module.exports = { menu };