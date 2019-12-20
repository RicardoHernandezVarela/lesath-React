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
    recibiendo: 2,
    freq: 250,
    time: 0
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
    /* Obtener frecuencia de muestreo desde el componente Frecuencia */

    this.setState({freq: parseInt(value)});
  }

  nMuestras = (value) => {
    /* Obtener el número de muestras desde el elemento Plot */

    if(this.state.caracteristica !== ''){
      let frecuencia = this.state.freq;
      let timeFreq = Math.floor(value/frecuencia);
      
      this.setState({time: timeFreq}) //, () => console.log(timeFreq))
    }
  }

  estadoRecibiendo = (estado) => {
    /* DEtectar cuando se presiona play o stop desde el elemento Buttons */
    this.setState({recibiendo: estado}) //, () => console.log(this.state.recibiendo));
  }

  render(){

    return (
      <div className="container">
        <Header obtenerEstadoConexion={this.obtenerEstadoConexion}/>
        <Subheader mensaje={this.state.mensaje} time={this.state.time} />
        <Plot caracteristica={this.state.caracteristica} nMuestras={this.nMuestras} recibiendo={this.state.recibiendo}/>
        <Frecuencia obtenerFrecuencia={this.obtenerFrecuencia}/>
        <Buttons caracteristica={this.state.caracteristica} estadoRecibiendo={this.estadoRecibiendo}/>
      </div>
    );
  }
}

export default App;
