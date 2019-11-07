state = {
    dispositivo: '',
    servicio: 0xFFE0,
    caracteristica: '',
    receiveSeparator: '\n',
    receiveBuffer: '',
    registrosSensor: []
  }

  /* Desplegar la lista de dispositivos 
  disponibles y seleccionar para vincular */

  handleDevice = (device) => {
    // Guardar el dispositivo conectado para desconectarse después:
    this.setState({ dispositivo: device })
    console.log(device.name);
    // Conectar al dispositivo después de seleccionarlo:
    return device.gatt.connect();
  }

  /* Conectar al servidor del dispositivo
  y retornar el servicio para enviar y transmitir datos */

  handleServer = (server) => {
    // Obtener el servicio del dispositivo:
    console.log(server)
    return server.getPrimaryService(this.state.servicio);
  }

  /* Conectar al servicio del dispositivo 
  y retornar las características disponibles */

  handleService = (service) => {
    // Obtener la característica del servicio:
    return service.getCharacteristics();
  }

  // Recivir los datos del sensor:

  handleData = (event) => {
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

  /* Suscribirse a los cambios del sensor */

  handleSensorChanges = (caracteristica) => {
    caracteristica.oncharacteristicvaluechanged = this.handleData;
  }

  /* Suscribirse a cada una de las características
  disponibles para el dispositivo para iniciar las 
  notificaciones cuando el BT transmite datos */ 

  handleCharacteristics = (characteristics) => {
    // Suscribirse a las características:
    for (let c in characteristics) {
      this.setState({ caracteristica: characteristics[c] })
      characteristics[c].startNotifications()
      .then(caracteristica => this.handleSensorChanges(caracteristica))
    }
  }

  /* Realizar el proceso de conexión entre el modulo BT y el navegador */

  conectar = () => {
    console.log('conectando...')
    navigator.bluetooth.requestDevice({
      // filters: [myFilters]       // filtros o acceptAllDevices
      optionalServices: [this.state.servicio],
      acceptAllDevices: true
    })
    .then(
      device => this.handleDevice(device),
      console.log('conectado')
    )
    .then(server => this.handleServer(server))
    .then(service => this.handleService(service))
    .then(characteristics => this.handleCharacteristics(characteristics))
    .catch(err => console.log(err, 'No pudo conectarse'))
  }

  /* Desconectar dispositivo BT */

  desconectar = () => {
    if (this.state.dispositivo) {
      console.log(this.state.dispositivo)
      // desconectar:
      this.state.dispositivo.gatt.disconnect();
      console.log('desconectado');
    }
  }