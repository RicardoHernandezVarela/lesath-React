import React, {Component} from 'react';
//import Rickshaw from 'rickshaw';

class Yaxis extends Component {

    state = {
        yAxis: '',
        yListo: false,
        axis: '',
        hoverDetail: ''
    }

    axisRef = (el) => {
        /* Obtener la referencia del div 
        yaxis cuando se encuentra en el DOM. */
        
        this.setState({yAxis: el});
    };

    generarEje = (plot, element) => {
        this.setState({
            axis: new window.Rickshaw.Graph.Axis.Y({
                graph: plot,
                    orientation: 'left',
                    tickFormat: function (y) {
                        return y.toFixed(2);
                    },
                    ticks: 5,
                    element: element
            }),

            hoverDetail: new window.Rickshaw.Graph.HoverDetail( {
                graph: plot,
                yFormatter: function(y) { return y + "V" }
            }),

            yListo: true
            
            /* Hacer el render del eje Y y del grid de la gráfica */
        }, () => this.state.axis.render());
    };

    componentDidUpdate() {
        /* Crear el objeto del eje Y para el plot */

        if(this.state.yListo === false && this.props.plot !== '') {
            this.generarEje(this.props.plot, this.state.yAxis);
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
