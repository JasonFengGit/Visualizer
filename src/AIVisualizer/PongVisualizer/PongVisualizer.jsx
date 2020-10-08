import React, { Component } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import PongAgent from "./PongAgent.js";
import "./PongVisualizer.css";

/**
 * definition of PongVisualizer Class
 */
export default class PongVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dots: [],
            rendering: true,
            width: 600,
            height: 500,
            x: null,
            y: null,
            r: 15,
            vx: 0,
            vy: 0,
            ballSpeed: 3,
            panelx: 0,
            panely: 480,
            panelSpeed: 3,
            ballInitialized: false,
            framecount: 0,
            score: 0,
            pressedLeft: false,
            pressedRight: false,
            finished: false,
            gameCount: -1,
            agent: new PongAgent(3, 0.9, 0.2, 0.2),
            notStarted: true,
        }

        this.resetVisualizer = this.resetVisualizer.bind(this);
        this.startVisualizer = this.startVisualizer.bind(this);

        this.props.getFunctions(this.startVisualizer, this.resetVisualizer);

    }

    startVisualizer() {
        this.setState({ notStarted: false });
        this.setState({
            rendering: false,
            ballInitialized: false,
            framecount: 0,
            score: 0,
            finished: false,
            gameCount: 0,
            agent: new PongAgent(3, 0.9, 0.2, 0.2),
        });
        this.componentDidMount();
    }
    resetVisualizer() {
        this.setState({
            rendering: false,
            ballInitialized: false,
            framecount: 0,
            score: 0,
            finished: false,
            gameCount: 0,
            notStarted: true,
            agent: new PongAgent(3, 0.9, 0.2, 0.2),
        });
        this.componentDidMount();
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {
        let speed = this.state.ballSpeed;
        let ox = randomInt(200, 480);
        let oy = 200;
        let ovx = [speed, -speed, 1.2 * speed, -1.2 * speed, 0.8 * speed, -0.8 * speed][randomInt(0, 5)];
        let ovy = speed;
        this.setState({
            x: ox,
            y: oy,
            vx: ovx,
            vy: ovy,
            score: 0,
            panelx: 0,
            storedWeights: {},
            dots: [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }, { x: 400, y: 100 }, { x: 500, y: 100 }],
            gameCount: this.state.gameCount + 1
        });
        this.state.x = ox;
        this.state.y = oy;
        this.state.vx = ovx;
        this.state.vy = ovy;

    }

    getState() {
        const { dots, x, y, panelx: px, vx, vy } = this.state;
        return { dots: dots, x: x, y: y, px: px, vx: vx, vy: vy, terminal: this.state.score === 500 || this.state.finished };
    }

    updatePanel(action) {
        if (this.state.finished) return;
        this.movePanel(action);
    }

    updateBall() {
        if (this.state.finished) return;
        let { x, y, r, vx, vy, panelx } = this.state;
        if (x === 0 && y === 0) return;
        x = x + vx;
        y = y + vy;
        if (x > this.state.width - r - 5 || x < r + 5) {
            vx = -vx;
        }
        if (y < r + 5) {
            vy = -vy;
        }
        if (y > this.state.panely - r - 5 && y > this.state.panely - r + 5 && Math.abs(panelx - x + 50) < 50) {
            vy = vy > 0 ? -vy : vy
        }
        else if (y > this.state.height - r && Math.abs(panelx - x + 50) > 50) {
            this.setState({ score: this.state.score - 1000 });
            this.initialize();
            return false;
        }
        this.setState({
            x: x,
            y: y,
            vx: vx,
            vy: vy
        });
        this.state.x = x;
        this.state.y = y;
        this.state.vx = vx;
        this.state.vy = vy;

        return true;
    }

    updateDots() {
        if (this.state.finished) return;
        let score = this.state.score;
        for (let i = 0; i < this.state.dots.length; i++) {
            if (distance(this.state.dots[i], { x: this.state.x, y: this.state.y }) < this.state.r) {
                this.state.dots.splice(i, 1);
                score += 100;
            }
        }
        this.setState({ score: score });
    }

    movePanel(action) {
        if (this.state.finished) return;
        let panelx = this.state.panelx;
        let panelSpeed = this.state.panelSpeed;
        if (action === -1) {
            panelx = panelx - panelSpeed;
        }
        else if (action === 1) {
            panelx = panelx + panelSpeed;
        }
        this.setState({ panelx: Math.min(this.state.width - 100, Math.max(0, panelx)) });

    }

    render() {
        if (this.state.notStarted) {
            return (
                <>
                <Stage
                        width={this.state.width}
                        height={this.state.height}
                        className='pong-stage-notstarted'
                        id='pong stage'
                    >
                        <Layer>
                            <Rect width={this.state.width} height={this.state.height} stroke="black" fill="black"></Rect>
                            <Text
                                x={200}
                                y={200}
                                text={`Press`}
                                fontFamily='Calibri'
                                fill='white'
                                fontSize={30}
                            ></Text>
                            <Text
                                x={275}
                                y={200}
                                text={`go`}
                                fontFamily='Calibri'
                                fill={this.state.goMouseEnter ? 'rgb(142, 228, 213)':'white'}
                                fontSize={30}
                                onClick={
                                    ()=>{this.setState({notStarted:false})}
                                }
                                onMouseEnter={
                                    ()=>{this.setState({goMouseEnter:true})}
                                }
                                onMouseLeave={
                                    ()=>{this.setState({goMouseEnter:false})}
                                }
                            ></Text>
                            <Text
                                x={315}
                                y={200}
                                text={`to start.`}
                                fontFamily='Calibri'
                                fill='white'
                                fontSize={30}
                            ></Text>
                        </Layer>
                        
                    </Stage>
                    <div class="pongDescription">
                        <h4 style={{ marginTop: "0px", marginLeft: "650px", "text-align": "left", fontFamily: "monospace" }}>
                            <br /><br /><br /><br />
                            This is a simple illustration of Reinforcement Learning, "Apporixmate Q Learning" specifically.<br/><br/>
                            
                            Our agent is given "vision" to current distance from the panel to the ball, distance from the
                            ball to the nearest dot, and the number of dots remaining. The agent may try some random moves initially,
                            and get "rewards"(positive score) and "punishments"(negative score) when eating the dots and dying.<br/><br/>

                            After some trials, our agent would appear to know that bouncing the ball back would eventually lead it to "rewards", 
                            and manage to do that to finally win the game (eating all 5 dots).
                        </h4>
                    </div>
                    </>
            );
        }
        let { "min_dis_to_dot": w1,
            "dis_to_panel": w2,
            "num_dots": w3 } = this.state.agent.weights;
        if (!this.notStarted && this.state.score !== 500 && !this.state.finished) {
            setTimeout(() => {
                let agent = this.state.agent;
                if (this.state.gameCount > 10) agent.training = false;
                const state = this.getState();
                const action = agent.getAction(state);
                const curScore = this.state.score;
                const curGameCount = this.state.gameCount;

                this.updateBall();
                this.updateDots();
                this.updatePanel(action);

                const nextState = this.getState();
                const reward = 10 + this.state.score - curScore + (-1000) * (this.state.gameCount - curGameCount);
                agent.update(state, action, nextState, reward);

                if (this.state.score === 500) {
                    this.setState({ finished: true });
                }
                this.state.framecount += 1;

            }, 10 * this.state.framecount);
            if (!isNaN(w1) && !this.state.finished) {
                this.state.storedWeights = {
                    "min_dis_to_dot": w1,
                    "dis_to_panel": w2,
                    "num_dots": w3
                };
            }
        }
        const { x, y } = this.state;
        const dots = this.state.dots;


        if (this.state.finished) {
            let { "min_dis_to_dot": w1,
                "dis_to_panel": w2,
                "num_dots": w3 } = this.state.storedWeights;
            if (this.state.rendering) {
                this.props.setVisualizerRendering(false);
                this.state.rendering = false;
            }
            return (
                <>
                    <Stage
                        width={this.state.width}
                        height={this.state.height}
                        className='pong-stage'
                        id='pong stage'
                    >
                        <Layer>
                            <Rect width={this.state.width} height={this.state.height} stroke="black" fill="black"></Rect>
                            <Text
                                x={250}
                                y={200}
                                text={`Win!`}
                                fontFamily='Calibri'
                                fill='white'
                                fontSize={50}
                            ></Text>
                        </Layer>
                    </Stage>
                    <div>
                        <h4 style={{ marginTop: "0px", marginLeft: "700px", "text-align": "left", fontFamily: "monospace" }}>
                            <br /><br /><br /><br />
                            {"Your agent's weights:"}<br />
                            <div class="w-text">
                                <p >{`w1: min distance to dot:`}<br /><p class="num">{w1}</p></p>
                                <p>{`w2: distance to between the ball and the panel:`}<br /><p class="num">{w2}</p></p>
                                <p>{`w3: number of dots remaining:`}<br /><p class="num">{w3}</p></p></div>
                        </h4>
                    </div></>
            );
        }

        return (
            <>
                <div>
                    <Stage
                        width={this.state.width}
                        height={this.state.height}
                        className='pong-stage'
                        id='pong stage'
                    >
                        <Layer>
                            <Rect width={this.state.width} height={this.state.height} stroke="black" fill="black"></Rect>

                            {dots.map((dot, dotId) => {
                                return (
                                    <Circle
                                        key={dotId}
                                        x={dot["x"]}
                                        y={dot["y"]}
                                        stroke={'white'}
                                        fill={"white"}
                                        radius={5}
                                    ></Circle>)
                            })
                            }
                            <Circle
                                x={x}
                                y={y}
                                radius={this.state.r}
                                stroke={'white'}
                                fill={"white"}>
                            </Circle>
                            <Rect x={this.state.panelx} y={this.state.panely} width={100} height={10} stroke={'white'}
                                fill={"white"}></Rect>
                            <Text
                                x={10}
                                y={15}
                                text={`Score: ${this.state.score}`}
                                fontFamily='Calibri'
                                fill='white'
                                fontSize={25}
                            ></Text>
                        </Layer>
                    </Stage></div>
                <div>
                    <h4 style={{
                        marginTop: "0px", marginLeft: "700px", "text-align": "left", fontFamily: "monospace", fontSize: "25px"
                    }}>
                        <br /><br /><br /><br />
                        {"Your agent's weights:"}<br />
                        <div class="w-text">
                            <p >{`w1: min distance to dot:`}<br /><p class="num">{w1}</p></p>
                            <p>{`w2: distance to between the ball and the panel:`}<br /><p class="num">{w2}</p></p>
                            <p>{`w3: number of dots remaining:`}<br /><p class="num">{w3}</p></p></div>
                    </h4>
                </div>
            </>
        )
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(a, b) {
    let { x: ax, y: ay } = a;
    let { x: bx, y: by } = b;
    return Math.sqrt(((ax - bx) * (ax - bx) + (ay - by) * (ay - by)));
}