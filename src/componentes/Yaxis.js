import React, {Component} from 'react';
import Rickshaw from 'rickshaw';

class Yaxis extends Component {

    state = {
        yAxis: '',
        yListo: false,
        axis: ''
    }

    axisRef = (el) => {
        /* Obtener la referencia del div 
        yaxis cuando se encuentra en el DOM. */
        
        this.setState({yAxis: el});
    }

    componentDidUpdate() {
        /* Crear el objeto del eje Y para el plot */

        if(this.state.yListo === false && this.props.plot !== '') {
            this.setState({
                axis: new Rickshaw.Graph.Axis.Y({
                    graph: this.props.plot,
                        orientation: 'left',
                        tickFormat: function (y) {
                            return y.toFixed(2);
                        },
                        ticks: 5,
                        element:this.state.yAxis
                }),
    
                yListo: true
                
                /* Hacer el render del eje Y y del grid de la gráfica */
            }, () => this.state.axis.render());
        }
    }

    render () {
        
        return (
            <div className="y-axis" ref={this.axisRef}>  
                <h5 className="volts">Volts</h5> 
            </div>
        )
    }
}

export default Yaxis;
