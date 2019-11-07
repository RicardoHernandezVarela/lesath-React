import React, {PureComponent } from 'react';

class Plot extends PureComponent  {

    state = {
        caracteristica: '',
        caracteristicaLista: false,
        receiveSeparator: '\n',
        receiveBuffer: '',
        registrosSensor: []
    }

    recibirDatos = (event) => {
        // Obtener el buffer con los datos del sensor:
        const value = new TextDecoder().decode(event.target.value);
    
        for (const c of value) {
          if (c === this.state.receiveSeparator) {
            const data = this.state.receiveBuffer.trim();
            this.setState({ receiveBuffer: '' });
    
            //Datos recibidos del sensor, almacenados en variable data
            if (data) {
              let reg = (parseInt(data)*3.3)/1023
              console.log(reg.toPrecision(4))
    
              if(reg !== "NaN"){
                this.setState(prevState => {
                  return {
                    registrosSensor: [
                      ...prevState.registrosSensor,
                      parseFloat(reg.toPrecision(4))
                    ]
                  } 
                })
              }
              
            }
          } else {
          }
        }
    }

    conectarseACambiosDelSensor = (caracteristica) => {
        caracteristica.oncharacteristicvaluechanged = this.recibirDatos;
    }

    componentDidUpdate() {
        /* Verificar cuando se recibe el objeto que contiene la característica para conectarse
        y comnezar a recibir datos del sensor, este proceso solo se realiza mientras la propiedad
        caracteristicaLista es igual a false */

        if(this.state.caracteristicaLista === false && typeof this.props.caracteristica !== 'string') {
            console.log('caract in plot: ', this.props.caracteristica);
            this.setState({caracteristicaLista: true, caracteristica: this.props.caracteristica})
            this.conectarseACambiosDelSensor(this.props.caracteristica);
            console.log('listo para recibir datos');
        } else if (this.state.caracteristicaLista === true) {
            console.log('ya se conecto', this.state.caracteristica);
        } else {
            console.log('no se conecto a la caract');
        }
    }

    render() {
        return (
            <div className="plot">Live Plot</div>
        )
    }
}

export default Plot;