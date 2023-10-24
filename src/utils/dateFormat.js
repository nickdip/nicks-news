
`Formats date appropiately to keep only the date in the format YYYY-MM-DD`
export default function dateFormat(date) {
    return date.match(/\d{4}-\d{2}-\d{2}/g)[0]
}


