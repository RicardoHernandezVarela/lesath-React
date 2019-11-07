import React, {Component} from 'react';
import './App.css';

/* App components imports */
import Header from './componentes/Header'

class App extends Component {

  conectar = () => {
    console.log('conectar');
  }

  desconectar = () => {
    console.log('desconectar');
  }

  render(){
    return (
      <div className="container">
        <Header 
          conectar={this.conectar} 
          desconectar={this.desconectar}
        />
      </div>
    );
  }
}

export default App;
