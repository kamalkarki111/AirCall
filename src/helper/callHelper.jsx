import moment from "moment";

/**
     * Checks if two dates are different.
     * 
     * @param {string} date1 - The first date.
     * @param {string} date2 - The second date.
     * @returns {boolean} True if the dates are different, false otherwise.
     */
export function isDiffDate(date1, date2) {
    // Convert the dates to moment objects and format them as 'DD MM YY'
    const formattedDate1 = moment(new Date(date1)).format('DD MM YY');
    const formattedDate2 = moment(new Date(date2)).format('DD MM YY');

    // Compare the formatted dates and return the result
    return formattedDate1 !== formattedDate2;
}