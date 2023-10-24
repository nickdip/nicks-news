
export default function votesColour(vote) {
    if (vote < 0) return { color: "red" }
    if (vote > 0) return { color: "green" }
    return { color: "black" }
}
