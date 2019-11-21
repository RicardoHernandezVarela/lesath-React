import React, {Component} from 'react';
import Rickshaw from 'rickshaw';

class Yaxis extends Component {

    state = {
        yAxis: '',
        yListo: false,
        axis: ''
    }

    axisRef = (el) => {
        this.setState({yAxis: el});
    }

    componentDidUpdate() {
        
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
    
            }, () => this.state.axis.render());
        }
    }

    render () {
        
        return (
            <div className="y-axis" ref={this.axisRef}>  </div>
        )
    }
}

export default Yaxis;
