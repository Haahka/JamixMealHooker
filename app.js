const menu = require("./src/parseMenu.js");
const send = require("./src/sendWebhook.js");

console.log("App started!");

const main = async () => {
    const data = await menu.fetchMenu(); // fetch the menu from Jamix's API

    if(typeof data == "object") {
        if(data.general.weekend) {
            console.log("It's weekend, no message today!");
        } else {
            send.menu(data); // send the menu to a webhook
        }
    } else {
        console.log("An error happened whilst fetching the menu!");
    }
};

if(process.env.KITCHEN_ID && process.env.DISCORD_WEBHOOK) {
    main();
} else {
    console.log("No environment variables found. Aborting!");
}