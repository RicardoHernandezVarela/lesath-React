import React, { Component } from 'react';

class Frecuencia extends Component {

    state = {
        value: 250, 
        cambiarFrecuencia: this.cambiarFrecuencia.bind(this)
    }

    componentDidMount() {
        console.log(this.state.value);
    }

    cambiarFrecuencia(event) {
        this.setState(
            {value: event.target.value}, 
            () => this.props.obtenerFrecuencia(this.state.value)
        );
    }

    render() {

        return (
            <div className="frecuencia">
                <label htmlFor="muestreo">Frecuencia</label>
                <select id="muestreo" value={this.state.value} onChange={this.state.cambiarFrecuencia}>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
                <span>Hz</span>
            </div>
        )
    }

}

export default Frecuencia;