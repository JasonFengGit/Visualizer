import React, { Component } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import { Perceptron, random } from './Perceptron';
import './PtronVisualizer.css';

/**
 * class definition of PtronVisualizer Class
 */
export default class PtronVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            training: new Array(1002),
            rendering: false,
            min: -1,
            max: 1,
            width: 500,
            height: 500,
            count: 0,
            ptron: null,
            xOff: 50,
            yOff: 100,
            M: 0.4,
            B: 0.3,
        }
        this.resetVisualizer = this.resetVisualizer.bind(this);
        this.startVisualizer = this.startVisualizer.bind(this);
        this.props.getFunctions(this.startVisualizer, this.resetVisualizer);
    }

    /**
     * @param {*} x 
     * @returns exact value of the origin function
     */
    f(x) {
        return this.state.M * x + this.state.B;
    }

    /**
     * map the value n from a range [as, ae] to [bs, be]
     * @param {*} n 
     * @param {*} as 
     * @param {*} ae 
     * @param {*} bs 
     * @param {*} be 
     * @returns the mapped value
     */
    map(n, as, ae, bs, be) {
        return ((n - as) / (ae - as)) * (be - bs) + bs;
    }

    initialize() {
        this.state.ptron = new Perceptron(3, 0.006);
        for (let i = 0; i < this.state.training.length; i++) {
            let x = random(this.state.min, this.state.max);
            let y = random(this.state.min, this.state.max);
            let answer = 1;
            if (y < this.f(x)) answer = -1;
            this.state.training[i] = {
                input: [x, y, 1],
                output: answer
            }
        }
    }

    resetVisualizer() {
        if (this.state.rendering) {
            return;
        }
        this.setState({ count: 0 });
        this.state.count = 0;
    }

    startVisualizer() {
        this.setState({ rendering: true });
        for (let i = 0; i < this.state.training.length - 1; i++) {
            setTimeout(
                () => {
                    this.setState({ count: i });
                    this.state.count = i;
                }
                , 25 * i);
        }
        setTimeout(() => {
            this.setState({ rendering: false });
        }, 25 * this.state.training.length)

    }

    /**
     * render the scene using Konva
     */
    render() {
        if (this.state.count === 0) {
            this.initialize();
        }
        let min = this.state.min;
        let max = this.state.max;
        let ptron = this.state.ptron;
        let x1 = this.map(min, min, max, 0, this.state.width);
        let y1 = this.map(this.f(min), min, max, this.state.height, 0);
        let x2 = this.map(max, min, max, 0, this.state.width);
        let y2 = this.map(this.f(max), min, max, this.state.height, 0);

        let weights = ptron.getWeights();
        let xx1 = min;
        let yy1 = (-weights[2] - weights[0] * xx1) / weights[1];
        let xx2 = max;
        let yy2 = (-weights[2] - weights[0] * xx2) / weights[1];

        xx1 = this.map(xx1, min, max, 0, this.state.width);
        yy1 = this.map(yy1, min, max, this.state.height, 0);
        xx2 = this.map(xx2, min, max, 0, this.state.width);
        yy2 = this.map(yy2, min, max, this.state.height, 0);
        ptron.train(this.state.training[this.state.count].input, this.state.training[this.state.count].output);

        let points = []

        for (let i = 0; i < this.state.count; i++) {
            let guess = ptron.feedforward(this.state.training[i].input);
            let x = this.map(this.state.training[i].input[0], min, max, 0, this.state.width);
            let y = this.map(this.state.training[i].input[1], min, max, this.state.height, 0);
            if(i%4>0) points.push({ x: x, y: y, fill: guess < 0 });
        }
        
        let aM = -weights[0] / weights[1];
        let aB = -weights[2] / weights[1];
        let eM = aM - this.state.M;
        let eB = aB - this.state.B;
        let textComponet;
        if (this.state.count !== 0) {
            textComponet = <><Text
                x={550}
                y={50}
                text='Function Form: Y = M * X + B'
                fontFamily='Calibri'
                fill='black'
                fontSize={25}
            ></Text>
                <Text
                    x={550}
                    y={80}
                    text={`Original Function: M = ${this.state.M} B = ${this.state.B}`}
                    fontFamily='Calibri'
                    fill='black'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={135}
                    text={`Approximation:\nM = ${aM}\nB = ${aB}`}
                    fontFamily='Calibri'
                    fill='black'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={240}
                    text={`Error:\nM: ${eM}\nB:${eB}`}
                    fontFamily='Calibri'
                    fill='red'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={340}
                    text={`Count: ${this.state.count}`}
                    fontFamily='Calibri'
                    fill='grey'
                    fontSize={25}
                ></Text>
                </>
        }
        else {
            textComponet = <><Text
                x={550}
                y={50}
                text=''
                fontFamily='Calibri'
                fill='black'
                fontSize={25}
            ></Text>
                <Text
                    x={550}
                    y={80}
                    text={`Original Function: M = ${this.state.M} B = ${this.state.B}`}
                    fontFamily='Calibri'
                    fill='black'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={135}
                    text={`Approximation:\nM = ${aM}\nB = ${aB}`}
                    fontFamily='Calibri'
                    fill='black'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={240}
                    text={`Error:\nM: ${eM}\nB:${eB}`}
                    fontFamily='Calibri'
                    fill='red'
                    fontSize={25}
                ></Text>
                <Text
                    x={550}
                    y={340}
                    text={`Count: ${this.state.count}`}
                    fontFamily='Calibri'
                    fill='grey'
                    fontSize={25}
                ></Text>
                </>
        }
        let circles = points.map((point, pointId) => {
            return (<Circle
                key={pointId}
                x={point.x + 0}
                y={point.y + 0}
                stroke={'black'}
                radius={3}
                opacity={0.7}
                fill={point.fill ? 'black' : 'white'}
            ></Circle>)}
        )
        this.state.all = (
            <>
                <Stage
                    width={500 * 2}
                    height={500 + 1}
                    className='ptron-stage'
                    id='stage'
                >
                    <Layer name="layer" ref={ref => (this.state.layer = ref)}>
                        <Line points={[0, 0, 500, 0]} stroke={'black'} ></Line>
                        <Line points={[0, 0, 0, 0 + 500]} stroke={'black'}></Line>
                        <Line points={[0, 0 + 500, 500 + 0, 0 + 500]} stroke={'black'} ></Line>
                        <Line points={[500 + 0, 0, 500 + 0, 0 + 500]} stroke={'black'} strokeWidth={1}></Line>
                        <Line
                            points={[x1 + 0, 0 + y1, x2 + 0, 0 + y2]}
                            stroke={'red'}
                            strokeWidth={1}>
                        </Line>
                        <Line
                            points={[xx1 + 0, 0 + yy1, xx2 + 0, 0 + yy2]}
                            stroke={'blue'}
                            strokeWidth={this.state.count > 0 ? 1 : 0}>
                        </Line>
                        {circles}
                        {textComponet}
                    </Layer>
                </Stage>
            </>
        );
        return this.state.all;
    }

}
