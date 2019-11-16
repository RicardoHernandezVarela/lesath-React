import React, {Component, Fragment} from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

    state = {
        chart: '',
        yAxis: '',
        plot: '',
        plotListo: false
    }

    chartRef = (el) => {
        this.setState({chart: el})
    }

    axisRef = (el) => {
        this.setState({yAxis: el})
    }

    graficar = (plotA) => {
        plotA.series.addData({ data: this.props.datoGraf});
        plotA.render();
    }

    componentDidMount() {
        console.log(this.state.chart);

    }

    componentDidUpdate() {
        
        let plotA = this.state.plot;

        if(this.state.plotListo === false && this.state.chart !== '') {
            this.setState({
                plot: new Rickshaw.Graph({
                    element: this.state.chart,
                    width: 500,
                    height: 250,
                    renderer: "line",
                    min: "0",
                    max: "4",
                    series: new Rickshaw.Series.FixedDuration([{
                        name: 'data',
                        color: '#446CB3'
                    }], undefined, 
                    {
                        timeInterval: 100, //milisegundos
                        maxDataPoints: 50
                    })
                }),

                plotListo: true,
                datosListos: true

            })

        }
        
        if(this.state.plot !== '' && this.state.plotListo === true) {
            this.graficar(plotA);
        }
    }

    render() {
        //console.log(this.state.plot);
        return (
            <Fragment>
                <div className="y-axis" ref={this.axisRef}> {this.props.datos} </div>
                <div className="chart" ref={this.chartRef}>  </div>
            </Fragment>
        )
    }
}

export default Chart;
