import React, {Component} from 'react';
//import Rickshaw from 'rickshaw';

class Chart extends Component {

    state = {
        chart: '',
        plot: '',
        plotListo: false
    }

    chartRef = (el) => {
        /* Obtener la referencia del div 
        chart cuando se encuentra en el DOM. */

        this.setState({chart: el});
    }

    generarPlot = () => {
        let plotWidth = this.state.chart.parentNode.clientWidth;
        let pltWidth = 0;
        plotWidth <= 429 ? pltWidth = plotWidth * 0.6 : pltWidth = plotWidth * 0.8;
        //console.log(plotWidth, pltWidth);

        this.setState({
            plot: new window.Rickshaw.Graph({
                element: this.state.chart,
                width: pltWidth,
                height: this.state.chart.parentNode.clientHeight * 0.85, 
                renderer: "line",
                min: "0",
                max: "4",
                series: new window.Rickshaw.Series.FixedDuration([{
                    name: 'data',
                    color: '#446CB3'
                }], undefined, 
                {
                    timeInterval: 300,
                    maxDataPoints: 500
                })
            }),

            plotListo: true,

            /* Enviar el objeto plot de rickshaw al componente Plot*/
        }, () => this.props.obtenerPlotObj(this.state.plot)); 
    };

    ajustar = (plotA) => {
        /* Ajustar las dimensiones en el objeto plot de rickshaw */

        plotA.configure({
            width: this.state.chart.parentNode.clientWidth * 0.8,
            height: this.state.chart.parentNode.clientHeight * 0.85,
        });
    };

    graficar = (plotA) => {
        /* Agregar el nuevo dato a data del objeto plot y 
           hacer el render de la gráfica. */

        plotA.series.addData({ data: this.props.datoGraf});
        plotA.render();
    }

    componentDidUpdate() {
        let plotA = this.state.plot;

        /* Crear el objeto plot de rickshaw */
        if(this.state.plotListo === false && this.state.chart !== '') {
            this.generarPlot();

        }

        /* Actualizar la gráfica cuando se recibe un dato del sensor */
        if(this.props.datos > 0 && this.state.plotListo === true) {
            this.ajustar(plotA);
            this.graficar(plotA);
        }
    }

    render() {

        return (
            <div className="chart" ref={this.chartRef} >  </div>
        )
    }
}

export default Chart;
