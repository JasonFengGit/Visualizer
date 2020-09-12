import React, { Component } from 'react';
import './Pile.css';

export default class Pile extends Component {
    render() {
        const {
            val,
            isChanging,
            finished,
            colorSetIndex,
            changingColors = [`rgb(228, 230, 120)`, `rgb(155, 147, 229)`, `rgb(248, 250, 140)`],
            normalColors = [`rgb(200,${(1 - val / 45) * 255 + 50}, 255)`, `rgb(250,200, ${(1 - val / 80) * 255})`, `rgb( ${(1 - val / 80) * 255},200,250)`],
        } = this.props;

        let extraClassName = '';
        if (isChanging) {
            extraClassName = '-changing';
        }
        if (finished) {
            extraClassName = '-finished';
        }
        let color = extraClassName === '-changing' ? changingColors[colorSetIndex] : normalColors[colorSetIndex];
        return (
            <>
                <div
                    className={'pile' + extraClassName}
                    style={{ height: `${val * 10}px`, background: color }}

                >
                    <p className='value'>{val}</p>
                </div >
            </>

        );
    }

}