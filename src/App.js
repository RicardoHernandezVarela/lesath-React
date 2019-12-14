import React, {Component} from 'react';
import './App.css';

/* App components imports */
import Header from './componentes/Header';
import Subheader from './componentes/Subheader';
import Plot from './componentes/Plot';
import Buttons from './componentes/Buttons';
import Frecuencia from './componentes/Frecuencia';

class App extends Component {

  state = {
    caracteristica: '',
    mensaje: 'Ningún dispositivo conectado',
    muestras: 0,
    freq: 250
  }

  obtenerEstadoConexion = (estado) => {

    /* Obtener información del estado de la conexión desdé
    el componente BluetoothConnection.  */

    if (typeof estado !== 'string') {
      this.setState({
        mensaje: 'Dispositivo conectado', 
        caracteristica: estado
      });

    } else {
      this.setState({mensaje: estado});
    }
  }

  obtenerFrecuencia = (value) => {
    this.setState({freq: parseInt(value)});
  }

  nMuestras = (value) => {
    this.setState({muestras: value});
  }

  render(){
    let muestras = this.state.muestras;
    let frecuencia = this.state.freq;

    let time = Math.floor(muestras/frecuencia);
    console.log(time);

    return (
      <div className="container">
        <Header obtenerEstadoConexion={this.obtenerEstadoConexion}/>
        <Subheader mensaje={this.state.mensaje} />
        <Plot caracteristica={this.state.caracteristica} nMuestras={this.nMuestras}/>
        <Frecuencia obtenerFrecuencia={this.obtenerFrecuencia}/>
        <Buttons caracteristica={this.state.caracteristica} />
      </div>
    );
  }
}

export default App;
