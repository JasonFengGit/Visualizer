import React, { Component } from 'react';
import './SortingVisualizer.css';
import Pile from './Pile/Pile';
import { selectionSort } from '../Algorithm/selectionSort';

export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piles: [],
            numPiles: 30,
            sortingAlgorithm: 'selection',
            finished: false,
            maxPile: 100,
            idA: -1,
            idB: -1,
        };
        this.randomizePiles = this.randomizePiles.bind(this);
        this.visualizeSorting = this.visualizeSorting.bind(this);
        this.props.getFunctions(this.visualizeSorting, this.randomizePiles);

    }
    componentDidMount() {
        const piles = this.initializePiles();
        this.setState({
            piles: piles,
        })
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
        if (this.state.sortingAlgorithm === 'selection') {
            const statesInOrder = selectionSort(piles);

            for (let i = 0; i < statesInOrder.length; i++) {
                const { piles: state, minId: idA, i: idB } = statesInOrder[i];
                setTimeout(() => {
                    this.setState({ piles: state, idA: idA, idB: idB })
                }, 150 * i);

            }
            setTimeout(() => {
                this.setState({ rendering: false, finished: true });
                this.props.setVisualizerRendering(false);
            }, 150 * statesInOrder.length);
        }
    }

    randomizePiles() {
        if (this.state.rendering) return;
        this.setState({ finished: false, idA: -1, idB: -1 });
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
                                    isChanging={pileId === this.state.idA || pileId === this.state.idB}
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