import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getShortestPath } from '../Algorithm/dijk';
import './PathFindingVisualizer.css';

export default class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            FR: 5,
            FC: 25,
            mouseIsPressed: false,
            changingStart: false,
            changingFinish: false,
            visualized: false,
            rendering: false,
            numRow: 15,
            numCol: 30,
            SR: 5,
            SC: 5,
        };
        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
        this.clearVisualizer = this.clearVisualizer.bind(this);
        this.props.getFunctions(this.visualizeDijkstra, this.clearVisualizer);
    }
    isRendering() {
        return this.state.rendering;
    }
    componentDidMount() {
        const grid = this.initializeGrid(false);
        console.log(grid);
        this.setState({
            grid: grid,
        })
        this.state.grid = grid;
        console.log(this);
    }

    initializeGrid(clearWall) {
        const grid = [];
        for (let row = 0; row < this.state.numRow; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.numCol; col++) {
                let isW = false;
                const element = document.getElementById(`node-${row}-${col}`);
                if (element && (element.className === 'node node-path' || element.className === 'node node-visited')) {
                    element.className = 'node';
                }
                if (!clearWall && element && element.className === 'node node-wall') {
                    isW = true;
                }
                currentRow.push(this.createNode(row, col, isW));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createNode(row, col, isW) {
        return {
            col,
            row,
            isStart: row === this.state.SR && col === this.state.SC,
            isFinish: row === this.state.FR && col === this.state.FC,
            distance: Infinity,
            isVisited: false,
            isWall: isW,
            previousNode: null,
        };
    }

    handleMouseDown(row, col) {
        if (!this.state.visualized && row === this.state.SR && col === this.state.SC) {
            this.setState({ changingStart: true });
        }
        else if (!this.state.visualized && row === this.state.FR && col === this.state.FC) {
            this.setState({ changingFinish: true });
        }
        else if (!this.state.rendering) {
            this.updateGridWithWall(this.state.grid, row, col);
            this.setState({ mouseIsPressed: true });
        }
    }

    handleMouseEnter(row, col) {
        if (this.state.changingStart && !(row === this.state.FR && col === this.state.FC)) {
            const start = document.getElementById(`node-${this.state.SR}-${this.state.SC}`);
            if (start) {
                start.className = 'node';
                start.isStart = false;
                this.state.grid[this.state.SR][this.state.SC].isStart = false;
            }
            const newStart = document.getElementById(`node-${row}-${col}`);
            if (newStart) {
                newStart.isStart = true;
                newStart.className = 'node node-start';
                this.state.grid[row][col].isStart = true;
            }
            if (start && newStart) {
                this.setState({ SR: row, SC: col });
                //console.log(11, row, col, this.state.SR, this.state.SC);
                //this.setState({ SR: row, SC: col });
                //console.log(11, row, col, this.state.SR, this.state.SC);
            }

        }
        else if (this.state.changingFinish && !(row === this.state.SR && col === this.state.SC)) {
            const finish = document.getElementById(`node-${this.state.FR}-${this.state.FC}`);
            if (finish) {
                finish.className = 'node';
                finish.isFinish = false;
                this.state.grid[this.state.FR][this.state.FC].isFinish = false;
            }
            const newFinish = document.getElementById(`node-${row}-${col}`);
            if (newFinish) {
                newFinish.isFinish = true;
                newFinish.className = 'node node-finish';
                this.state.grid[row][col].isFinish = true;
            }
            this.setState({ FR: row, FC: col });
        }
        else if (this.state.mouseIsPressed) {
            this.updateGridWithWall(this.state.grid, row, col);
            this.setState({ mouseIsPressed: true });
        }
    }

    handleMouseUp() {
        this.setState({
            changingStart: false,
            changingFinish: false,
            mouseIsPressed: false
        });
    }

    updateGridWithWall(grid, row, col) {
        const node = grid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        grid[row][col] = newNode;
    }

    visualizeDijkstra() {
        if (this.state.rendering) return;
        this.setState({ visualized: true, rendering: true });
        this.props.setVisualizerRendering(true);
        this.componentDidMount();
        console.log(this);
        const grid = this.state.grid;
        const start = grid[this.state.SR][this.state.SC];
        const finish = grid[this.state.FR][this.state.FC];
        const visitedInOrder = dijkstra(grid, start, finish);
        const shortedPath = getShortestPath(finish);

        for (let i = 0; i < visitedInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedInOrder[i];
                if (!node.isStart && !node.isFinish)
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 7 * i);
        }

        for (let i = 0; i < shortedPath.length; i++) {
            setTimeout(() => {
                const node = shortedPath[i];
                if (!node.isStart && !node.isFinish)
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, 7 * visitedInOrder.length + 50 * i);

        }
        setTimeout(() => {
            this.setState({ rendering: false });
            this.props.setVisualizerRendering(false);
        }, 7 * visitedInOrder.length + 50 * shortedPath.length);

    }

    clearVisualizer() {
        if (!this.state.rendering)
            this.setState({ grid: this.initializeGrid(true), visualized: false });

    }

    render() {

        const grid = this.state.grid;

        return (
            <>
                {/*
                <button
                    onClick={() => { this.visualizeDijkstra() }}
                    type="button" class="btn btn-outline-dark"
                    disabled={this.state.rendering}>
                    visualize
                </button>
                <button
                    onClick={() => this.clearVisualizer()}
                    type="button" class="btn btn-outline-dark"
                    disabled={this.state.rendering}>
                    clear
            </button>*/}

                <div className="grid">
                    {grid.map((row, rowId) => {
                        return (
                            <div key={rowId}>
                                {row.map((node, nodeId) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeId}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={this.state.mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                        ></Node>
                                    )
                                })
                                }
                            </div>
                        );
                    })
                    }
                </div>
            </>
        )
    }
}