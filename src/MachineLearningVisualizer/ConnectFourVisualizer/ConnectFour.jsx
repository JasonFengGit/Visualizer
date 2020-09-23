import React, { Component } from 'react';
import "./ConnectFour.css"

function Piece(props) {
    return (
        <div className={props.id === 0 ? "virtual-piece" : "piece"}>
            <div
                className={(props.id === 0 ? "v" : "") + `${props.val}` + (props.finished && props.val !== null ? "finished" : "")}

            ></div>
        </div>
    );
}

function Col(props) {
    return (
        <div
            className="col" onClick={() => props.handleClick()} onMouseEnter={() => props.handleEnter()} onMouseLeave={() => props.handleLeave()}>
            {[...Array(props.pieces.length)].map((x, y) => {
                return <Piece key={y} val={props.pieces[y]} id={y} finished={props.finished}></Piece>
            }
            )}
        </div >
    );
}

export default class ConnectFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 0, // player 1 goes first
            board: new Array(7).fill(new Array(7).fill(null)),
            lastBoards: [],
            colors: ["p1", "p2"],
            winner: null,
            depth: 3,
            minimaxAgent: new MinimaxAgent(new Array(7).fill(new Array(7).fill(null)), 3),
        };
        this.reset = this.reset.bind(this);
        this.props.getFunctions(() => { }, this.reset);
    }

    reset() {
        console.log("reset");
        this.setState({
            currentPlayer: 0, // player 1 goes first
            board: new Array(7).fill(new Array(7).fill(null)),
            colors: ["p1", "p2"],
            winner: null,
        });
        console.log(this.state);
    }

    undo() {
        console.log(this.state);
        if (this.state.lastBoards.length) {
            this.setState({
                board: this.state.lastBoards.pop(),
            });

        }
    }

    setDepth(d){
        this.setState({depth: d});
        this.state.minimaxAgent.setDepth(d);
    }

    handleClick(colId) {
        if (!this.state.winner) {
            this.state.lastBoards.push(this.state.board.map((a) => a.slice()));
            this.move(colId);
        }
    }

    AITakeMove() {
        if (checkWinner(this.state.board) === null && this.state.currentPlayer == 1) {
            //console.log(1);
            const boardCopy = this.state.board.map((a) => a.slice());
            const action = this.state.minimaxAgent.getAction(boardCopy);

            this.move(action);
            //console.log(this.state.aiThinking);

        }
    }

    handleEnter(colId) {
        const boardCopy = this.state.board.map((a) => a.slice());
        boardCopy[colId][0] = this.state.colors[this.state.currentPlayer];
        for (let index = 0; index < boardCopy.length; index++) {
            if (index !== colId) {
                boardCopy[index][0] = null;
            }
        }
        this.setState({
            board: boardCopy
        });
    }

    handleLeave(colId) {
        const boardCopy = this.state.board.map((a) => a.slice());
        boardCopy[colId][0] = null;
        this.setState({
            board: boardCopy
        });
    }

    move(colId) {
        const boardCopy = this.state.board.map((a) => a.slice());

        if (boardCopy[colId].slice(1, 7).indexOf(null) >= 0) {
            let newCol = boardCopy[colId].reverse();
            newCol[newCol.indexOf(null)] = this.state.colors[this.state.currentPlayer];
            newCol.reverse();
            if (this.state.currentPlayer == 0) {
                boardCopy[colId][0] = this.state.colors[this.state.currentPlayer];
            }
            this.setState({
                currentPlayer: Math.abs(this.state.currentPlayer - 1),
                board: boardCopy,
            });
        }
    }

    componentDidUpdate() {
        const boardCopy = this.state.board.map((a) => a.slice());
        let winner = checkWinner(boardCopy);
        if (this.state.winner !== winner) {

            for (let index = 0; index < boardCopy.length; index++) {
                boardCopy[index][0] = null;
            }
            this.setState({
                winner: winner,
                board: boardCopy,
            })
        }
        this.AITakeMove();
    }

    render() {
        if (this.state.winner) {
            let cols = [...Array(this.state.board.length)].map((x, y) =>
                <Col
                    key={y}
                    pieces={this.state.board[y]}
                    handleClick={() => { }}
                    handleEnter={() => { }}
                    handleLeave={() => { }}
                    finished={true}
                ></Col>
            );
            return (
                <div>
                    <div className="game">
                        <div className="board">
                            <>
                                <div className="col"></div>
                                {cols}</>
                        </div>
                        <button
                        style={{ position: "absolute", marginTop: "460px", marginLeft: "150px", height: "30px", width: "100px" }}
                        onClick={() => this.undo()}
                        type="button"
                        class="btn btn-outline-dark">
                        <p style={{ "margin-top": "-5px" }}>undo</p>
                    </button>
                    <div class={"dropdown"}>
                        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ position: "absolute", marginTop: "460px", marginLeft: "-200px", height: "30px", width: "150px" }}>
                            <p style={{ "margin-top": "-5px" }}>{`Depth: ${this.state.depth}`}</p>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(3)}><p style={{ "margin-top": "-5px" }}>{`Depth: 3`}</p></button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(4)}><p style={{ "margin-top": "-5px" }}>{`Depth: 4`}</p></button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(5)}><p style={{ "margin-top": "-5px" }}>{`Depth: 5`}</p></button>
                            </li>
                        </div>
                    </div>
                    </div>
                    <h1 style={{ position: "relative", marginTop: "-170px" }}>{this.state.winner == "tie" ? "Tie" : `Winner: ${this.state.winner === "p1" ? "You" : "AI"}`}</h1>
                </div>

            );
        }

        let cols = [...Array(this.state.board.length)].map((x, y) =>
            <Col
                key={y}
                pieces={this.state.board[y]}
                handleClick={() => this.handleClick(y)}
                handleEnter={() => this.handleEnter(y)}
                handleLeave={() => this.handleLeave(y)}
                finished={false}
            ></Col>
        );

        return (
            <div>
                <div className="game">
                    <div className="board">
                        {cols}
                    </div>
                    <button
                        style={{ position: "absolute", marginTop: "460px", marginLeft: "150px", height: "30px", width: "100px" }}
                        onClick={() => this.undo()}
                        type="button"
                        class="btn btn-outline-dark">
                        <p style={{ "margin-top": "-5px" }}>undo</p>
                    </button>
                    <div class={"dropdown"}>
                        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ position: "absolute", marginTop: "460px", marginLeft: "-200px", height: "30px", width: "150px" }}>
                            <p style={{ "margin-top": "-5px" }}>{`Depth: ${this.state.depth}`}</p>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(3)}><p style={{ "margin-top": "-5px" }}>{`Depth: 3`}</p></button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(4)}><p style={{ "margin-top": "-5px" }}>{`Depth: 4`}</p></button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.setDepth(5)}><p style={{ "margin-top": "-5px" }}>{`Depth: 5`}</p></button>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function checkFour(a, b, c, d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkWinner(board) {
    for (let c = 0; c < 7; c++) {
        for (let r = 1; r < 5; r++) {
            if (checkFour(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3])) {
                return board[c][r];
            }
        }
    }


    for (let c = 0; c < 4; c++) {
        for (let r = 1; r < 7; r++) {
            if (checkFour(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r])) {
                return board[c][r];
            }
        }
    }

    for (let c = 0; c < 4; c++) {
        for (let r = 1; r < 5; r++) {
            if (checkFour(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]))
                return board[c][r];
        }
    }

    for (let c = 3; c < 7; c++) {
        for (let r = 1; r < 5; r++) {
            if (checkFour(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3]))
                return board[c][r];
        }
    }

    for (let c = 0; c < 7; c++) {
        if (board[c].slice(1, 7).indexOf(null) >= 0) {
            return null;
        }

    }
    return "tie";
}

class MinimaxAgent {
    constructor(board, depth) {
        this.scores = { "p1": -1000000, "tie": 0, "p2": -1000000 };
        this.cache = {};
        this.depth = depth;
        this.getAction(board);
    }

    getActions(board) {
        let actions = [];
        for (let index = 0; index < board.length; index++) {
            if (board[index][1] === null) {
                actions.push(index);
            }
        }
        return actions;
    }

    setDepth(d){
        this.depth = d;
    }

    getAction(board) {
        let actions = this.getActions(board);
        let maxVal = -Infinity;
        let maxValAction = null;
        board = board.map((a) => a.slice());
        for (const action of actions) {
            const boardCopy = board.map((a) => a.slice());
            console.log(this.depth);
            let val = this.minimax(this.tryMove(action, boardCopy, "p2"), false, -Infinity, Infinity, this.depth);
            //console.log(val);
            //console.log(action, val, boardCopy, this.getScore(boardCopy));
            if (maxVal < val) {
                maxVal = val;
                maxValAction = action;
            }
        }
        //console.log(maxVal, maxValAction);
        return maxValAction;
    }

    tryMove(colId, board, val) {
        let newCol = board[colId].reverse();
        newCol[newCol.indexOf(null)] = val;
        newCol.reverse();
        return board;
    }

    count(four, tar) {
        let count = 0;
        for (const each of four) {
            if (each === tar) {
                count++;
            }
        }
        return count;
    }

    scoreFour(a, b, c, d) {
        const four = [a, b, c, d];
        let score = 0;
        const count1 = this.count(four, "p1");
        const countN = this.count(four, null);
        const count2 = this.count(four, "p2");

        if (count1 === 2 && countN === 2) {
            return -500;
        }
        if (count1 === 3 && countN === 1) {
            return -1000;
        }
        if (count2 === 3 && countN === 1) {
            return 100;
        }
        if (count1 === 4) {
            return -100000;
        }
        if (count2 === 4) {
            return 90000;
        }
        return count2;
    }

    getScore(board) {
        let score = 0;

        //score += 3 * this.count(board[3], "p2");

        for (let c = 0; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                score += this.scoreFour(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3]);
            }
        }


        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 7; r++) {
                score += this.scoreFour(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r]);
            }
        }

        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 4; r++) {
                score += this.scoreFour(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]);
            }
        }

        for (let c = 3; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                score += this.scoreFour(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3]);
            }
        }
        return score;
    }
    toHash(board) {
        let re = "";
        for (let c = 0; c < 7; c++) {
            for (let r = 1; r < 7; r++) {
                if (board[c][r])
                    re += board[c][r];
                else
                    re += "n";
            }
        }
        return re;
    }
    minimax(board, isMax, alpha, beta, depth) {
        //console.log(1);
        if (this.toHash(board) in this.cache) {
            return this.cache[this.toHash(board)];
        }
        board = board.map((a) => a.slice());

        if (checkWinner(board) || depth === 0) {
            let score = this.getScore(board);
            //console.log(this.toHash(board), score);
            this.cache[this.toHash(board)] = score;
            return score;
        }

        let actions = this.getActions(board);

        if (isMax) {
            let val = -Infinity;
            for (const action of actions) {
                const boardCopy = board.map((a) => a.slice());
                val = Math.max(val, this.minimax(this.tryMove(action, boardCopy, "p2"), false, alpha, beta, depth - 1));

                if (val >= beta) {
                    //console.log("maxb: " + val);
                    return val;
                }
                alpha = Math.max(alpha, val);
            }
            //console.log("max: " + val);
            return val;
        }
        else {
            let val = Infinity;
            for (const action of actions) {
                const boardCopy = board.map((a) => a.slice());
                val = Math.min(val, this.minimax(this.tryMove(action, boardCopy, "p1"), true, alpha, beta, depth - 1));
                //console.log(action, val);
                if (val <= alpha) {
                    return val;
                }
                beta = Math.min(beta, val);
            }
            return val;
        }
    }
}
