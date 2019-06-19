import { action, observable } from 'mobx';


export class PortsStore {

    @observable ports = new Map();

    constructor() {
    }

    @action
    setPorts(ports) {
        ports.forEach(portObj => {
            this.ports.set(portObj.port_id, portObj);
        })
    }
}
