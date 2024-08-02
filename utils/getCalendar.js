async function getCalendar(response) {
    const dates = [];
    const days = response.data.availabilityCalendar.days;

    days.forEach((day) => {
        let price = day.avgPriceFormatted;
        const available = day.available;
        const checkIn = day.checkin;

        // Remove any currency symbols and parse as float
        price = parseFloat(price.replace(/[^0-9.-]+/g, ""));

        dates.push({
            price: price,
            available: available,
            checkIn: checkIn
        });
    });

    // * sort dates by checkIn in ascending order
    dates.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

    return dates;
}

module.exports = getCalendar;
