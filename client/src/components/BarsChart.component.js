import React from 'react';
import Chart from "react-apexcharts";
import compact from 'lodash/compact'

class ClassesBarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let portcallsByClass = await fetch(`http://localhost:9000/ports/portCallsByClass/${ this.props.id }`)
            .then(res => res.json());

        console.log(portcallsByClass.length ? portcallsByClass.map(({ vessel_class }) => vessel_class): []);
        console.log(portcallsByClass.length ? portcallsByClass.map(({ portcalls_last_year }) => portcalls_last_year): []);
        this.setState({
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: portcallsByClass.length ? portcallsByClass.map(({ vessel_class }) => vessel_class): [],
                }
            },
            series: [{
                data: portcallsByClass.length ? portcallsByClass.map(({ portcalls_last_year }) => portcalls_last_year): [],
            }],
        })
    }

    render() {
        return (
            <div id="chart">
                { this.state &&
                <Chart options={ this.state.options } series={ this.state.series } type="bar" height="300"/> }
            </div>
        );
    }
}

export default ClassesBarChart;
