import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { PortsStore } from './stores/ports.store';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const portsStore = new PortsStore();

const stores = {
    // Key can be whatever you want
    routing: routingStore,
    portsStore,
    // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider {...stores}>
            <Router history={history}>
                <CssBaseline />
                <App/>
            </Router>
        </Provider>
    </ThemeProvider>,
    document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
