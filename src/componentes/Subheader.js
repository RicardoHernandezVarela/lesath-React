import React from 'react'

/* Subheader imports */
import Terminal from './Terminal';
import Timer from './Timer';
import Event from './Event';

const Subheader = (props) => {
    return (
        <div className="subheader">
            <Event />
            <Terminal mensaje={props.mensaje}/>
            <Timer time={props.time} />
        </div>
    )
}

export default Subheader;