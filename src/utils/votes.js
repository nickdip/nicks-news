
export default function votesPic(vote) {
    const pic = {"up": "../src/static/up.png", "down": "../src/static/down.png"}
    
    if (vote < 0) pic["down"]

    return pic["up"]



}
