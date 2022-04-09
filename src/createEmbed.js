const date = require("./date.js");
require('dotenv').config();

const BOT_THUMBNAIL = process.env.BOT_THUMBNAIL || "";
const KITCHEN_ID = process.env.KITCHEN_ID || false;
const FRONTEND_URL = "https://fi.jamix.cloud/apps/menu";

const genMealEmbed = data => {
    const meals = data?.meals;

    const embed = {
        "title": `Päivän ruokalista (${data?.general.date})`,
        "url": `${FRONTEND_URL}/?anro=${KITCHEN_ID}`,
        "color": 1017649,
        "thumbnail": {
            "url": BOT_THUMBNAIL,
        },
        "fields": []
    }

    if(typeof meals.main.meal == "string") {
        let details = `${meals.main.meal} (${meals.main.diets})`;
        
        if(meals.main.meal.includes("OMAT RUOKALISTAT")) {
            details = meals.main.meal;
        }

        embed.fields.push({
            "name": meals.main.caption,
            "value": details
        });
    }

    if(typeof meals.vegetarian.meal == "string") {
        embed.fields.push({
            "name": meals.vegetarian.caption,
            "value": `${meals.vegetarian.meal} (${meals.vegetarian.diets})`
        });
    }

    if(typeof meals.appendage.meal == "string" ) {
        embed.fields.push({
            "name": meals.appendage.caption,
            "value": `${meals.appendage.meal} (${meals.appendage.diets})`
        });
    }

    embed.fields.push({
        "name" : "Ruokavaliot",
        "value" : "G = Gluteeniton\nK = Kasvis\nL = Laktoositon\nM =	Maidoton\nSL = Sisältää sianlihaa\nVEG = Vegaani"
    });

    return embed;
};

module.exports = { genMealEmbed };