import React from 'react';
import Chart from "react-apexcharts";
import { inject, observer } from 'mobx-react';
import Grid from "@material-ui/core/Grid";

@inject('routing')
@inject('portsStore')
@observer
class GaugeGroup extends React.Component {
    state = {};

    fetchData = async () => {
        const [durations] = await fetch(`http://localhost:9000/ports/durations/${ this.props.id }`)
            .then(res => res.json());
        const [portcalls] = await fetch(`http://localhost:9000/ports/portcalls/${ this.props.id }`)
            .then(res => res.json());
        const [portcallsUnique] = await fetch(`http://localhost:9000/ports/portcallsUnique/${ this.props.id }`)
            .then(res => res.json());

        const uniqueRatio = (100 * (portcallsUnique.portcalls_uniq / portcalls.portcalls_last_year)).toFixed(2);
        this.setState({
            portcallsRatioChart: {
                options: {
                    title: {
                        text: 'Unique Port Calls'
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: '70%',
                            }
                        },
                    },
                    labels: [`${ portcallsUnique.portcalls_uniq }/${ portcalls.portcalls_last_year }`]
                },
                series: [uniqueRatio],
            }
        })

    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return <div>
            { this.state.portcallsRatioChart &&
            <Grid container>
                <Grid item xs>
                    <div style={ { height: '100%' } }>
                        <Chart options={ this.state.portcallsRatioChart.options }
                               series={ this.state.portcallsRatioChart.series }
                               type="radialBar"/>
                    </div>
                </Grid>
                <Grid item xs>
                    <div style={ { height: '100%' } }>
                        <Chart options={ this.state.portcallsRatioChart.options }
                               series={ this.state.portcallsRatioChart.series }
                               type="radialBar"/>
                    </div>

                </Grid>
            </Grid>
            }
        </div>
    }
}

export default GaugeGroup;
