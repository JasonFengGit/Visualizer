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
        let lineOff = -20 * this.props.index;
        console.log(lineOff, this.props.index)
        return (
            <>
                <div
                    className={'pile' + extraClassName}
                    style={{ height: `${val * 8}px`, background: color }}

                >
                    <p className='value'>{val}</p>
                    {!this.props.finished && this.props.isPivot && <svg height="100" width="900" style={{position:"absolute", display:"flex", marginTop: "-31px", marginLeft: `${lineOff}px`}}>
  <line x1="0" y1="0" x2="820" y2="0" style={{stroke:"grey", strokeWidth:"2px"}}></line>
</svg>}
                </div >
                
            </>

        );
    }

}