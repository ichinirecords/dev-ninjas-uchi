import React, { useState, useEffect } from "react";

const SearchBar = ({ setApprovedArtwork, backupData }) => {
  const [searchInput, setSearchInput] = useState('');
  const tempArray = [...backupData];

  useEffect(() => {
    const filteredArtWork = tempArray.filter((artWork) => {
      return (artWork.title.toLowerCase().includes(searchInput)) ||
        (artWork.artist_name.toLowerCase().includes(searchInput)) ||
        (artWork.content_text.toLowerCase().includes(searchInput));
    });
    setApprovedArtwork(filteredArtWork);
    if (searchInput === '') setApprovedArtwork(backupData);

  }, [searchInput]);

  return (
    <div key="searchbar" className="search-input-wrapper">
      <i className="fas fa-search"></i>
      <input
        type="search"
        className="search-bar"
        placeholder="Search ..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
      />
    </div>
  );
}

export default SearchBar;