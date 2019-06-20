import React from 'react';
import Chart from "react-apexcharts";
import { inject, observer } from 'mobx-react';
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

@inject('routing')
@inject('portsStore')
@observer
class PrevNext extends React.Component {
    state = {};

    fetchData = async () => {
        const [response] = await fetch(`http://localhost:9000/ports/prevNext/${ this.props.id }`)
            .then(res => res.json());

        this.setState({
            prevs: response.prevs,
            nexts: response.nexts,
        })
    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return <Grid container justify={ 'space-around' }>
            <Grid item>
                Previous Ports
                <List>
                    { this.state.prevs && this.state.prevs.map((nextPort) => <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ArrowBack />
                                </Avatar>
                            </ListItemAvatar>
                            <a href={ `localhost:3000/${ nextPort[0] }` }>
                                <ListItemText
                                    primary={ nextPort[1] }
                                />
                            </a>
                        </ListItem>
                    ) }
                </List>
            </Grid>
            <Grid item>
                Destination Ports
                <List>
                    { this.state.nexts && this.state.nexts.map((nextPort) => <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ArrowForward />
                                </Avatar>
                            </ListItemAvatar>
                            <a href={ `localhost:3000/${ nextPort[0] }` }>
                                <ListItemText
                                    primary={ nextPort[1] }
                                />
                            </a>
                        </ListItem>
                    ) }
                </List>
            </Grid>
        </Grid>
    }
}

export default PrevNext;
