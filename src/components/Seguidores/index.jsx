import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ListaSeguidores from "./ListaSeguidores";

class Seguidores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: ""
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }  

  render() {
    const { filterText } = this.state;
    return (
      <div>
        <SearchBar
          filterText={filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ListaSeguidores filterText={filterText} />
      </div>
    );
  }
}

export default Seguidores;
