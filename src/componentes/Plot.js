import React, {PureComponent } from 'react';

class Plot extends PureComponent  {

    state = {
        caracteristica: '',
        caracteristicaLista: false,
    }

    recibirDatos = (event) => {
        console.log(event);
    }

    conectarseACambiosDelSensor = (caracteristica) => {
        /* Conectar la característica del modulo BT a la función que procesa los datos que 
        envia el sensor a através del módulo BT */
        caracteristica.oncharacteristicvaluechanged = this.recibirDatos;
    }

    componentDidUpdate() {
        /* Verificar cuando se recibe el objeto que contiene la característica para conectarse
        y comnezar a recibir datos del sensor, este proceso solo se realiza mientras la propiedad
        caracteristicaLista es igual a false */

        if(this.state.caracteristicaLista === false && typeof this.props.caracteristica !== 'string') {
            //console.log('caract in plot: ', this.props.caracteristica);
            this.setState({caracteristicaLista: true, caracteristica: this.props.caracteristica});

            this.conectarseACambiosDelSensor(this.props.caracteristica);
            //console.log('listo para recibir datos');

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