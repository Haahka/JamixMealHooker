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

## Note

Please use the latest Node.js version!
