const menu = require("./src/parseMenu.js");
const send = require("./src/sendWebhook.js");
const date = require("./src/date.js");

console.log("App started!");

const main = async () => {
    const data = await menu.fetchMenu(); // fetch the menu from Jamix's API

    if(typeof data == "object") {
        send.menu(data); // send the menu to a webhook
    } else {
        console.log("An error happened whilst fetching the menu!");
    }
};

if(process.env.KITCHEN_ID && process.env.DISCORD_WEBHOOK) {
    const weekend = date.getWeekdayNumber() > 5 ? true: false;

    if(!weekend) {
        main();
    } else {
        console.log("Aborting execution, its a weekend!");
    }
} else {
    console.log("No environment variables found. Aborting!");
}