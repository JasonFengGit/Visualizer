import React, { Component } from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import PtronVisualizer from './Perceptron/PtronVisualizer'
import './Visualizer.css'

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'main',
            rendering: false,
            goFunction: () => { },
            resetFunction: () => { },
        };
        this.getFunctions = this.getFunctions.bind(this);
        this.changeRenderingState = this.changeRenderingState.bind(this);
    }

    changeRenderingState(rendering) {
        this.setState({ rendering: rendering });
    }

    getFunctions(go, reset) {
        //console.log(go);
        this.state.goFunction = go;
        this.state.resetFunction = reset;
        //console.log(this.state.goFunction)
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
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Hello, algorithms.
                        <p class="lead">This website might help you understand algorithms better by visualizing them.</p>
                        </h1>
                    </div>
                </div>
        }
        let invisibleOrNot = '';
        if (this.state.mode === 'main') invisibleOrNot = ' invisible';
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light  bg-dark">

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
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Pathfinding</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting' });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Sorting</button>
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'perceptron' });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Perceptron</button>
                    <div class={"dropdown" + invisibleOrNot}>
                        <button class="btn btn-dark dropdown-toggle navbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            Actions
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.goFunction()}>Go!</button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.resetFunction()}>Reset</button>
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
