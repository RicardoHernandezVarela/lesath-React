import React from 'react';

const Timer = (props) => {
    return (
        <div className="timer">
            <h6 className="timer-title">Timer</h6>
            <span className="timer-value">{props.time}</span>
        </div>
    )
}

export default Timer;