const axios = require('axios');
require('dotenv').config();

const BOT_NAME = process.env.BOT_NAME || "Bot";
const BOT_ICON = process.env.BOT_ICON || "";
const BOT_THUMBNAIL = process.env.BOT_THUMBNAIL || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || false;

const menu = data => {
    const meals = data?.meals;

    const params = {
        username: BOT_NAME,
        avatar_url: BOT_ICON,
        embeds: [
            {
                "title": `Päivän ruokalista (${data?.general.date})`,
                "color": 1017649,
                "thumbnail": {
                    "url": BOT_THUMBNAIL,
                },
                "fields": [
                    {
                        "name": meals.main.caption,
                        "value": `${meals.main.meal} (${meals.main.diets})`
                    },
                    {
                        "name": meals.vegetarian.caption,
                        "value": `${meals.vegetarian.meal} (${meals.vegetarian.diets})`
                    },
                    {
                        "name": meals.appendage.caption,
                        "value": `${meals.appendage.meal} (${meals.appendage.diets})`
                    },
                    {
                        "name": "Ruokavaliot",
                        "value": "G = Gluteeniton\nK = Kasvis\nL = Laktoositon\nM =	Maidoton\nSL = Sisältää sianlihaa\nVEG = Vegaani"
                    }
                ]
            }
        ]
    };

    if(DISCORD_WEBHOOK && DISCORD_WEBHOOK.includes("https://discord.com/api/webhooks/"))
    {
        axios.post(DISCORD_WEBHOOK, params);
    } 
    else
    {
        console.log("Invalid Discord webhook, could not send data!");
    }
}

module.exports = { menu };