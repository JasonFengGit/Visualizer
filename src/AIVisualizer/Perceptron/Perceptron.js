class Perceptron {
    constructor(n, alpha) {
        this.weights = new Array(n);
        
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }
        this.alpha = alpha;
    }

    /**
     * train the perceptron, adjust weights based on error
     * @param {*} inputs 
     * @param {*} desired 
     */
    train(inputs, desired) {
        let guess = this.feedforward(inputs);
        
        let error = desired - guess;

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += this.alpha * error * inputs[i];
        }
    }

    /**
     * @param {*} inputs 
     * @returns the predicted result
     */
    feedforward(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return this.activate(sum);
        
    }

    activate(sum) {
        return sum > 0 ? 1 : -1;
    }

    getWeights() {
        return this.weights;
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

export {Perceptron, random};