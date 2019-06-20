import React from 'react';
import Chart from "react-apexcharts";
import { inject, observer } from 'mobx-react';
import Grid from "@material-ui/core/Grid";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import Typography from "@material-ui/core/Typography";

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
            durations,
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
                        <Grid container justify={'center'} alignItems={'center'} style={ { height: '100%' } }>
                            <Grid item container direction={'column'} justify={'center'} alignItems={'center'}>
                                <Grid item>
                                    <Typography style={{paddingBottom: '10px'}}>
                                        Average Vessel Duration In Port
                                    </Typography>
                                </Grid>
                                <Grid item style={{fontSize: '80px', color: '#4286f4'}}>
                                    <AccessTimeOutlinedIcon fontSize={'inherit'}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'body1'}>
                                        {this.state.durations.average_portcall_duration.toFixed(2)} Hours
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Grid>
            }
        </div>
    }
}

export default GaugeGroup;
