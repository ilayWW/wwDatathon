import React, { Component } from 'react';
import { Grid, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { getCode } from 'country-list'
import ReactCountryFlag from "react-country-flag";
import PortCallsChart from "../components/PortCallsChart.component";
import IntelligenceRisk from "../components/IntelligenceRisk.component";
import Divider from "@material-ui/core/Divider";
import ClassesBarChart from "../components/BarsChart.component";


@inject('portsStore')
@inject('routing')
@observer
class PortPage extends Component {
    state = {
        portId: '',
        port: {}
    };

    async componentDidMount() {
        const { routing, portsStore } = this.props;
        const portId = routing.location.pathname.replace('/', '');

        let staticData = await fetch(`http://localhost:9000/ports/static/${ portId }`)
            .then(res => res.json());

        staticData = staticData[0];
        staticData.countryObj = {
            code: getCode(staticData.country||''),
            name: staticData.country
        };

        let port = staticData;
        if (!portsStore.ports.get(portId)) {
            const portImgData = await fetch(`http://localhost:9000/ports/${ portId }`)
                .then(res => res.json());
            Object.assign(port, portImgData[0]);
        }
        this.props.portsStore.setPorts([port]);
        this.setState({ port: Object.assign({}, portsStore.ports.get(portId), port) });
    }

    render() {
        const { routing} = this.props;
        const portId = routing.location.pathname.replace('/', '');
        if (this.state.port) {
            return (
                <Grid container justify={ 'center' } spacing={ 2 }>
                    <Grid item xs={ 10 }>
                        <Paper style={ { padding: '10px' } }>
                            <Grid container justify={ 'space-around' }>
                                <Grid item xs={ 5 }>
                                    <Typography variant={ 'h2' }>
                                        { this.state.port.port_name } Port
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <Typography variant={ 'body1' }>
                                                Country: {this.state.port.countryObj && <ReactCountryFlag code={this.state.port.countryObj.code} /> }
                                                {this.state.port.countryObj && this.state.port.countryObj.name}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant={ 'body1' }>
                                                ISPS Comply: {this.state.port.ISPSCompliance ? this.state.port.ISPSCompliance: 'N/A'}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Grid>

                                <Grid item xs={ 7 } container justify={ 'flex-end' }>
                                    <Grid item>
                                        <img height={ '250px' } src={ this.state.port.url } alt=""/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 10 }>
                        <Paper style={ { padding: '10px' } }>
                            <IntelligenceRisk id={portId}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 10 }>
                        <Typography variant={'h5'}>
                            Port Statistic
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={ 10 }>
                        <Paper style={ { padding: '10px' } }>
                            <PortCallsChart id={portId}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 5 }>
                        <Paper style={ { padding: '10px' } }>
                            <ClassesBarChart id={portId}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 5 }>
                        <Paper style={ { padding: '10px' } }>
                            <PortCallsChart id={portId}/>
                        </Paper>
                    </Grid>
                </Grid>)
        } else {
            return 'loading...'
        }

    }
}

export default PortPage;
