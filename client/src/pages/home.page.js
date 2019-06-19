import React, { Component } from 'react';
import SearchBar from "../components/SearchBar.component";
import { Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject('portsStore')
@observer
class HomePage extends Component {

    state = {
        dataReady: false
    };


    render() {
        return <Grid style={ { height: '100vh', width: '100%' } } container justify={ 'center' } alignContent={ 'center' } alignItems={ 'center' }>
            <Grid item xs={8}>
                <SearchBar/>
            </Grid>
        </Grid>
    }
}

export default HomePage;
