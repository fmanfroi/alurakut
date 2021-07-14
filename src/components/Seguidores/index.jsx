import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ListaSeguidores from './ListaSeguidores';

class Seguidores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            filterText: ""
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    componentDidMount() {
        fetch('https://api.github.com/users/juunegreiros/followers')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }   

    render() {
        const { error, isLoaded, items, filterText } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <SearchBar
                        filterText={filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                    />
                    <ListaSeguidores 
                        segimores={items}
                        filterText={filterText}
                    />
                </div>
            );
        }
    }
}

export default Seguidores;
