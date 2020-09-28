import React, { Component } from 'react';
import PtronVisualizer from './Perceptron/PtronVisualizer';
import PongVisualizer from './PongVisualizer/PongVisualizer';
import ConnectFour from './ConnectFourVisualizer/ConnectFour';


export default class AIVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgorithm: -1,
            algorithms: ['Perceptron', 'Approximate Q', 'Minimax'],
            visualizeAI: () => { },
            reset: () => { }
        };
        this.state.reset = this.state.reset.bind(this.state);
        this.state.visualizeAI = this.state.visualizeAI.bind(this.state);
        this.getAIFunctions = this.getAIFunctions.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(() => { this.state.visualizeAI() }, () => { this.state.reset() }, this.setAlgorithm, this.state.algorithms);
    }
    getAIFunctions(run, reset) {
        console.log(run, reset);
        this.state.visualizeAI = () => {
            run()
        };
        this.state.reset = () => {
            reset();
        }
        this.setState({ visualizeAI: run });
    }
    setAlgorithm(algoId) {
        this.setState({ currentAlgorithm: algoId });
    }

    render() {
        let renderObj;
        switch (this.state.currentAlgorithm) {
            case -1:
                renderObj = <div style={{}}><h1 style={{ marginTop: "200px" }}>Welcome.</h1><br></br><h2>Select an algorithm to begin your journey!</h2></div>
                break;
            case 0:
                renderObj = <PtronVisualizer setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getAIFunctions}></PtronVisualizer>
                break;
            case 1:
                renderObj = <PongVisualizer setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getAIFunctions}></PongVisualizer>
                break;
            case 2:
                renderObj = <ConnectFour setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getAIFunctions}></ConnectFour>
                break;
        }
        return (
            <div>{renderObj}</div>
        );

    }
}