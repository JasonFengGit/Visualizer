import React, { Component } from 'react';
import "./SnakeNode.css";

export default class SnakeNode extends Component {
    render() {
        const {
            row,
            col,
            type,
        } = this.props;
        return (
            <div
                id={`snakeNode-${row}-${col}`}
                className={`snakeNode-${this.props.type}`}
            >
            </div>
        );
    }
}