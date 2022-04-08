const axios = require('axios');
const date = require("./date.js");
require('dotenv').config();

const KITCHEN_ID = process.env.KITCHEN_ID || false;
const BACKEND_URL = "https://fi.jamix.cloud/apps/menuservice/rest/haku/menu";

const fetchMenu = async () => {
    if(!KITCHEN_ID) {
        console.log("The environment variable 'KITCHEN_ID' does not exist. Could not continue.");
        return false;
    }

    const KITCHEN_URL = `${BACKEND_URL}/${KITCHEN_ID}/10?lang=fi&date=${date.getCustomDate()}&date2=20500101&json=1`;

    const res = await axios.get(KITCHEN_URL)
        .then(r => r.data[0])
        .catch(err => {
            console.log(err);
            return false;
        });

    if(res.length != 0) {
        const createdMenu = createMenu(res);

        if(typeof createdMenu == "object") {
            return createdMenu;
        } else {
            console.log("Failed to create menu!");
            return false;
        }

    } else {
        console.log("Failed to load menu data!");
        return false;
    }
};

const createMenu = data => {
    const menu = data.menuTypes[0].menus[0];
    const meal = day => menu.days[0].mealoptions[day];

    const mealObj = {
        "general": {
            "title": "Päivän ruokalista",
            "date": date.getDate(),
            "weekend" : date.getWeekdayNumber() > 5 ? true : false
        },
        "meals": {
            "main": {
                "caption": meal(0)?.name,
                "meal" : meal(0)?.menuItems[0].name,
                "diets" : meal(0)?.menuItems[0].diets,
                "portionSize": meal(0)?.menuItems[0].portionSize
            },
            "vegetarian": {
                "caption": meal(1)?.name,
                "meal" : meal(1)?.menuItems[0].name,
                "diets" : meal(1)?.menuItems[0].diets,
                "portionSize": meal(1)?.menuItems[0].portionSize
            },
            "appendage": {
                "caption": meal(2)?.name,
                "meal" : meal(2)?.menuItems[0].name,
                "diets" : meal(2)?.menuItems[0].diets,
                "portionSize": meal(2)?.menuItems[0].portionSize
            }
        }
    };

    console.log("Parsed meal data:", mealObj, "\n");

    return mealObj;
}

module.exports = { fetchMenu };