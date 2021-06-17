import React from 'react';

const SelectCountry = () => {
  return(
    <div className='select-country'>
      <label for="select-country"></label>
      <select name="pets" id="select-country">
        <option value="">Select A Country</option>
        <option value="dog">Sudan</option>
        <option value="cat">Syria</option>
        <option value="hamster">Iran</option>
        <option value="parrot">Egypt</option>
        <option value="spider">Nigeria</option>
        <option value="goldfish">Ethiopia</option>
      </select>
    </div>
  )
}

export default SelectCountry;