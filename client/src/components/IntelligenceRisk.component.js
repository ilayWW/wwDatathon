import React from 'react';
import Chart from "react-apexcharts";
import { inject, observer } from 'mobx-react';
import { Grid } from "@material-ui/core";
import RadialChart from "./RiskGauge.component";
import StackedRiskBarChart from "./StackedRiskBar.component";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WorningIcon from '@material-ui/icons/WarningOutlined';
import ListItemText from "@material-ui/core/ListItemText";

@inject('routing')
@inject('portsStore')
@observer
class IntelligenceRisk extends React.Component {
    state = {
        riskyVessels: 0,
        vesselsCount: 0,
        upcomingRiskyVessels: []
    };

    fetchData = async () => {
        const portCalls = await fetch(`http://localhost:9000/ports/portCallsByDate/${ this.props.id }`)
            .then(res => res.json());

        let riskResponse = await fetch(`http://localhost:9000/ports/risk/${ this.props.id }`)
            .then(res => res.json());
        riskResponse = riskResponse[0];
        portCalls.sort((a, b) => {
            return new Date(a.month) - new Date(b.month);
        });
        this.setState({
            id: this.props.id,
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
                    categories: portCalls.map(({ month }) => month),
                }
            },
            series: [{
                name: "Port Calls",
                data: portCalls.map(({ portcalls_last_year }) => portcalls_last_year),
            }],
            risk: (riskResponse.port_percentile * 100).toFixed(2) || 0,
            riskyVesselsCount: riskResponse.vessel_count_risky,
            vesselsCount: riskResponse.vessel_count_total,
            riskyVessels: riskResponse.risky.slice(0, 3),
            upcomingRiskyVessels: riskResponse.upcoming_risky_vessels.slice(0, 3),
        })
    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        if (this.props.id !== this.state.id) {
            this.fetchData()
        }
        return <Grid container direction={ 'column' }>
            <Grid item>Security Risk</Grid>
            <Grid item container>
                <Grid item xs={ 4 } alignContent={ 'center' }>
                    { this.state.risk && <RadialChart label={ 'Security Risk' } score={ this.state.risk }/> }
                </Grid>
                <Grid item xs={ 2 }>
                    <Typography variant={ 'caption' }> Risky Vessels In Port:</Typography>
                    { this.state.vesselsCount && <StackedRiskBarChart riskyCount={ this.state.riskyVesselsCount }
                                                                      vesselsInPortCount={ this.state.vesselsCount }/> }
                </Grid>
                <Grid item container xs={ 3 } direction={ 'column' }>
                    <Grid item container alignContent={ 'center' } justify={ 'center' }>
                        <Typography variant={ 'caption' }> Top Risky Vessels In Port:</Typography>
                    </Grid>
                    <Grid item container alignContent={ 'center' } justify={ 'center' }>
                        <List>
                            { this.state.riskyVessels.length && this.state.riskyVessels.map(vessel => {
                                return <ListItem>

                                    <ListItemAvatar>
                                        <Avatar style={ { backgroundColor: '#F44336' } }>
                                            <Typography variant={ 'caption' }>
                                                { vessel.percentile }
                                            </Typography>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <a href={ `https://int.wnwd.com/vesselProfile/${ vessel._id }` }>
                                        <ListItemText primary={ vessel.name } secondary={ `(${ vessel.imo })` }/>
                                    </a>
                                </ListItem>
                            })
                            }
                        </List>
                    </Grid>
                </Grid>
                <Grid item container xs={ 3 } direction={ 'column' }>
                    <Grid item container alignContent={ 'center' } justify={ 'center' }>
                        <Typography variant={ 'caption' }> Upcoming Risky Vessels To Port:</Typography>
                    </Grid>
                    <Grid item container alignContent={ 'center' } justify={ 'center' }>
                        <List>
                            { this.state.upcomingRiskyVessels.length && this.state.upcomingRiskyVessels.map(vessel => {
                                return <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={ { backgroundColor: '#F44336' } }>
                                            <Typography variant={ 'caption' }>
                                                { vessel.percentile }
                                            </Typography>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <a href={ `https://int.wnwd.com/vesselProfile/${ vessel._id }` }>
                                        <ListItemText primary={ vessel.name } secondary={ `(${ vessel.imo })` }/>
                                    </a>
                                </ListItem>
                            })
                            }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    }
}

export default IntelligenceRisk;
