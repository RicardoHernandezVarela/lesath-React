import React, {Component } from 'react';

/* Plot imports */
import Chart from './Chart';
import Yaxis from './Yaxis'

class Plot extends Component  {

    state = {
        caracteristicaLista: false,
        datosSensor: [],
        plot: ''
    }

    recibirDatos = (event) => {
        /* Función para procesar los datos que se obtienen del 
        sensor y guardarlos en el array datosSensor */

        let datos = new TextDecoder().decode(event.target.value);

        let res = datos.split("\n");
        res.pop();

        let valores = res.map(num => (parseInt(num)*3.7/1023));

        this.setState(prevState => ({
            datosSensor: [                
                ...prevState.datosSensor,    
                ...valores
            ]
        }));

    };

    conectarseACambiosDelSensor = (caracteristica) => {
        /* Conectar la característica del modulo BT a la función que procesa los datos que 
        envia el sensor a através del módulo BT */

        caracteristica.oncharacteristicvaluechanged = this.recibirDatos;
    };

    activarInterval = (time) => {
        /* Activar el intervalo para enviar el número de muestras a App */

        this.intervalID = setInterval(() => this.props.nMuestras(this.state.datosSensor.length), time);
        this.intervaloActivo = true;
    };

    desactivarInterval = () => {
        /* Desactivar el intervalo para enviar el número de muestras a App */

        clearInterval(this.intervalID);
        this.intervaloActivo = false;
    };

    componentDidMount() {
        this.activarInterval(400);
    };
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    };

    componentDidUpdate() {
        /* Verificar cuando se recibe el objeto que contiene la característica para conectarse
        y comnezar a recibir datos del sensor, este proceso solo se realiza mientras la propiedad
        caracteristicaLista es igual a false */

        if(this.state.caracteristicaLista === false && typeof this.props.caracteristica !== 'string') {
        
            this.conectarseACambiosDelSensor(this.props.caracteristica);
            this.setState({caracteristicaLista: true});

        } else if (this.props.caracteristica !== '' && this.props.caracteristica.oncharacteristicvaluechanged == null) {
            console.log(this.props.caracteristica);
            this.setState({caracteristicaLista: false})
        } else {
        
        }

        if(this.intervaloActivo === false){
            this.activarInterval(400);
        }

        if(this.props.recibiendo === false && this.intervaloActivo === true){
            this.desactivarInterval();
        }

    };

    obtenerPlotObj =  (obj) => {
        /* Obtener el objeto plot de rickshaw después de crearlo para enviarlo al componente Yaxis */
        
        this.setState({plot: obj}); //, console.log('plot obj from plot', this.state.plot))
    }

    download_csv = (data) => {
        var csv = 'Muestra\n';
    
        data.forEach(function(row) {
                csv += row;
                csv += "\n";
        });
        
        var descargarSenal = document.createElement('a');
        
        descargarSenal.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        descargarSenal.target = '_blank';
        descargarSenal.download = 'data.csv';
        descargarSenal.click();
        
    };

    render() {
        
        const datos = this.state.datosSensor; 
        let datosLength = datos.length;
        const plotRef = React.createRef();

        const datoGraf = datos[datos.length - 1];

        return (
        <div className="plot" ref={plotRef}>
            <span 
                className={this.props.recibiendo ? "no-descargar" : "descargar"}
                onClick={() => this.download_csv(this.state.datosSensor)}
            >
                <i className="material-icons">
                    cloud_download
                </i>
            </span>
            <Yaxis plot={this.state.plot}/>
            <Chart datos={datosLength} datoGraf={datoGraf} obtenerPlotObj={this.obtenerPlotObj}/>
        </div>
        )
    }
}

export default Plot;