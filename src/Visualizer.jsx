import React, { Component } from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import PtronVisualizer from './Perceptron/PtronVisualizer'
import './Visualizer.css'

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'sorting',
            rendering: false,
            algorithms: [],
            currentAlgorithm: null,
            goFunction: () => { },
            resetFunction: () => { },
            setAlgorithm: () => { },
        };
        this.getFunctions = this.getFunctions.bind(this);
        this.changeRenderingState = this.changeRenderingState.bind(this);
    }

    changeRenderingState(rendering) {
        this.setState({ rendering: rendering });
    }

    getFunctions(go, reset, setAlgo, algorithms) {
        //console.log(go);
        this.state.goFunction = go;
        this.state.resetFunction = reset;
        this.state.setAlgorithm = setAlgo;
        this.state.algorithms = algorithms;
        this.setState({ algorithms: algorithms });
        //this.state.goFunction();
    }

    render() {
        let renderObj = null;
        if (this.state.mode === 'pathfinding') {
            renderObj = <PathFindingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else if (this.state.mode === 'sorting') {
            renderObj = <SortingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else if (this.state.mode === 'perceptron') {
            renderObj = <PtronVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions}></PtronVisualizer>
        }
        else {
            renderObj =
                <div class="welbotron">
                    <div class="container welc">
                        <h1 class='welcome'>Hello, algorithms.
                            <p class="lead">This website might help you understand algorithms better by visualizing them.</p>
                            <p class="secondline lead">Click on one of the categories below to visualize algorithms.</p>
                        </h1>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                            }
                        }}>
                            <span></span>
                            PATH-FINDING
                        </a>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting' });
                            }
                        }}>
                            <span></span>
                            SORTING
                        </a>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'perceptron' });
                            }
                        }}>
                            <span></span>
                            Machine-Learning
                        </a>
                    </div>
                </div>
        }
        let invisibleOrNot = '';
        if (this.state.mode === 'main') invisibleOrNot = ' invisible';
        let algorithms = this.state.algorithms;
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-dark">

                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'main' });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Main</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                                this.setState({ currentAlgorithm: null });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >PathFinding</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting' });
                                this.setState({ currentAlgorithm: null });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Sorting</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'perceptron' });
                                this.setState({ currentAlgorithm: null });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >MachineLearning</button>
                    <div class={"dropdown" + invisibleOrNot}>
                        <button class="btn btn-light dropdown-toggle navbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            Actions
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.goFunction()}>Go!</button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.resetFunction()}>Reset</button>
                            </li>
                        </div>
                    </div>
                    <div class={"dropdown" + invisibleOrNot}>
                        <button class="btn btn-secondary dropdown-toggle navbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            {this.state.currentAlgorithm == null ? 'Algorithms' : this.state.currentAlgorithm}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                {algorithms.map((algorithm, algoId) => {
                                    console.log(algorithm);
                                    return (<button type="button" class="btn btn-light navbtn" onClick={() => {
                                        this.state.setAlgorithm(algoId);
                                        this.setState({ currentAlgorithm: this.state.algorithms[algoId] });
                                    }}>{algorithm}</button>);
                                }
                                )
                                }
                            </li>
                        </div>
                    </div>
                </nav>
                <div>
                    <div>{renderObj}</div>
                </div>
            </>
        )
    }
}
