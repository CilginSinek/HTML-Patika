function Datalisting(dataList) {
    const now = new Date();
    const isAfternoon = now.getHours() >= 12;
    if (!isAfternoon) {
        const dates = [];
        for (const data of dataList) {
            const date = new Date(data.dt * 1000);
            dates.push({ date, data });
        }
        const filteredDates = dates.filter(date => date.date.getHours() === 12);
        return filteredDates
    } else {
        const dates = [];
        for (const data of dataList) {
            const date = new Date(data.dt * 1000);
            dates.push({ date, data });
        }
        const filteredDates = dates.filter(date => date.date.getHours() === 0 && date.date.getMinutes() === 0);
        return filteredDates
    }
}
export default Datalisting