import React, { Component } from 'react';
import SearchBar from "../components/SearchBar.component";
import { Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";

@inject('portsStore')
@observer
class HomePage extends Component {

    state = {
        dataReady: false
    };


    render() {
        return <Grid style={ { height: '70vh', width: '100%' } } container justify={ 'center' } alignContent={ 'center' } alignItems={ 'center' }>
            <Grid item xs={7} style={{paddingBottom:'50px', color:'#140F49'}}>
                <Typography variant={'h1'}>
                    <b>Port</b>Rate
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <SearchBar/>
            </Grid>
        </Grid>
    }
}

export default HomePage;
