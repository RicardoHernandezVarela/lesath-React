import React, {Component} from 'react';
import './App.css';

/* App components imports */
import Header from './componentes/Header';
import Subheader from './componentes/Subheader';

class App extends Component {

  state = {
    caracteristica: ''
  }

  obtenerEstadoConexion = (estado) => {
    console.log(estado);
    this.setState({ caracteristica: estado})
    console.log('caract: ', this.state.caracteristica)
  }

  render(){
    return (
      <div className="container">
        <Header obtenerEstadoConexion={this.obtenerEstadoConexion}/>
        <Subheader />
      </div>
    );
  }
}

export default App;
