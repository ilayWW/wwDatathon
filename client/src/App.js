import React, { Component } from 'react';
import './App.css';
import { Grid } from "@material-ui/core";
import HomePage from "./pages/home.page";
import { Route } from "react-router";
import PortPage from "./pages/Port.page";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";

@inject('routing')
@observer
class App extends Component {

    state = {
        apiResponse: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        const isHomePage = this.props.routing.location.pathname === '/';
        return <Grid style={ { height: '500vh', backgroundColor: '#B3E5FC' } }>
            <AppBar position="static" color="default" style={{marginBottom: '20px'}}>
                <Toolbar>
                    <Typography variant="h6" color="primary">
                        {isHomePage ? 'Search Port': 'Port Details'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:portId" component={PortPage} />
        </Grid>
    }
}

export default App;
