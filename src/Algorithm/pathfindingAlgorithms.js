
function dijkstra(grid, start, finish) {
    const visitedInOrder = [];
    start.distance = 0;
    const unvisited = allNodes(grid);
    while (unvisited.length) {
        sortNodes(unvisited);
        const closest = unvisited.shift();
        if (closest === finish) {
            return visitedInOrder;
        }
        if (closest.isWall) continue;
        if (closest.distance === Infinity) return visitedInOrder;
        closest.isVisited = true;
        visitedInOrder.push(closest);

        updateUnvisitedNeighbors(closest, grid);
    }
    return visitedInOrder;
}

function DFS(grid, start, finish) {
    const visitedInOrder = [];
    let unvisited = [];
    unvisited.push(start);
    while (unvisited.length) {
        const node = unvisited.pop();
        if (node === finish) {
            return visitedInOrder;
        }
        if (node.isWall) continue;
        node.isVisited = true;
        visitedInOrder.push(node);

        unvisited = unvisited.concat(getUNeighbors(node, grid));
    }

    return visitedInOrder;
}

function BFS(grid, start, finish) {
    const visitedInOrder = [];
    let unvisited = [];
    unvisited.push(start);
    while (unvisited.length) {
        const node = unvisited.shift();
        if (node === finish) {
            return visitedInOrder;
        }
        if (node.isWall) continue;
        node.isVisited = true;
        visitedInOrder.push(node);

        unvisited = unvisited.concat(getUNeighbors(node, grid));
    }

    return visitedInOrder;
}

function getUNeighbors(node, grid) {
    const neighbors = [];
    const reN = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (col > 0) neighbors.push(grid[row][col - 1]);

    for (let index = 0; index < neighbors.length; index++) {
        const neighbor = neighbors[index];
        if (!neighbor.isVisited) {
            neighbor.previousNode = node;
            neighbor.isVisited = true;
            reN.push(neighbor);
        }
    }
    return reN;

}

function AStar(grid, start, finish) {
    const visitedInOrder = [];
    start.distance = 0;
    start.heuristic = 0;
    const unvisited = allNodes(grid);
    while (unvisited.length) {
        sortNodesStar(unvisited);
        const cur = unvisited.shift();
        if (cur === finish) {
            return visitedInOrder;
        }
        if (cur.isWall) continue;
        if (cur.distance + cur.heuristic === Infinity) return visitedInOrder;
        cur.isVisited = true;
        visitedInOrder.push(cur);

        updateUnvisitedNeighborsStar(cur, grid, finish);
    }
    return visitedInOrder;
}

function updateUnvisitedNeighborsStar(cur, grid, finish) {
    const neighbors = [];
    const { row, col } = cur;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            neighbor.distance = cur.distance + 1;
            neighbor.heuristic = manhattanDistance(neighbor, finish);
            neighbor.previousNode = cur;
        }
    }
}

function manhattanDistance(a, b) {
    let { row: ar, col: ac } = a;
    let { row: br, col: bc } = b;
    return Math.abs(ar - br) + Math.abs(ac - bc);
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

function sortNodesStar(nodes) {
    nodes.sort((a, b) => (a.distance + a.heuristic) - (b.distance + b.heuristic));
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

function makeWall(grid, row, col, isW) {
    const node = grid[row][col];
    const newNode = {
        ...node,
        isWall: isW,
    }
    grid[row][col] = newNode;
}

export { dijkstra, BFS, DFS, AStar, getShortestPath, primMaze };