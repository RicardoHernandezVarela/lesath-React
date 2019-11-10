import React, {PureComponent} from 'react';

class Buttons extends PureComponent {

  state = {
    caracteristicaLista: false
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

    if(this.props.caracteristica) {
      this.send(this.props.caracteristica, 'i');
      console.log('iniciar la transmición de datos', this.props.caracteristica);
    } else {
      console.log('no se ha actualizado la caract');
    }
  }

  parar = () => {
    /* Función para detener la transmición de datos 
    del sensor a través del módulo BT */

    if(this.props.caracteristica) {
      this.send(this.props.caracteristica, 'p');
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