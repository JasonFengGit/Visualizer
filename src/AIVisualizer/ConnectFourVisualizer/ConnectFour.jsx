import React, { Component } from 'react';
import MinimaxAgent from './MinimaxAgent';
import "./ConnectFour.css"

/**
 * @param {*} props 
 * @returns Picec Object
 */
function Piece(props) {
    return (
        <div className={props.id === 0 ? "virtual-piece" : "piece"}>
            <div
                className={(props.id === 0 ? "v" : "") + `${props.val}` + (props.finished && props.val !== null ? "finished" : "")}
            ></div>
        </div>
    );
}

/**
 * @param {*} props 
 * @returns Col Object
 */
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

/**
 * definition of ConnectFour Class
 */
export default class ConnectFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 0,
            aiPlayer: 1,
            humanPlayer: 0,
            humanPiece: "p1",
            board: new Array(7).fill(new Array(7).fill(null)),
            lastBoards: [],
            colors: ["p1", "p2"],
            winner: null,
            depth: 4,
            minimaxAgent: new MinimaxAgent(4, 0),
        };
        this.reset = this.reset.bind(this);
        this.props.getFunctions(() => { }, this.reset);
    }

    reset() {
        this.setState({
            currentPlayer: 0,
            board: new Array(7).fill(new Array(7).fill(null)),
            lastBoards: [],
            colors: ["p1", "p2"],
            winner: null,
        });
    }

    undo() {
        if (this.state.lastBoards.length) {
            this.setState({
                board: this.state.lastBoards.pop(),
                currentPlayer: this.state.humanPlayer,
            });

        }
    }

    setStartingPlayer(player) {
        if (player === "human") {
            this.setState({
                aiPlayer: 1,
                humanPlayer: 0,
                humanPiece: "p1",
                minimaxAgent: new MinimaxAgent(this.state.depth, 0),
            });
        }
        else {
            this.setState({
                aiPlayer: 0,
                humanPlayer: 1,
                humanPiece: "p2",
                minimaxAgent: new MinimaxAgent(this.state.depth, 1),
            });
        }
        this.reset();
    }

    setDepth(d) {
        this.setState({ depth: d, minimaxAgent: new MinimaxAgent(d, this.state.humanPlayer) });
    }

    handleClick(colId) {
        if (this.state.currentPlayer === this.state.aiPlayer) return;
        if (!this.state.winner) {
            this.state.lastBoards.push(this.state.board.map((a) => a.slice()));
            this.move(colId);
        }
    }

    AITakeMove() {
        if (checkWinner(this.state.board) === null && this.state.currentPlayer === this.state.aiPlayer) {
            const boardCopy = this.state.board.map((a) => a.slice());
            const action = this.state.minimaxAgent.getAction(boardCopy);
            this.move(action);
        }
    }

    handleEnter(colId) {
        if (this.state.currentPlayer === this.state.aiPlayer) return;
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

            if (this.state.depth === 6) {
                boardCopy[colId][0] = null;
            }
            else if (this.state.currentPlayer === this.state.humanPlayer) {
                boardCopy[colId][0] = this.state.colors[this.state.currentPlayer];
            }
            this.setState({
                currentPlayer: Math.abs(this.state.currentPlayer - 1),
                board: boardCopy,
            });
        }

    }

    componentDidMount() {
        if (this.state.aiPlayer === 0) {
            this.AITakeMove();
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
        setTimeout(() => this.AITakeMove(), 200);
    }

    render() {
        let buttons =
            <>
                <button
                    style={{ position: "absolute", marginTop: "460px", marginLeft: "100px", height: "30px", width: "130px" }}
                    onClick={() => this.setStartingPlayer(this.state.aiPlayer === 1 ? "ai" : "human")}
                    type="button"
                    class="btn btn-outline-dark">
                    <p style={{ "margin-top": "-5px" }}>{`offensive: ${this.state.aiPlayer === 1 ? "you" : "ai"}`}</p>
                </button>

                <button
                    style={{ position: "absolute", marginTop: "460px", marginLeft: "240px", height: "30px", width: "100px" }}
                    onClick={() => this.undo()}
                    type="button"
                    class="btn btn-outline-dark">
                    <p style={{ "margin-top": "-5px" }}>undo</p>
                </button>
                <div class={"dropdown"}>
                    <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ position: "absolute", marginTop: "460px", marginLeft: "-130px", height: "30px", width: "130px" }}>
                        <p style={{ "margin-top": "-5px" }}>{`Depth: ${this.state.depth}`}</p>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setDepth(2)}><p style={{ "margin-top": "-5px" }}>{`Depth: 2`}</p></button>
                            <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setDepth(4)}><p style={{ "margin-top": "-5px" }}>{`Depth: 4`}</p></button>
                            <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setDepth(6)}><p style={{ "margin-top": "-5px" }}>{`Depth: 6`}</p></button>
                        </li>
                    </div>
                </div>
            </>

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
                        {buttons}
                    </div>
                    <h1 style={{ position: "relative", marginTop: "-170px" }}>{this.state.winner === "tie" ? "Tie" : `Winner: ${this.state.winner === this.state.humanPiece ? "You" : "AI"}`}</h1>
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

        if (this.state.currentPlayer === this.state.aiPlayer) {
            let loadingImg = document.getElementById("loadingImgT");
            if (loadingImg) loadingImg.className = 'loadingImgN';
        }
        else {
            let loadingImg = document.getElementById("loadingImgT");
            if (loadingImg) loadingImg.className = 'loadingImgT';

        }
        return (
            <div>
                <div className="game">
                    <div className="board">
                        {cols}
                    </div>

                    {buttons}
                    <img id="loadingImgT" className="loadingImgT" src="https://linkpicture.com/q/Double-Ring-1s-200px-2.gif" height="100px" width="100px" style={{ marginLeft: "10px", position: "absolute", zIndex: 0 }} alt></img>;
                    <div>
                        <h5 class="connectFourDes" style={{ position: "absolute", marginTop: "160px", marginLeft: "30px", textAlign: "left" }}>
                            This is a chess game known as "Connect Four", which you<br />
                            will need to connect four pieces to win (accept diagonals). <br />
                            The game has "gravity", so wherever you put the pieces, <br />
                            they would "drop" down to the bottom.<br /><br />
                            You are competing with a "Minimax" AI with alpha-beta pruning.<br />
                            Basically, it will search possible future states of the game<br />
                            and choose the action that it think is best at the current state<br />
                            each time. <br /><br />
                            It is not a perfect player for this game, so try your best to<br />
                            beat it by your "humanity"! <br /><br />
                            (Depth 6 is quite slow, please wait patiently.)
                    </h5>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 * @param {*} d 
 * @returns whether all four pieces are the same
 */
function checkFour(a, b, c, d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
}

/**
 * @param {*} board 
 * @returns the winner if there is a winner, null otherwise.
 */
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

export { checkWinner };