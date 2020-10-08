import React, { Component } from 'react';
import './Pile.css';

export default class Pile extends Component {
    render() {

        const {
            val,
            isChanging,
            isPivot,
            finished,
            index,
            size,
            colorSetIndex,
            changingColors = [`rgb(228, 230, 120)`, `rgb(155, 147, 229)`, `rgb(248, 250, 140)`],
            offSet = { 'small': 20, 'median': 0, 'large': 0 },
            normalColors = [`rgb(200,${(1 - val / 45) * 255 + 50 + offSet[size]}, 255)`, `rgb(250,200, ${(1 - val / 80) * 255 + offSet[size]})`, `rgb( ${(1 - val / 80) * 255 + offSet[size]},200,250)`],
        } = this.props;

        let extraClassName = '';
        if (isChanging) {
            extraClassName = '-changing';
        }
        if (finished) {
            extraClassName = '-finished';
        }
        let color = extraClassName === '-changing' ? changingColors[colorSetIndex] : normalColors[colorSetIndex];
        if (!this.props.finished && this.props.isPivot) color = 'rgb(240, 190, 149)';
        let lineOff = -20 * this.props.index;
        let heights = { 'small': 14, 'median': 10, 'large': 8 };
        let indicatorLength = { 'small': 420, 'median': 620, 'large': 820 };
        return (
            <>
                <div
                    className={'pile' + extraClassName}
                    style={{ height: `${val * heights[this.props.size]}px`, background: color }}

                >
                    <p className='value'>{val}</p>
                    {!this.props.finished && this.props.isPivot && <svg height="100" width={indicatorLength[size] + 100} style={{ position: "absolute", display: "flex", marginTop: "-31px", marginLeft: `${lineOff}px` }}>
                        <line x1="0" y1="0" x2={indicatorLength[size]} y2="0" style={{ stroke: "grey", strokeWidth: "3px" }}></line>
                    </svg>}
                </div>

            </>

        );
    }

}