state = {
    dispositivo: '',
    servicio: 0xFFE0,
    caracteristica: '',
    receiveSeparator: '\n',
    receiveBuffer: '',
    registrosSensor: []
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