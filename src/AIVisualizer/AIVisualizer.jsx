import React, { Component } from 'react';
import PtronVisualizer from './Perceptron/PtronVisualizer';
import PongVisualizer from './PongVisualizer/PongVisualizer';
import ConnectFour from './ConnectFourVisualizer/ConnectFour';
import NNSnakeVisualizer from './NNSnakeVisualizer/NNSnakeVisualizer';
import './AIVisualizer.css';

export default class AIVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgorithm: -1,
            algorithms: ['Perceptron', 'Approximate Q', 'Minimax'],
            visualizeAI: () => { },
            reset: () => { },
        };
        
        this.state.reset = this.state.reset.bind(this.state);
        this.state.visualizeAI = this.state.visualizeAI.bind(this.state);
        this.getAIFunctions = this.getAIFunctions.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(() => { this.state.visualizeAI() }, () => { this.state.reset() }, this.setAlgorithm, this.state.algorithms);
    }

    componentDidMount(){
        // combinatronics.com
        this.newScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js");
        this.newScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js");
        this.newScript("https://combinatronics.com/JasonFengGit/Visualizer/master/src/AIVisualizer/networkAnimation.js");
    }

    getAIFunctions(run, reset) {
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

    newScript(url){
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }

    render() {
        let renderObj;
        switch (this.state.currentAlgorithm) {
            case -1:
                renderObj = 
                <div>
                    <div class="textcontainer">
                        <div class="typewriter"><h1>Welcome to the Future.</h1></div>
                    </div>
                    <div id="large-header" class="large-header" style={{marginTop: "-18em"}}>
                        <canvas id="demo-canvas"></canvas>
                    </div>
                </div>
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
            case 3:
                renderObj = <NNSnakeVisualizer setVisualizerRendering={this.props.setVisualizerRendering} getFunctions={this.getAIFunctions}></NNSnakeVisualizer>
                break;
            default:
                break;
        }
        return (
            <div>{renderObj}</div>
        );

    }
}