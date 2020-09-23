import React, { Component } from 'react';
import PtronVisualizer from './Perceptron/PtronVisualizer';
import PongVisualizer from './PongVisualizer/PongVisualizer';
import ConnectFour from './ConnectFourVisualizer/ConnectFour';


export default class MachineLearningVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgorithm: 2,
            algorithms: ['Perceptron', 'Approximate Q', 'Minimax'],
            visualizeML: () => { },
            reset: () => { }
        };
        this.state.reset = this.state.reset.bind(this.state);
        this.state.visualizeML = this.state.visualizeML.bind(this.state);
        this.getMLFunctions = this.getMLFunctions.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(() => { this.state.visualizeML() }, () => { this.state.reset() }, this.setAlgorithm, this.state.algorithms);
    }
    getMLFunctions(run, reset) {
        console.log(run, reset);
        this.state.visualizeML = () => {
            run()
        };
        this.state.reset = () => {
            reset();
        }
        this.setState({ visualizeML: run });
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
                renderObj = <PtronVisualizer setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getMLFunctions}></PtronVisualizer>
                break;
            case 1:
                renderObj = <PongVisualizer setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getMLFunctions}></PongVisualizer>
                break;
            case 2:
                renderObj = <ConnectFour setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getMLFunctions}></ConnectFour>
                break;
        }
        return (
            <div>{renderObj}</div>
        );

    }
}