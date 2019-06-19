import React from 'react';
import Chart from "react-apexcharts";
import { inject, observer } from 'mobx-react';

@inject('routing')
@inject('portsStore')
@observer
class PortCallsChart extends React.Component {
    state = {};

    fetchData = async () => {
        const response = await fetch(`http://localhost:9000/ports/portCallsByDate/${ this.props.id }`)
            .then(res => res.json());

        response.sort((a, b) => {
            return new Date(a.month) - new Date(b.month);
        });
        this.setState({
            options: {
                chart: {
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Port Calls Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: response.map(({ month }) => month),
                }
            },
            series: [{
                name: "Port Calls",
                data: response.map(({ portcalls_last_year }) => portcalls_last_year),
            }]
        })
    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return <div>
            { this.state.options &&
            <Chart options={ this.state.options } series={ this.state.series } type="line" height="300"/> }
        </div>
    }
}

export default PortCallsChart;
