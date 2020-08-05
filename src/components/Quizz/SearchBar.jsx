import React from "react";

const SearchBar = (props) => {
    console.log(props)
  return (
   <React.Fragment>
      <input
        className="search-input"
        type="text"
        onChange={props.search}
        placeholder="Search..."
      />
    </React.Fragment>
  );
};

export default SearchBar;
