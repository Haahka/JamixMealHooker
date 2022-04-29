const path = require("path");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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
        let diet = meals.main.diets;

        if(diet.length == 0 || diet == false) {
            diet = ''
        }
        
        let details = `${meals.main.meal} ${diet}`;

        if(meals.main.meal.includes("OMAT RUOKALISTAT")) {
            details = meals.main.meal;
        }

        embed.fields.push({
            "name": meals.main.caption,
            "value": details
        });
    }

    if(typeof meals.vegetarian.meal == "string") {
        let diet = meals.vegetarian.diets;

        if(diet.length == 0 || diet == false) {
            diet = ''
        }

        let details = `${meals.vegetarian.meal} ${diet}`;

        embed.fields.push({
            "name": meals.vegetarian.caption,
            "value": details
        });
    }

    if(typeof meals.appendage.meal == "string") {
        let diet = meals.appendage.diets;

        if(diet.length == 0 || diet == false) {
            diet = ''
        }

        let details = `${meals.appendage.meal} ${diet}`;

        embed.fields.push({
            "name": meals.appendage.caption,
            "value": details
        });
    }

    embed.fields.push({
        "name" : "Ruokavaliot",
        "value" : "G = Gluteeniton\nK = Kasvis\nL = Laktoositon\nM =	Maidoton\nSL = Sisältää sianlihaa\nVEG = Vegaani"
    });

    return embed;
};

module.exports = { genMealEmbed };