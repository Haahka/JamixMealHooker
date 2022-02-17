const axios = require('axios');
const utils = require('./utils');
require('dotenv').config();

const KITCHEN_ID = process.env.KITCHEN_ID || false;

const menu = async () => {
    if(!KITCHEN_ID) 
    {
        console.log("The environment variable 'KITCHEN_ID' does not exist. Could not continue.");
        return 0;
    }

    const params = new URLSearchParams();
    params.append('v-browserDetails', 1);
    params.append('theme', 'menu');

    const res = await axios.post(`https://fi.jamix.cloud/apps/menu/?anro=${KITCHEN_ID}`, params);
    if(!res.data) return 0; // request failed

    const parsed = JSON.parse(res.data["uidl"]);
    const data = parsed.state;

    const childLocations = utils.reverseMapping(data[4]?.childLocations);

    /* Expected JSON structure returned by the Jamix API
        5	:	subcaption
        6	:	previous
        7	:	filterByDate
        8	:	maincaption
        9	:	previousdate
        10	:	nextdate
        11	:	home
        ...
     The meals which are not included in the childLocations
        15  : main
        16  : vegetarian
        17  : appendage
    */

    const mealObj = {
        "general": {
            "title": data[childLocations['maincaption']]?.text,
            "date": data[childLocations['subcaption']]?.text,
        },
        "meals": {
            "main": utils.extractMenuItems(data[15]?.caption),
            "vegetarian": utils.extractMenuItems(data[16]?.caption),
            "appendage": utils.extractMenuItems(data[17]?.caption)
        }
    };

    if(mealObj)
    {
        return mealObj;
    } 
    else 
    {
        return 0;
    }
};

module.exports = { menu };