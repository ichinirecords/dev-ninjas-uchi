import React from 'react';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';

const Educational = () => {

  return (
    <div className='intro' style={{
      backgroundImage: `url("https://cdn.pixabay.com/photo/2019/01/25/13/43/artistic-3954528_1280.jpg")`,
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundRepeat: 'no-repeat',
      margin: 'auto',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}>
      <div className='foreground-text'>
        <div>
          <h1>Uchi: Home and belonging to all humanity!</h1>
          <h2><LoremIpsum p={1} /></h2>
        </div>
        <h2><LoremIpsum p={2} /></h2>
      </div>

    </div>
  )

}

export default Educational;
