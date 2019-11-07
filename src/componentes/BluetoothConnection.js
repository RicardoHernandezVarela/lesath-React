import React, {Component} from 'react';

class BluetoothConnection extends Component {
    render() {
        return (
            <div className="bluetooth">
                <span onClick={this.props.conectar}>
                    <i className="material-icons">
                        bluetooth
                    </i>
                </span>

                <span onClick={this.props.desconectar}>
                    <i className="material-icons">
                        bluetooth_disabled
                    </i>
                </span>
            </div>
        );
    }
}

export default BluetoothConnection;