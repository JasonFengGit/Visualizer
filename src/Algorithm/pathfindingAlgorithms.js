import { createPortal } from "react-dom";

function dijkstra(grid, start, finish) {
    const visitedInOrder = [];
    start.distance = 0;
    const univisited = allNodes(grid);
    while (univisited.length) {
        sortNodes(univisited);
        const closest = univisited.shift();
        if (closest.isWall) continue;
        if (closest.distance === Infinity) return visitedInOrder;
        closest.isVisited = true;
        visitedInOrder.push(closest);
        if (closest === finish) return visitedInOrder;
        updateUnvisitedNeighbors(closest, grid);
    }
    return visitedInOrder;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function deepCopy(maze) {
    let cMaze = [];
    for (let row = 0; row < maze.length; row++) {
        cMaze.push(maze[row].slice());
    }
    return cMaze;
}

function primMaze(grid) {
    let sr = 7, sc = 17; // set a starting point for generating maze
    let height = grid.length, width = grid[0].length;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            makeWall(grid, i, j, false);
        }

    }
    for (let i = 0; i < height; i++) {
        for (let j = i % 2 + 1; j < width; j += i % 2 + 1) {
            makeWall(grid, i, j, true);
        }
    }
    for (let i = 0; i < height; i++) {
        makeWall(grid, i, 0, true);
    }
    let visited = [];
    let path = [{ row: sr, col: sc }];
    let count = 0;
    console.log(sr, sc, path.slice());
    while (path.length > 0) {
        const index = randomSelect(path);
        const node = path[index];
        path.splice(index, 1);
        visited = visited.concat([node]);
        const { c: connected, u: unconnected } = getNeighbors(grid, visited, node);
        if (connected.length > 0) {
            let rn = randomSelect(connected);
            connect(grid, node, connected[rn]);
            connected.splice(rn);
        }
        path = path.concat(unconnected);

        count++;
    }
}

function randomSelect(path) {
    return randomInt(0, path.length - 1);
}

function validate(grid, points) {
    let height = grid.length, width = grid[0].length;
    let pRe = [];
    for (let index = 0; index < points.length; index++) {
        let { row, col } = points[index];
        if ((0 <= row && row < height && 0 <= col && col < width)) {
            pRe.push(points[index]);
        }
    }
    return pRe;

}

function isVisited(visited, node) {
    let { row: nr, col: nc } = node;
    for (let index = 0; index < visited.length; index++) {
        let { row: ir, col: ic } = visited[index];
        if (nr === ir && nc === ic) {
            return true;
        }
    }
    return false;
}

function getNeighbors(grid, visited, node) {
    let { row, col } = node;
    let neighbors = [{ row: row + 2, col: col }, { row: row - 2, col: col }, { row: row, col: col + 2 }, { row: row, col: col - 2 }];
    neighbors = validate(grid, neighbors.slice());
    let connected = [];
    let unconnected = [];
    neighbors.forEach(neighbor => {
        if (isVisited(visited, neighbor)) {
            connected.push(neighbor);
        }
        else {
            unconnected.push(neighbor);
        }
    });
    return { c: connected, u: unconnected };
}

function connect(grid, a, b) {
    let { row: ar, col: ac } = a;
    let { row: br, col: bc } = b;
    let row = (ar + br) / 2;
    let col = (ac + bc) / 2;
    makeWall(grid, row, col, false);
}

function recursiveDivisionMaze(grid) {
    let height = grid.length, width = grid[0].length;

    recursiveDivision(grid, width, height, 0, 0, 0);

}


function makeWall(grid, row, col, isW) {
    const node = grid[row][col];
    const newNode = {
        ...node,
        isWall: isW,
    }
    grid[row][col] = newNode;
}

function buildWall(grid, width, height, xo, yo, wallId, horizontal) {
    if (horizontal) {
        for (let i = xo + 1; i < width - 1; i++) {
            makeWall(grid, wallId, i, true);
        }
    }
    else {
        for (let i = yo + 1; i < height - 1; i++) {
            makeWall(grid, i, wallId, true);
        }
    }
}

function recursiveDivision(grid, width, height, xo, yo, count) {
    if (width - xo < 2 || height - yo < 2) {
        return;
    }
    let horizontal = randomInt(0, 1) == 0;
    let wallId = randomInt(horizontal ? yo : xo, horizontal ? height - 1 : width - 1);
    console.log(horizontal, wallId, width, height);
    buildWall(grid, width, height, xo, yo, wallId, horizontal);

    let pathId = randomInt(!horizontal ? yo : xo, !horizontal ? height - 1 : width - 1);

    if (horizontal) {
        makeWall(grid, wallId, pathId, false);
        recursiveDivision(grid, width, wallId - 1, xo, yo, count + 1);
        recursiveDivision(grid, width, height, xo, wallId, count + 1);
    }
    else {
        makeWall(grid, pathId, wallId, false);
        recursiveDivision(grid, wallId - 1, height, xo, yo, count + 1);
        recursiveDivision(grid, width, height, wallId, yo, count + 1);
    }
}

function DFS(grid, start, finsish) {

}

function BFS(grid, start, finish) {
    return;
}

function AStar(grid, start, finish) {
    return;
}

function allNodes(grid) {
    const re = [];
    for (const row of grid) {
        for (const node of row) {
            re.push(node);
        }
    }
    return re;
}

function sortNodes(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(closest, grid) {
    const neighbors = [];
    const { row, col } = closest;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            neighbor.distance = closest.distance + 1;
            neighbor.previousNode = closest;
        }
    }
}

function getShortestPath(finish) {
    const path = [];
    let cur = finish;
    while (cur !== null) {
        path.unshift(cur);
        cur = cur.previousNode;
    }
    return path;
}

export { dijkstra, BFS, DFS, AStar, getShortestPath, recursiveDivisionMaze, primMaze };