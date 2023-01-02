
// Implementation of Fisher-Yates shuffle algorithm
export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

