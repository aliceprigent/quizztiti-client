import React from "react";

const SearchBar = (props) => {
    console.log(props)
  return (
    <div>
      <input
        className="search-input"
        type="text"
        onChange={props.search}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
