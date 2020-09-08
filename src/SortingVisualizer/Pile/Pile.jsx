import React, { Component } from 'react';
import './Pile.css';

export default class Pile extends Component {
    render() {
        const {
            val,
            isChanging,
            finished,
        } = this.props;

        let extraClassName = '';
        if (isChanging) {
            extraClassName = '-changing';
        }
        if (finished) {
            extraClassName = '-finished';
        }

        return (
            <>
                <div
                    className={'pile' + extraClassName}
                    style={{ height: `${val * 5}px` }}
                >
                    {val}
                </div >
            </>

        );
    }

}