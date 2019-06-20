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

        portcallsByClass.sort((a,b)=>{
            return a.portcalls_last_year - b.portcalls_last_year;
        });

        this.setState({
            options: {
                title:{
                  text: 'Port Calls by Class'
                },
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
                name: 'Port Calls'
            }],
        })
    }

    render() {
        return (
            <div>
                { this.state &&
                <Chart options={ this.state.options } series={ this.state.series } type="bar" /> }
            </div>
        );
    }
}

export default ClassesBarChart;
