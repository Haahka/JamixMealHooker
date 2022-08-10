# JamixMealHooker
Fetches meal data from Jamix and sends the daily meal to a webhook.

## Environment variables

```env
KITCHEN_ID=integer
BOT_NAME=string
BOT_ICON=string
BOT_THUMBNAIL=string
DISCORD_WEBHOOK=string
```

## Build

```
npm install dependencies
npm start
```

## Usage

Setup a scheduler to run the app every day.

```
crontab -e
0 5 0 * * * /usr/local/bin/node /home/your_name/JamixMealHooker-main/app.js
```

## Running without Wi-Fi

Use the [Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate&gl=US) app to schedule your hotspot to start at a specific time. Your device, such as Raspberry Pi, should automatically connect to the hotspot and be able to send the menu if timed right.

You can download a flow for it [here](extra/HOTSPOT_SCHEDULER.flo).

## Note

Use the latest Node.js version to avoid errors.
