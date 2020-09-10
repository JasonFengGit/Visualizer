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
            colorSetIndex: getRandomInt(0, 3),
            currentAlgorithm: 0,
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
        })
    }

    setAlgorithm(algoId) {
        this.setState({ currentAlgorithm: algoId });
    }

    initializePiles() {
        const piles = [];
        for (let i = 0; i < this.state.numPiles; i++) {
            piles.push(getRandomInt(5, this.state.maxPile - 5));
        }
        return piles;
    }

    visualizeSorting() {
        if (this.state.rendering) return;
        this.setState({ rendering: true });
        this.props.setVisualizerRendering(true);
        const piles = this.state.piles.slice();

        const statesInOrder = this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);
        for (let i = 0; i < statesInOrder.length; i++) {
            const { piles: state, changing: changingPiles } = statesInOrder[i];
            setTimeout(() => {
                this.setState({ piles: state, changingPiles: changingPiles });
            }, 150 * i);

        }
        setTimeout(() => {
            this.setState({ rendering: false, finished: true });
            this.props.setVisualizerRendering(false);
        }, 150 * statesInOrder.length);
    }

    randomizePiles() {
        if (this.state.rendering) return;
        this.setState({ finished: false, changingPiles: [], colorSetIndex: getRandomInt(0, 3) });
        const piles = this.initializePiles();
        this.setState({ piles: piles });
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
    return Math.floor(Math.random() * Math.floor(range)) + min;
}