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
        //console.log(this.depth, this.humanPiece);
        //this.getAction(board);
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
            if (maxVal == val && action === 3){
                maxValAction = action;
            }
            console.log(action, val, maxVal, maxValAction);
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

    scoreFour(a, b, c, d) {
        const four = [a, b, c, d];
        const count1 = this.count(four, this.humanPiece);
        const countN = this.count(four, null);
        const count2 = this.count(four, this.aiPiece);

        if (count1 === 2 && countN === 2) {
            return {sc: -500, three: 0};
        }
        if (count1 === 3 && countN === 1) {
            return {sc: -1000, three: -1};
        }
        
        if (count1 === 4) {
            return {sc: -1000000, three: 0};
        }
        if (count2 === 4) {
            return {sc: 900000, three: 0};
        }

        if(count2 === 3 && countN==0){
            return {sc: 0, three: 1};
        }
        if(count1 === 3){
            return {sc: 0, three: -1};
        }
        return {sc: count2, three: 0};
        
    }

    scoreFour2(a, b, c, d) {
        const four = [a, b, c, d];
        const count1 = this.count(four, this.humanPiece);
        const countN = this.count(four, null);
        const count2 = this.count(four, this.aiPiece);
        if(countN === 4 || (count1 > 0 && count2 > 0)) return {sc:0, three:0};
        if(count1 === 4){
            return {sc: -Infinity, three: -1};
        } 
        if(count2 === 4){
            return {sc: Infinity, three: 1};
        } 
        if(count1 === 0){
            return {sc: Math.pow(10*count2, count2), three: count2 >= 3 ? 1 : 0};
        }
        if(count2 === 0){
            return {sc: -Math.pow(10*count1, count1), three: count1 >= 3 ? -1 : 0};
        }
        return {sc: 0, three: 0};
    }

    getScore(board) {
        let score = 0;
        //score += Math.pow(5 * this.count(board[3], this.aiPiece), this.count(board[3], this.aiPiece));
        let threes_one = []
        let threes_two = []
        for (let c = 0; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                let {sc:sc, three:three} = this.scoreFour2(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3]);
                score += sc;
                if(three === 1){
                    threes_two = threes_two.concat([{row:c, col:r}, {row: c, col:r+1}, {row:c, col:r+2}, {row: c, col:r+3}]);
                }
                else if(three === -1){
                    threes_one = threes_one.concat([{row:c, col:r}, {row: c, col:r+1}, {row:c, col:r+2}, {row: c, col:r+3}]);
                }
            }
        }


        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 7; r++) {
                let {sc:sc, three:three} = this.scoreFour2(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r]);
                score += sc;
                if(three === 1){
                    threes_two = threes_two.concat([{row:c, col:r}, {row: c+1, col:r}, {row:c+2, col:r}, {row: c+3, col:r}]);
                }
                else if(three === -1){
                    threes_one = threes_one.concat([{row:c, col:r}, {row: c+1, col:r}, {row:c+2, col:r}, {row: c+3, col:r}]);
                }
            }
        }

        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 4; r++) {
                let {sc:sc, three:three} = this.scoreFour2(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]);
                score += sc;
                if(three === 1){
                    threes_two = threes_two.concat([{row:c, col:r}, {row: c+1, col:r+1}, {row:c+2, col:r+2}, {row: c+3, col:r+3}]);
                    //threes_two = threes_two.concat([(c, r), (c+1, r+1), (c+2, r+2), (c+3, r+3)]);
                }
                else if(three === -1){
                    threes_one = threes_one.concat([{row:c, col:r}, {row: c+1, col:r+1}, {row:c+2, col:r+2}, {row: c+3, col:r+3}]);
                    //threes_one = threes_one.concat([(c, r), (c+1, r+1), (c+2, r+2), (c+3, r+3)]);
                }
            }
        }

        for (let c = 3; c < 7; c++) {
            for (let r = 1; r < 4; r++) {
                let {sc:sc, three:three} = this.scoreFour2(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3]);
                score += sc;
                if(three === 1){
                    threes_two = threes_two.concat([{row:c, col:r}, {row: c-1, col:r+1}, {row:c-2, col:r+2}, {row: c-3, col:r+3}]);
                    //threes_two = threes_two.concat([(c, r), (c-1, r+1), (c-2, r+2), (c-3, r+3)]);
                }
                else if(three === -1){
                    threes_one = threes_one.concat([{row:c, col:r}, {row: c-1, col:r+1}, {row:c-2, col:r+2}, {row: c-3, col:r+3}]);
                   //threes_one = threes_one.concat([(c, r), (c-1, r+1), (c-2, r+2), (c-3, r+3)]);
                }
            }
        }
        let d2 = this.numDuplicate(threes_two);
        let d1 = this.numDuplicate(threes_one);
        //console.log(d1, d2);
        //score += Math.pow(10 * d2, d2 + 2) - Math.pow(10 * d1, d1 + 2);
        return score;
    }

    numDuplicate(arr){
        //console.log(arr);
        let count = new Set();
        let result = 0;
        for (let ele of arr){
            let {row, col} = ele;
            let hash = row * 10 + col;
            if(count.has(hash)){
                result++;
            }
            else{
                count.add(hash);
            }
        }
        return result;
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