import React, {PureComponent} from 'react';

class Buttons extends PureComponent {

  state = {
    caracteristicaLista: false,
    caracteristica: ''
  }

  componentDidUpdate() {
    /* Verificar cuando se recibe el objeto que contiene la característica para conectarse
    y comnezar a recibir datos del sensor, este proceso solo se realiza mientras la propiedad
    caracteristicaLista es igual a false */

    if(this.state.caracteristicaLista === false && typeof this.props.caracteristica !== 'string') {
        //console.log('caract in plot: ', this.props.caracteristica);
        this.setState({caracteristicaLista: true, caracteristica: this.props.caracteristica});
        //console.log('listo para recibir datos');

    } else if (this.state.caracteristicaLista === true) {
        console.log('ya llego la caract', this.state.caracteristica);
        
    } else {
        console.log('no llego la caract');
    }
  }
  
  // Enviar valores al módulo BLE:
  send = (caracteristica, data) => {
    /* Enviar caracteres al módulo BLE para que las pase al 
    microcontrolador que conecta con el sensor */
    caracteristica.writeValue(new TextEncoder().encode(data));
  }

  iniciar = () => {
    /* Función para iniciar la transmición de datos 
    del sensor a través del módulo BT */
    if(this.state.caracteristica !== 'string') {
      this.send(this.state.caracteristica, 'i');
      console.log('iniciar la transmición de datos', this.state.caracteristica);
    } else {
      console.log('no se ha actualizado la caract');
    }
  }

  parar = () => {
    /* Función para detener la transmición de datos 
    del sensor a través del módulo BT */
    if(this.state.caracteristica !== 'string') {
      this.send(this.state.caracteristica, 'p');
      console.log('parar la transmición de datos');
    } else {
      console.log('no se ha actualizado la caract');
    }
  }

  render() {
    return (
      <div className="buttons">
          <button className="play" onClick={this.iniciar}>
              <i className="material-icons">
                  play_arrow
              </i>  
          </button>
          <button className="stop" onClick={this.parar}>
              <i className="material-icons">
                  stop
              </i>  
          </button>
          <button className="save">
              <i className="material-icons">
                  save
              </i>  
          </button>
      </div>
    );
  }
}

export default Buttons; 