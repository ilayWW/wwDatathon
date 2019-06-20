import React from 'react';
import Chart from "react-apexcharts";

class SimpleChart extends React.Component {
    state = {}
    constructor(props) {
        super(props);
    }

    updateData = ()=>{
        this.setState(
            {
                options: {
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: '70%',
                            }
                        },
                    },
                    labels: [this.props.label]
                },
                series: [this.props.score.toFixed(2)],
                score: this.props.score
            }
        )

    }

    componentDidMount() {
        this.updateData()
    }

    render() {
        if (this.props.score !== this.state.score) {
            this.updateData()
        }
        return (
            <div id="chart">
                {(this.props.score && this.state.options) && <Chart options={this.state.options} series={this.state.series} type="radialBar" height="100" />}
            </div>
        );
    }
}

export default SimpleChart;
