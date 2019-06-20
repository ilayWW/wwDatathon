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
import SimpleChart from "./SimpleGauge.component";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavChart from "./NavGauge.component";

@inject('routing')
@inject('portsStore')
@observer
class SafetyRisk extends React.Component {
    state = {
        riskyVessels: 0,
        vesselsCount: 0,
        upcomingRiskyVessels: []
    };

    fetchData = async () => {
        const [portAccidentsNormalized] = await fetch(`http://localhost:9000/ports/portAccidentsNormalized/${ this.props.id }`)
            .then(res => res.json());

        let [pscResponse] = await fetch(`http://localhost:9000/ports/pscStats/${ this.props.id }`)
            .then(res => {
                return res.json()
            });

        console.log(portAccidentsNormalized);
        this.setState({
            detentions_inspections_ratio: pscResponse.detentions_inspections_ratio,
            inspections_portcalls_ratio: pscResponse.inspections_portcalls_ratio,
            inspections_with_deficiencies_inspections_ratio: pscResponse.inspections_with_deficiencies_inspections_ratio,
            risk_percentile: portAccidentsNormalized.risk_percentile,
            accidents_count: portAccidentsNormalized.accidents_count,
            port_complexity: portAccidentsNormalized.port_complexity,
        })
    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return <Grid container direction={ 'column' }>
            <Grid item>Safety Risk</Grid>
            <Grid item container>
                <Grid item xs={ 4 }>
                    { this.state.risk_percentile &&
                    <RadialChart label={ 'Safety Risk' } score={ (this.state.risk_percentile * 100).toFixed(2) }/> }
                </Grid>
                <Grid item xs={ 4 } alignContent={ 'center' }>
                    { this.state.inspections_with_deficiencies_inspections_ratio && <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={ { backgroundColor: '#4286f4' } }>
                                    <Typography variant={ 'caption' }>
                                        { `${ (this.state.detentions_inspections_ratio * 100).toFixed(0) }%` }
                                    </Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 'Detention Rate Per Inspection' }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={ { backgroundColor: '#4286f4' } }>
                                    <Typography variant={ 'caption' }>
                                        { `${ (this.state.inspections_with_deficiencies_inspections_ratio * 100).toFixed(0) }%` }
                                    </Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 'Inspections with Deficiencies Rate' }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={ { backgroundColor: '#4286f4' } }>
                                    <Typography variant={ 'caption' }>
                                        { `${ (this.state.inspections_portcalls_ratio * 100).toFixed(0) }%` }
                                    </Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 'Inspection Rate Per Port Call' }
                            />
                        </ListItem>
                        { this.state.accidents_count && <ListItem>
                            <ListItemAvatar>
                                <Avatar style={ { backgroundColor: '#4286f4' } }>
                                    <Typography variant={ 'caption' }>
                                        { `${ this.state.accidents_count }` }
                                    </Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 'Accidents' }
                                secondary={ 'Last 5 Years' }
                            />
                        </ListItem> }
                    </List> }
                </Grid>
                <Grid container item xs={ 4 } justify={ 'center' } alignContent={ 'center' }>
                    <Grid item container direction={ 'column' } justify={ 'center' } alignContent={ 'center' }>
                        <Grid item xs>
                            { this.state.port_complexity &&
                            <Typography style={{textAlign: 'center'}}>Navigational Complexity: { this.state.port_complexity }/5</Typography> }
                        </Grid>
                        <Grid item>
                            { this.state.port_complexity && <NavChart score={100*(this.state.port_complexity/5)} label={'sad'} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    }
}

export default SafetyRisk;
