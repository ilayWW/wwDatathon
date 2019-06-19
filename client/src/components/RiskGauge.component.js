import React from 'react';
import Chart from "react-apexcharts";

class RadialChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        },
                    },
                },
                fill: {
                    colors: ['#F44336', '#E91E63', '#9C27B0']
                },
                labels: [props.label]
            },
            series: [props.score],
        }

    }

    render() {
        return (
            <div id="chart">
                <Chart options={ this.state.options } series={ this.state.series } type="radialBar" height="300"/>
            </div>
        );
    }
}

export default RadialChart;
