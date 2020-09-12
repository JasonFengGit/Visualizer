import React, { Component } from 'react';
import './SortingVisualizer.css';
import Pile from './Pile/Pile';
import { selectionSort, bubbleSort, insertionSort, mergeSort, quickSort } from '../Algorithm/sortingAlgorithms';

export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piles: [],
            numPiles: 40,
            finished: false,
            maxPile: 80,
            changingPiles: [],
            pileDelayTimes: [30, 40, 40, 80, 80],
            colorSetIndex: getRandomInt(0, 3),
            currentAlgorithm: -1,
            unsortedPiles: [],
            algorithms: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
            sortingAlgorithms: [selectionSort, bubbleSort, insertionSort, mergeSort, quickSort]
        };
        this.randomizePiles = this.randomizePiles.bind(this);
        this.visualizeSorting = this.visualizeSorting.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(this.visualizeSorting, this.randomizePiles, this.setAlgorithm, this.state.algorithms);
    }

    componentDidMount() {
        const piles = this.initializePiles();
        this.setState({
            piles: piles,
        });
        this.setState({ piles: piles, unsortedPiles: piles.slice() });
    }

    setAlgorithm(algoId) {
        if (this.state.unsortedPiles !== []) {
            this.setState({ finished: false, changingPiles: [], piles: this.state.unsortedPiles });
        }
        this.setState({ currentAlgorithm: algoId });
    }

    initializePiles() {
        let piles = [];
        for (let i = 0; i < this.state.numPiles; i++) {
            piles.push(i + 5);
        }

        for (let i = 0; i < this.state.numPiles; i++) {
            //swap i and j
            let j = getRandomInt(0, i);
            let temp = piles[i];
            piles[i] = piles[j];
            piles[j] = temp;
        }
        piles.push(this.state.numPiles + 5);
        return piles;
    }

    visualizeSorting() {
        if (this.state.currentAlgorithm === -1) {
            return;
        }
        if (this.state.rendering) return;
        if (this.state.finished) {
            console.log(1);
            this.state.finished = false;
            this.state.changingPiles = [];
            this.state.piles = this.state.unsortedPiles;
        }
        this.setState({ rendering: true });
        this.props.setVisualizerRendering(true);
        const piles = this.state.piles.slice();

        const statesInOrder = this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);
        for (let i = 0; i < statesInOrder.length; i++) {
            const { piles: state, changing: changingPiles } = statesInOrder[i];
            setTimeout(() => {
                this.setState({ piles: state, changingPiles: changingPiles });
            }, this.state.pileDelayTimes[this.state.currentAlgorithm] * i);

        }
        setTimeout(() => {
            this.setState({ rendering: false, finished: true });
            this.props.setVisualizerRendering(false);
        }, this.state.pileDelayTimes[this.state.currentAlgorithm] * statesInOrder.length);
    }

    randomizePiles() {
        if (this.state.rendering) return;
        this.setState({ finished: false, changingPiles: [], colorSetIndex: getRandomInt(0, 3) });
        const piles = this.initializePiles();
        this.setState({ piles: piles, unsortedPiles: piles.slice() });
    }

    render() {
        const piles = this.state.piles;

        return (
            <>
                {/*
                <button
                    onClick={() => this.visualizeSorting()}
                    type="button" class="btn btn-outline-dark"
                    disabled={this.state.rendering}>
                    Sort!
                </button>
                <button
                    onClick={() => this.randomizePiles()}
                    type="button" class="btn btn-outline-dark"
                    disabled={this.state.rendering}>
                    Randomize!
                </button>*/}
                <div className='piles' class="container">
                    {

                        piles.map((pile, pileId) => {
                            return (
                                <Pile
                                    dummy={pileId === this.state.numPiles}
                                    finished={this.state.finished}
                                    className='pile'
                                    key={pileId}
                                    val={pile}
                                    isChanging={this.state.changingPiles.indexOf(pileId) !== -1}

                                    colorSetIndex={this.state.colorSetIndex}
                                ></Pile>
                            )
                        })
                    }

                </div>
            </>
        );
    }

}

function getRandomInt(min, range) {
    return Math.floor(Math.random() * range) + min;
}