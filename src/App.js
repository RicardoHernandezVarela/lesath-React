import React, {Component} from 'react';
import './App.css';

/* App components imports */
import Header from './componentes/Header';
import Subheader from './componentes/Subheader';
import Plot from './componentes/Plot';
import Buttons from './componentes/Buttons';

class App extends Component {

  state = {
    caracteristica: '',
    mensaje: 'Ningún dispositivo conectado'

  }

  obtenerEstadoConexion = (estado) => {

    if (typeof estado !== 'string') {
      this.setState({mensaje: 'Conectando...'});

      this.setState({ caracteristica: estado});
  
      this.setState({mensaje: 'Dispositivo conectado'});

    } else {
      this.setState({mensaje: estado});
    }
  }

  render(){
    return (
      <div className="container">
        <Header obtenerEstadoConexion={this.obtenerEstadoConexion}/>
        <Subheader mensaje={this.state.mensaje} />
        <Plot caracteristica={this.state.caracteristica} />
        <Buttons caracteristica={this.state.caracteristica} />
      </div>
    );
  }
}

export default App;
