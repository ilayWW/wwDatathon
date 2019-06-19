import React from 'react';
import AsyncSelect from 'react-select/async';
import { inject, observer } from 'mobx-react';

@inject('routing')
@inject('portsStore')
@observer
class SearchBar extends React.Component {
    state = {
        selectedOption: null,
        ports: [],
        inputValue: ''
    };
    handleChange = selectedOption => {
        const { push } = this.props.routing;
        push(`/${ selectedOption.value }`);
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    loadOptions = async (inputValue, callback) => {
        try {
            const response = await fetch(`http://localhost:9000/ports/images/${ inputValue || '' }`)
                .then(res => res.json());
            const arrPorts = response
                .map(({ port_id, port_name }) => {
                    return {
                        value: port_id,
                        label: port_name,
                    }
                });
            this.props.portsStore.setPorts(response);
            return arrPorts;
        } catch ( e ) {
            console.error(e)
        }
    };

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };

    async componentDidMount() {
        await this.loadOptions();
    }

    render() {
        return (<>
                {
                    this.props.portsStore.ports.size ? <AsyncSelect
                        cacheOptions
                        loadOptions={ this.loadOptions }
                        defaultOptions
                        placeholder={ 'Search for Port...' }
                        onChange={ this.handleChange }
                        onInputChange={ this.handleInputChange }
                    /> : 'loading..'
                }
            </>
        );
    }
}

export default SearchBar;
