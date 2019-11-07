import React from 'react';

/* Header imports */ 
import BluetoothConnection from './BluetoothConnection'

const Header = (props) => {
    return (
        <div className="header">
            <a href="/" className="logo">Lesath</a>
            <h2 className="biosignals">Biosignals</h2>
            <BluetoothConnection 
                obtenerEstadoConexion={props.obtenerEstadoConexion}
            />
        </div>
    );
} 

export default Header;