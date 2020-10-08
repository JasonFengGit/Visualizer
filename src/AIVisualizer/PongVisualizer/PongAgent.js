/**
 * @param {*} p 
 * @returns true at a probability of p
 */
function flipCoin(p) {
    return Math.random() < p;
}

/**
 * @param {*} a 
 * @param {*} b 
 * @returns Euclidean distance between a and b
 */
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

    /**
     * @param {*} state 
     * @param {*} action 
     * @returns the features at the state after taking the action
     */
    getFeatures(state, action) {
        let { dots, x, y, px, vx, vy, terminal } = state;
        px = px + this.getMove(action) + 50;
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

    /**
     * @param {*} state 
     * @param {*} action 
     * @returns the Q value of the state after taking the action
     */
    getQ(state, action) {
        if (!state) {
            return 0;
        }
        let result = 0;
        const features = this.getFeatures(state, action);
        for (const feature of this.featureList) {
            result += this.weights[feature] * features[feature];
        }
        return result;
    }

    /**
     * update weights based on rewards.
     * @param {*} state 
     * @param {*} action 
     * @param {*} nextState 
     * @param {*} reward 
     */
    update(state, action, nextState, reward) {
        if (!action) {
            return;
        }
        const features = this.getFeatures(state, action)
        const diff = reward + this.discount * this.getValue(nextState) - this.getQ(state, action);
        
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

    /**
     * choose the "best" action at a probability of (1-epsilon) and a random action at a probability of (epsilon)
     * @param {*} state 
     * @returns selected action
     */
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

    /**
     * @param {*} state 
     * @returns the action with maximum utility
     */
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