import React, { Component } from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './Visualizer.css'
import MachineLearningVisualizer from './MachineLearningVisualizer/MachineLearningVisualizer';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'machine',
            rendering: false,
            algorithms: [],
            currentAlgorithm: null,
            goFunction: () => { },
            resetFunction: () => { },
            setAlgorithm: () => { },
            sortingClicked: false,
            pathClicked: false,
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
        else if (this.state.mode === 'machine') {
            renderObj = <MachineLearningVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions}></MachineLearningVisualizer>
        }
        else {
            renderObj =
                <div class="welbotron">
                    <div class="container welc">
                        <h1 class='welcome'>Hello, algorithms.
                            <p class='quote'>"An algorithm must be seen to be believed."</p>
                            <p class="lead">This website might help you understand algorithms better by visualizing them.</p>
                            <p class="secondline lead">Click on one of the categories below to visualize algorithms.</p>
                        </h1>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                                this.setState({ currentAlgorithm: null, pathClicked: true });
                            }
                        }} data-toggle={this.state.pathClicked ? "" : "modal"} data-target="#pathIntroModal">
                            <span></span>
                            PATH-FINDING
                        </a>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                            }
                        }} data-toggle={this.state.sortingClicked ? "" : "modal"} data-target="#sortingIntroModal">
                            <span></span>
                            SORTING
                        </a>
                        <a href='#' className='mainpage b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'machine' });
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
                                this.setState({ mode: 'pathfinding', pathClicked: true });
                                this.setState({ currentAlgorithm: null });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" class="btn btn-dark navbtn" data-toggle={this.state.pathClicked ? "" : "modal"} data-target="#pathIntroModal"
                        disabled={this.state.rendering}
                    >Pathfinding</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" class="btn btn-dark navbtn" data-toggle={this.state.sortingClicked ? "" : "modal"} data-target="#sortingIntroModal"
                        disabled={this.state.rendering}
                    >Sorting</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'machine' });
                                this.setState({ currentAlgorithm: null });
                                this.state.setAlgorithm(-1);
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
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.goFunction()} data-toggle={this.state.currentAlgorithm === null ? "modal" : ""} data-target="#setAlgoModal" disabled={this.state.mode === "machine" && this.state.currentAlgorithm === "Minimax"}>Go!</button>
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
                <div class="modal fade" id="setAlgoModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">No Algorithm Selected</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body-alert">
                                <p>Please select an algorithm first.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal fade" id="pathIntroModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content intro">

                            <div class="modal-header">
                                <h5 class="modal-title">Pathfinding</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body intro">
                                <p>
                                    Pathfinding is generally the process of finding a route between two points. It is closely related to the shortest path problem in graph theory,
                                    which examines how to identify the "best" paths valued by different criteria (Ex. distance, cost, time consumption).
                                </p>
                                <p>Pathfinding is also similar to Searching in some circumstances. For instance, we can use [breadth-first search] to find the shortest path in a grid world.</p>
                                <p>
                                    In our scenario, the paths are valued by the number of cells they passed from START:
                                    <div class="simg" width="20" height="20"></div>
                                    to the TARGET:
                                    <div class="fimg" width="20" height="20"></div>
                                    .
                                </p>
                                <p>You may drag the START and TARGET icons to change their positions, and click on the blank nodes to add Walls.</p>

                                <p>Now please choose a sorting algorithm and visualize it!</p>
                                <p class='tips'>(after choosing an algorithm, click on the [Actions] button.)</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal fade" id="sortingIntroModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content intro">

                            <div class="modal-header">
                                <h5 class="modal-title">Sorting</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body intro">
                                <p>Sorting is a process of arranging an ordered sequence. It is a common operation in many applications.</p>
                                <p>Common uses of sorted sequences are:
                                    <div class='uses-list'>
                                        <p>·lookup or search efficiently</p>
                                        <p>·merge sequences efficiently</p>
                                        <p>·process data in a defined order</p>
                                    </div>
                                Now please choose a sorting algorithm and visualize it!
                                </p>
                                <p class='tips'>(after choosing an algorithm, click on the [Actions] button.)</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div>{renderObj}</div>
                </div>
            </>
        )
    }
}
