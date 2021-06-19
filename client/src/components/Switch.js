import React from 'react';
import './Switch.css';

const Switch = () => {
  return (
    <div className='radio-switch'>
      <div className='video'>
        <div>
          <input
            className="switch-checkbox"
            id={`video`}
            type="checkbox"
          />
          <label
            className="switch-label"
            htmlFor={`video`}
          >
            <span className={`switch-button`} />
          </label>
        </div>
        <div>
          <h2>Video</h2>
        </div>

      </div>
      <div className='music'>
        <div>
          <input
            className="switch-checkbox"
            id={`image`}
            type="checkbox"
          />
          <label
            className="switch-label"
            htmlFor={`image`}
          >
            <span className={`switch-button`} />
          </label>
        </div>
        <div>
          <h2>Music</h2>
        </div>
      </div>
      <div className='image'>
        <div>
          <input
            className="switch-checkbox"
            id={`music`}
            type="checkbox"
          />
          <label
            className="switch-label"
            htmlFor={`music`}
          >
            <span className={`switch-button`} />
          </label>
        </div>
        <div>
          <h2>Image</h2>
        </div>
      </div>
      <div className='text'>
        <div>
          <input
            className="switch-checkbox"
            id={`text`}
            type="checkbox"
          />
          <label
            className="switch-label"
            htmlFor={`text`}
          >
            <span className={`switch-button`} />
          </label>
        </div>
        <div>
          <h2>Text</h2>
        </div>
      </div>
    </div>
  );
};

export default Switch;