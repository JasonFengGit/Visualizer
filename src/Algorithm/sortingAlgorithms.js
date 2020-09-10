function selectionSort(piles) {

    let statesInOrder = [];
    for (let i = 0; i < piles.length - 1; i++) {
        let minId = i;
        for (let j = i + 1; j < piles.length; j++) {
            if (piles[j] < piles[minId]) {
                minId = j;
            }
        }
        const tempVal = piles[minId];
        piles[minId] = piles[i];
        piles[i] = tempVal;
        const temp = { piles: piles.slice(), changing: [minId, i] };
        statesInOrder.push(temp);
    }
    return statesInOrder;
}

function bubbleSort(piles) {
    return piles;
}

function insertionSort(piles) {
    return piles;
}

function mergeSort(piles) {
    return piles;
}


function quickSort(piles) {
    return piles;
}

export { selectionSort, bubbleSort, insertionSort, mergeSort, quickSort };