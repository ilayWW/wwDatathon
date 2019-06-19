import React from 'react';
import Chart from "react-apexcharts";

class StackedRiskBarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 380,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: 0,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    show: false,
                    categories: [''],
                    labels: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                fill: {
                    colors: ['#2962FF','#F44336'],
                    opacity: 1
                },
                tooltip: {
                    marker: {
                        show: false,
                    },
                },
                colors: ['#2962FF','#F44336'],
            },
            series: [{
                name: 'Non Risk Vessels',
                data: [props.vesselsInPortCount-props.riskyCount]
            }, {
                name: 'Risky Vessels',
                data: [props.riskyCount]
            }],
        }
    }

    render() {
        return (
            <div id="chart">
                 <Chart options={ this.state.options } series={ this.state.series } type="bar" height="230"/>
            </div>
        );
    }
}

export default StackedRiskBarChart;
