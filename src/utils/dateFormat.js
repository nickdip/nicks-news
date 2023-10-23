
export default function dateFormat(date) {
    return date.match(/\d{4}-\d{2}-\d{2}/g)[0]
}