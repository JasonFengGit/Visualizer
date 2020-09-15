
function flipCoin(p) {
    return Math.random() < p;
}

function distance(a, b) {
    let { x: ax, y: ay } = a;
    let { x: bx, y: by } = b;
    return Math.sqrt(((ax - bx) * (ax - bx) + (ay - by) * (ay - by)));
}

class PongAgent {
    constructor(speed, discount, epsilon, alpha) {
        this.weights = {
            "min_dis_to_dot": 0,
            "dis_to_panel": 0,
            "num_dots": 0,
        };
        this.discount = discount;
        this.epsilon = epsilon;
        this.alpha = alpha;
        this.speed = speed;
        this.featureList = ["min_dis_to_dot", "dis_to_panel", "num_dots"]
    }

    getMove(action) {
        return action * this.speed;
    }

    minDisToDot(x, y, dots) {
        let minDis = Infinity;
        for (const dot of dots) {
            const d = distance({ x: x, y: y }, dot);
            if (d < minDis) {
                minDis = d;
            }
        }
        return minDis;
    }

    getFeatures(state, action) {
        let { dots: dots, x: x, y: y, px: px, vx: vx, vy: vy, terminal: terminal } = state;
        //console.log(px);
        px = px + this.getMove(action) + 50;
        //console.log(px, this.getMove(action));
        let features = {
            "min_dis_to_dot": 0,
            "dis_to_panel": 0,
            "num_dots": 0,
        };
        features["min_dis_to_dot"] = this.minDisToDot(x, y, dots) / Math.sqrt(600 * 600 + 550 * 550);
        features["dis_to_panel"] = Math.abs(x - px) / 600;
        features["num_dots"] = dots.length / 5;
        return features;
    }

    getQ(state, action) {
        if (!state) {
            return 0;
        }
        let result = 0;
        const features = this.getFeatures(state, action)
        ////
        for (const feature of this.featureList) {
            result += this.weights[feature] * features[feature];
        }
        return result;
    }

    update(state, action, nextState, reward) {
        if (!action) {
            return;
        }
        const features = this.getFeatures(state, action)
        const diff = reward + this.discount * this.getValue(nextState) - this.getQ(state, action);
        /////
        //console.log(this.weights);
        for (const feature of this.featureList) {
            this.weights[feature] += this.alpha * diff * features[feature];
        }
    }

    setWeights(weights) {
        this.weights = weights;
    }

    actions() {
        return [-1, 0, 1];
    }

    getAction(state) {
        if (state["terminal"] === true) return null;
        const curActions = this.actions();

        if (flipCoin(this.epsilon)) {
            const action = curActions[randomSelect(curActions)];
            return action;
        }
        else {
            return this.getPolicy(state);
        }

    }

    getPolicy(state) {
        const curActions = this.actions();
        let reAction = null;
        let maxQ = -Infinity;
        for (const a of curActions) {
            if (this.getQ(state, a) > maxQ) {
                maxQ = this.getQ(state, a);
                reAction = a;
            }
            else if (this.getQ(state, a) === maxQ) {
                reAction = randomSelect([a, reAction]);
            }
        }
        return reAction;
    }

    getValue(state) {
        return this.getQ(state, this.getPolicy(state));
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomSelect(path) {
    return randomInt(0, path.length - 1);
}

export default PongAgent;