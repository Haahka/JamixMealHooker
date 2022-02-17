const fetch = require("./src/fetch");
const send = require("./src/send");
const cron = require("node-cron");

const main = async () => {
    const data = await fetch.menu(); // fetch the menu from Jamix's API

    if(data)
    {
        send.menu(data); // send the menu to a webhook
    } 
    else 
    {
        console.log("An error happened whilst fetching the menu!");
    }
};

if(process.env.KITCHEN_ID && process.env.DISCORD_WEBHOOK)
{
    console.log("App started!");

    //Monday to Friday @ 00:05 - https://cron.help
    cron.schedule('05 00 * * 1-5', () => main(), {
         timezone: "Europe/Helsinki" 
    });
} 
else
{
    console.log("No environment variables found. Aborting!");
}