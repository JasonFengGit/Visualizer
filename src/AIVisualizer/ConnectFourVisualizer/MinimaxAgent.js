import {checkWinner} from './ConnectFour';

class MinimaxAgent {
    constructor(depth, humanPlayer) {
        this.depth = depth;
        if(humanPlayer === 0){
            this.aiPiece = "p2";
            this.humanPiece = "p1";
        }
        else{
            this.aiPiece = "p1";
            this.humanPiece = "p2";
        }
    }

    /**
     * @param {*} board 
     * @returns possible actions
     */
    getActions(board) {
        let actions = [];
        for (let index = 0; index < board.length; index++) {
            if (board[index][1] === null) {
                actions.push(index);
            }
        }
        return actions;
    }

    /**
     * choose the action with greatest utility based on Minimax algorithm
     * @param {*} board 
     * @returns action with greatest utility
     */
    getAction(board) {
        let actions = this.getActions(board);
        let maxVal = -Infinity;
        let maxValAction = null;
        board = board.map((a) => a.slice());
        for (const action of actions) {
            const boardCopy = board.map((a) => a.slice());
            let val = this.minimax(this.tryMove(action, boardCopy, this.aiPiece), false, -Infinity, Infinity, this.depth);
            if (maxVal < val || maxValAction === null) {
                maxVal = val;
                maxValAction = action;
            }
            if (maxVal === val && action === 3){
                maxValAction = action;
            }
            console.log(action, val);
        }
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

    /**
     * score a four-pieces line
     * @param {*} a 
     * @param {*} b 
     * @param {*} c 
     * @param {*} d 
     * @returns score
     */
    scoreFour(a, b, c, d) {
        const four = [a, b, c, d];
        const count1 = this.count(four, this.humanPiece);
        const countN = this.count(four, null);
        const count2 = this.count(four, this.aiPiece);
        if(countN === 4 || (count1 > 0 && count2 > 0)) return 0;
        if(count1 === 4){
            return -10e22;
        } 
        if(count2 === 4){
            return 10e22;
        } 
        if(count1 === 0){
            return Math.pow(10*count2, count2);
        }
        if(count2 === 0){
            return -Math.pow(10*count1, count1);
        }
        return 0;
    }

    /**
     * evaluation function, getting score by checking each possible "four in a row"
     * @param {*} board 
     * @returns score of the board
     */
    getScore(board) {
        let score = 0;
        for (let c = 0; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                let sc = this.scoreFour(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3]);
                score += sc;
            }
        }


        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 7; r++) {
                let sc = this.scoreFour(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r]);
                score += sc;
            }
        }

        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 4; r++) {
                let sc = this.scoreFour(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]);
                score += sc;
            }
        }

        for (let c = 3; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                let sc = this.scoreFour(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3]);
                score += sc;
            }
        }
        return score;
    }

    /**
     * Minimax algorithm with alpha-beta pruning
     * @param {*} board 
     * @param {*} isMax 
     * @param {*} alpha 
     * @param {*} beta 
     * @param {*} depth
     * @returns minimax utility 
     */
    minimax(board, isMax, alpha, beta, depth) {
        board = board.map((a) => a.slice());

        if (checkWinner(board) || depth === 0) {
            let score = this.getScore(board);
            return score;
        }

        let actions = this.getActions(board);

        if (isMax) {
            let val = -Infinity;
            for (const action of actions) {
                const boardCopy = board.map((a) => a.slice());
                val = Math.max(val, this.minimax(this.tryMove(action, boardCopy, this.aiPiece), false, alpha, beta, depth - 1));

                if (val >= beta) {
                    return val;
                }
                alpha = Math.max(alpha, val);
            }
            return val;
        }
        else {
            let val = Infinity;
            for (const action of actions) {
                const boardCopy = board.map((a) => a.slice());
                val = Math.min(val, this.minimax(this.tryMove(action, boardCopy, this.humanPiece), true, alpha, beta, depth - 1));
                if (val <= alpha) {
                    return val;
                }
                beta = Math.min(beta, val);
            }
            return val;
        }
    }
}

export default MinimaxAgent;