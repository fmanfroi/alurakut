import React from "react";

function SearchBar(props) {
  const { filterText } = props;

  const handleFilterTextChange = e => {
    props.onFilterTextChange(e.target.value);
  };
  
  return (
    <form>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={handleFilterTextChange}
      />  
    </form>
  );
}

export default SearchBar;
