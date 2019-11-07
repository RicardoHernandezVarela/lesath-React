import React from 'react'; 

const Terminal = (props) => {
    return(
        <div className="terminal">
            {props.mensaje}
        </div>
    )
}

export default Terminal;