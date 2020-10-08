import React, { Component } from 'react';
import SnakeNode from './SnakeNode/SnakeNode';

// under construction


export default class NNSnakeVisualizer extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            numRows: 30,
            numCols: 30,
            snake: [{row: 15, col: 15, type: "snake"}, {row: 16, col: 15, type: "snake"}, {row: 17, col: 15, type: "snake"}],
            direction: {dr: 1, dc: 0},
            foodPos: null,
            foodScore: 0,
        }
    }

    randomFood(){
        let randomRow = randomInt(this.state.numRows);
        let randomCol = randomInt(this.state.numCols);
        return {randomRow, randomCol};
    }

    setFoodClassName(row, col){
        let nextFood = document.getElementById(`snakeNode-${row}-${col}`);
        if(nextFood) nextFood.className = `snakeNode-food`;
    }

    componentDidMount(){
        // node: null, snake, food
        let grid = [];
        
        for(let row = 0; row < this.state.numRows; row++){
            let line = [];
            for(let col = 0; col < this.state.numCols; col++){
                let n = {row: row, col: col, type: "null"};
                line.push(n);
            }
            grid.push(line);
        }
        this.showSnake(grid, this.state.snake);
        this.setState({grid: grid});
    }

    componentDidUpdate(){
        let grid = this.state.grid.map((a) => a.slice());
        let {snake, lastNode} = this.updateSnake();
        let food;
        let score = this.state.foodScore;
        if(this.checkFoodEaten(snake)){
            food = this.randomFood();
            score++;
            snake.push(lastNode);
        }
        this.update(grid, snake, food, score);
    }

    render(){
        let grid = this.state.grid;
        return(
            <div className="snakeGrid" style={{marginTop: "5%", marginLeft: "-65%"}}>
                    {grid.map((row, rowId) => {
                        return (
                            <div key={rowId}>
                                {row.map((node, nodeId) => {
                                    
                                    const { row, col, type } = node;
                                    
                                    return (
                                        <SnakeNode
                                            key={nodeId}
                                            row={row}
                                            col={col}
                                            type={type}
                                        ></SnakeNode>
                                    )
                                })
                                }
                            </div>
                        );
                    })
                    }
                </div>
        );
    }
}

function randomInt(num) {
    return Math.floor(Math.random() * num);
}