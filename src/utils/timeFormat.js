
`Formats date appropiately to keep only the time in the format HH:MM`
export default function timeFormat(date) {
    return date.match(/\d{2}:\d{2}/g)[0]
}
