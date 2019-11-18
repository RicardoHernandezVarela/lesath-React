import React, {Component, Fragment} from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

    state = {
        chart: '',
        yAxis: '',
        plot: '',
        y: '',
        plotListo: false
    }

    chartRef = (el) => {
        this.setState({chart: el})
    }

    axisRef = (el) => {
        this.setState({yAxis: el})
    }

    ajustar = (plotA) => {
        plotA.configure({
            width: this.state.chart.parentNode.clientWidth * 0.8,
            height: this.state.chart.parentNode.clientHeight * 0.9,
        });
    };

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
                    width: 300,
                    height: 200,
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

            });
        }

        if(this.props.datos > 0 && this.state.plotListo === true) {
            this.ajustar(plotA);
            this.graficar(plotA);
        }
    }

    render() {
        //console.log(this.state.plot);
        return (
            <Fragment>
                <div className="y-axis" ref={this.axisRef}>  </div>
                <div className="chart" ref={this.chartRef}>  </div>
            </Fragment>
        )
    }
}

export default Chart;
