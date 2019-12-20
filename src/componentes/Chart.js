import React, {Component} from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

    state = {
        chart: '',
        plot: '',
        plotListo: false
    }

    chartRef = (el) => {
        this.setState({chart: el});
    }

    ajustar = (plotA) => {
        plotA.configure({
            width: this.state.chart.parentNode.clientWidth * 0.8,
            height: this.state.chart.parentNode.clientHeight * 0.85,
        });
    };

    graficar = (plotA) => {
        plotA.series.addData({ data: this.props.datoGraf});
        plotA.render();
    }

    componentDidUpdate() {
        let plotA = this.state.plot;

        if(this.state.plotListo === false && this.state.chart !== '') {

            let plotWidth = this.state.chart.parentNode.clientWidth;
            let pltWidth = 0;
            plotWidth <= 380 ? pltWidth = plotWidth * 0.7 : pltWidth = plotWidth * 0.8;
            //console.log(plotWidth, pltWidth);

            this.setState({
                plot: new Rickshaw.Graph({
                    element: this.state.chart,
                    width: pltWidth,
                    height: this.state.chart.parentNode.clientHeight * 0.85, 
                    renderer: "line",
                    min: "0",
                    max: "4",
                    series: new Rickshaw.Series.FixedDuration([{
                        name: 'data',
                        color: '#446CB3'
                    }], undefined, 
                    {
                        timeInterval: 300, //milisegundos
                        maxDataPoints: 200
                    })
                }),

                plotListo: true,

            }, () => this.props.obtenerPlotObj(this.state.plot));
        }

        if(this.props.datos > 0 && this.state.plotListo === true) {
            this.ajustar(plotA);
            this.graficar(plotA);
        }
    }

    render() {

        //window.addEventListener('resize', () => this.ajustar(this.state.plot))

        return (
            <div className="chart" ref={this.chartRef} >  </div>
        )
    }
}

export default Chart;
