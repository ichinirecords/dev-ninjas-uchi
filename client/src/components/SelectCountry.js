import React from 'react';

const SelectCountry = ({ approvedArtwork, setApprovedArtwork, backupData }) => {
  const country = approvedArtwork.map(art => art.country);
  const onlyUnique = (value, index, item) => {
    return item.indexOf(value) === index;
  }
  let unique = country.filter(onlyUnique);
  unique = unique.filter(country => country !== null);

  const handleSelect = (e) => {
    const selectedCountry = approvedArtwork.filter(art => art.country === e.target.value);
    setApprovedArtwork(selectedCountry);
    if (e.target.value === '') setApprovedArtwork(backupData);
  }
  return (
    <div className='select-country'>
      <label htmlFor="select-country"></label>
      <select name="country" id="select-country" onChange={handleSelect}>
        <option value="">Select A Country</option>
        {unique.map(country => (<option value={country}>{country}</option>))}
      </select>
    </div>
  );
}

export default SelectCountry;