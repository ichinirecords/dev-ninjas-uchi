import React from 'react';

const SelectCountry = () => {
  return(
    <div className='select-country'>
      <label htmlFor="select-country"></label>
      <select name="country" id="select-country">
        <option value="">Select A Country</option>
        <option value="">Sudan</option>
        <option value="">Syria</option>
        <option value="">Iran</option>
        <option value="">Egypt</option>
        <option value="">Nigeria</option>
        <option value="">Ethiopia</option>
      </select>
    </div>
  )
}

export default SelectCountry;