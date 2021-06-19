import React from 'react';
import './Switch.css';

const Switch = () => {
  return (
    <div className='radio-switch'>
      <div className='video'>
        <div>
          <input
            className="react-switch-checkbox"
            id= {`react-switch-new`}
            type="checkbox"
          />
          <label
            className="react-switch-label"
            htmlFor={`react-switch-new`}
          >
            <span className={`react-switch-button`} />
          </label>
        </div>
        <div>
          <h2>Video</h2>
        </div>

      </div>
      <div className='music'>
        <div>
          <input
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            className="react-switch-label"
            htmlFor={`react-switch-new`}
          >
            <span className={`react-switch-button`} />
          </label>
        </div>
        <div>
          <h2>Music</h2>
        </div>
      </div>
      <div className='image'>
        <div>
          <input
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            className="react-switch-label"
            htmlFor={`react-switch-new`}
          >
            <span className={`react-switch-button`} />
          </label>
        </div>
        <div>
          <h2>Image</h2>
        </div>
      </div>
      <div className='text'>
        <div>
          <input
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            className="react-switch-label"
            htmlFor={`react-switch-new`}
          >
            <span className={`react-switch-button`} />
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