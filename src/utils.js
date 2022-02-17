const cheerio = require('cheerio');

const reverseMapping = object => 
    Object.keys(object).reduce((map, key) => {
        map[object[key]] = map[object[key]] && map[object[key]].concat(key) || [key]
        return map;
    }, {});

const extractMenuItems = dom => {
    const $ = cheerio.load(dom);
    return {
        caption: $('.multiline-button-caption-text').text(),
        meal: $('.item-name').text(),
        diets: $('.menuitem-diets').text()
    }
};

module.exports = { reverseMapping, extractMenuItems };