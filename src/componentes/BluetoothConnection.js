import React, {Component} from 'react';

class BluetoothConnection extends Component {

    state = {
        servicio: 0xFFE0,
        dispositivo: ''
    }

    requerirDispositivosBT = () => {
        /* Desplegar lista de dispositivos BT disponibles y realizar 
        selección de dispositivo para conectar, retorna una promesa 
        con el objeto del dispositivo SELECCIONADO. */ 

        /* Revisar si navigator.bluetooth está disponible */

        if(navigator.bluetooth !== undefined){
            return (
                navigator.bluetooth.requestDevice({
                    // filters: [myFilters]       // filtros o acceptAllDevices
                    optionalServices: [this.state.servicio],
                    acceptAllDevices: true
                  })           
            );
        } else {
            alert('Conexión bluetooth no disponible en este dispositivo o navegador.');
            return Promise.reject();
        }
    }

    conectarConDispositivoBT = (device) => {
        /* Realizar la conexión con el dispositivo BT seleccionado y 
        guardar el dispositivo conectado como un objeto para procesar la
        desconexión entre el navegador y el BT, retorna una promesa con el 
        objeto del dispositivo CONECTADO. */
        
        this.setState({ dispositivo: device })
        return device.gatt.connect();
    }

    conectarConElServicio = (gattserver) => {
        /* Conectarse al servicio del dispositivo BT a través del servidor 
        gatt para poder enviar y recibir datos, returna una promesa con el
        objeto con la información del servicio al que se conecto el navegador. */

        return gattserver.getPrimaryService(this.state.servicio);
    }

    obtenerCaracteristicasDelServicio = (service) => {
        /* Obtener la lista de características disponibles en el servicio del 
        dispositivo BT, retorna una promesa con un arreglo que contiene todas
        las características del servicio, en el caso del módulo HM-10 solo hay
        una caracteríastica disponible. */

        return service.getCharacteristics();
    }

    conectarConCaracteristica = (characteristics) => {
        /* Iniciar las notificaciones en la característica disponible 
        en el servicio del dispositivo BT, retorna una promesa con un 
        objeto que contiene la información de la característica, está
        es la que se modificara para recibir y enviar datos a través 
        del módulo BT. */

        let caracteristica = characteristics[0];
        return caracteristica.startNotifications();
    }

    conectar = () => {
        console.log('conectando...')
        this.requerirDispositivosBT()
            .then(device => this.conectarConDispositivoBT(device))
            .then(gattserver => this.conectarConElServicio(gattserver))
            .then(service => this.obtenerCaracteristicasDelServicio(service))
            .then(characteristics => this.conectarConCaracteristica(characteristics))
            .then(prom => this.props.obtenerEstadoConexion(prom))
            .catch(err => this.props.obtenerEstadoConexion(`Fallo la conexión, ${err}`))
    }

    desconectar = () => {
        console.log('desconectando...');
        if (this.state.dispositivo) {
            // desconectar:
            this.state.dispositivo.gatt.disconnect();
            this.props.obtenerEstadoConexion('Dispositivo desconectado');
          }
    }

    render() {
        return (
            <div className="bluetooth">
                <span onClick={this.conectar}>
                    <i className="material-icons">
                        bluetooth
                    </i>
                </span>

                <span onClick={this.desconectar}>
                    <i className="material-icons">
                        bluetooth_disabled
                    </i>
                </span>
            </div>
        );
    }
}

export default BluetoothConnection;