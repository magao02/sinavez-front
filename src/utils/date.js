export function dateToYMD(date) {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
}

export function dateToDMY(date) {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

export function dayDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date2 - date1) / oneDay));
}

export function dateFromDMY(data) {
    data = data.split("/");
    return new Date(
      `${data[2]}-${data[1].padStart(2, '0')}-${data[0].padStart(2, '0')}T01:00:00+01:00`
    );
}