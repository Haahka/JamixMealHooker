const timezone = () => new Date() + 3600 * 1000 * 3; // GMT+3

const toWeekday = [
    "Su",
    "Ma",
    "Ti",
    "Ke",
    "To",
    "Pe",
    "La"
];

const getCustomDate = (addition) => {
    const date = new Date(timezone());

    if(typeof addition != "number") {
        addition = 0;
    }

    const year = date.getFullYear();

    const month = date.getMonth() + 1;
    const fixedMonth = month <= 9
        ? `0${month}`
        : month;
    
    const day = date.getDate() + addition;
    let fixedDay = day <= 9
        ? `0${day}`
        : day;
    
    return `${year}${fixedMonth}${fixedDay}`; //if addition exceeds the month's days, the month will not be adjusted
};

const getDate = () => {
    const date = new Date(timezone());
    
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${toWeekday[date.getDay()]} ${day}.${month}.`;
};

const getFullDate = () => {
    const date = new Date(timezone());
    
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${toWeekday[date.getDay()]} ${day}.${month}. @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const getWeekdayNumber = () => {
    const date = new Date(timezone());
    
    return date.getDay();
};

module.exports = { toWeekday, getCustomDate, getDate, getWeekdayNumber, getFullDate };