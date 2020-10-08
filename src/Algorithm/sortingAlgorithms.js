function swap(piles, a, b) {
    const tempVal = piles[a];
    piles[a] = piles[b];
    piles[b] = tempVal;
}

function selectionSort(piles) {

    let statesInOrder = [];
    for (let i = 0; i < piles.length - 1; i++) {
        let minId = i;
        for (let j = i + 1; j < piles.length; j++) {
            if (piles[j] < piles[minId]) {
                minId = j;
            }
            const temp = { piles: piles.slice(), changing: [j] };
            statesInOrder.push(temp);

        }
        swap(piles, minId, i);
        const temp = { piles: piles.slice(), changing: [minId, i] };
        statesInOrder.push(temp);
    }
    return statesInOrder;
}

function bubbleSort(piles) {
    let statesInOrder = [];
    let n = piles.length;
    while (n > 1) {
        let newN = 0;
        for (let i = 1; i < n; i++) {
            if (piles[i - 1] > piles[i]) {
                swap(piles, i - 1, i);
                newN = i;
                const temp = { piles: piles.slice(), changing: [i] };
                statesInOrder.push(temp);
            }
        }
        n = newN;
    }
    return statesInOrder;
}

function insertionSort(piles) {
    let statesInOrder = [];
    for (let i = 1; i < piles.length; i++) {
        for (let j = i; j > 0 && piles[j - 1] > piles[j]; j--) {
            swap(piles, j, j - 1);
            const temp = { piles: piles.slice(), changing: [j - 1] };
            statesInOrder.push(temp);
        }
    }
    console.log(statesInOrder);
    return statesInOrder;
}

function mergeSort(piles) {
    let statesInOrder = [];
    mergeSortHelper(piles, 0, piles.length - 1, statesInOrder);
    return statesInOrder;
}

function mergeSortHelper(piles, start, end, statesInOrder) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(piles, start, mid, statesInOrder);
    mergeSortHelper(piles, mid + 1, end, statesInOrder);
    merge(piles, start, mid, end, statesInOrder);
}

function merge(piles, start, mid, end, statesInOrder) {
    let k = start, i = start, j = mid + 1;
    let pilesC = piles.slice();
    while (i <= mid && j <= end) {
        if (pilesC[i] <= pilesC[j]) {
            piles[k++] = pilesC[i++];
        }
        else {
            piles[k++] = pilesC[j++];
        }
        const temp = { piles: piles.slice(), changing: [i, j, k] };
        statesInOrder.push(temp);

    }
    while (i <= mid) {
        piles[k++] = pilesC[i++];
        const temp = { piles: piles.slice(), changing: [i, k] };
        statesInOrder.push(temp);
    }
    while (j <= end) {
        piles[k++] = pilesC[j++];
        const temp = { piles: piles.slice(), changing: [j, k] };
        statesInOrder.push(temp);
    }
}


function quickSort(piles) {
    let statesInOrder = [];
    quickSortHelper(piles, 0, piles.length - 1, statesInOrder);
    return statesInOrder;
}

function quickSortHelper(piles, start, end, statesInOrder) {
    if (start < end) {
        let pivot = partition(piles, start, end, statesInOrder);
        quickSortHelper(piles, start, pivot - 1, statesInOrder);
        quickSortHelper(piles, pivot + 1, end, statesInOrder);
    }
}

function partition(piles, start, end, statesInOrder) {
    let pivot = piles[end];
    let i = start - 1;
    for (let j = start; j <= end - 1; j++) {
        if (piles[j] < pivot) {
            i++;
            swap(piles, i, j);
            const temp = { piles: piles.slice(), changing: [i, j], pivot: pivot};
            if(pivot !== piles.length+4) statesInOrder.push(temp);
        }
    }
    swap(piles, i + 1, end);
    const temp = { piles: piles.slice(), changing: [i + 1, end], pivot: pivot};
    if(pivot !== piles.length+4) statesInOrder.push(temp);
    return i + 1;
}

export { selectionSort, bubbleSort, insertionSort, mergeSort, quickSort };