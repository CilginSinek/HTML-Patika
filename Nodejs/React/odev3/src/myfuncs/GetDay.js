function getWeekdayFromDate(dateStr) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateStr);
    const weekdayStr = weekdays[date.getUTCDay()];
    return weekdayStr;
}
export default getWeekdayFromDate