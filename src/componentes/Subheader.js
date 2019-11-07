import React from 'react'

/* Subheader imports */
import Terminal from './Terminal';

const Subheader = (props) => {
    return (
        <div className="subheader">
            <Terminal mensaje={props.mensaje}/>
        </div>
    )
}

export default Subheader;