import React, {PureComponent } from 'react';

class Plot extends PureComponent  {

    state = {
        caracteristicaLista: false,
        datosSensor: []
    }

    recibirDatos = (event) => {
        /* Función para procesar los datos que se obtienen del 
        sensor y guardarlos en el array datosSensor */

        let datos = new TextDecoder().decode(event.target.value);

        let res = datos.split("\n");
        res.pop();

        let valores = res.map(num => parseInt(num)*3.7/1023);

        this.setState(prevState => ({
            datosSensor: [                
                ...prevState.datosSensor,    
                ...valores
            ]
        }));

        //Incluir aquí la función para plotear en tiempo real.

        //console.log(typeof value);
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
        
            this.conectarseACambiosDelSensor(this.props.caracteristica);
            this.setState({caracteristicaLista: true});
            //console.log('caract in plot: ', this.props.caracteristica.oncharacteristicvaluechanged == null);

            //console.log('listo para recibir datos');

        } else if (this.props.caracteristica.oncharacteristicvaluechanged == null) {
            console.log('false')
            this.setState({caracteristicaLista: false})
        } else {
            //console.log('no se conecto a la caract');
        }

    }

    render() {
        
        const datos = this.state.datosSensor; 

        return (
        <div className="plot">{datos.length}</div>
        )
    }
}

export default Plot;