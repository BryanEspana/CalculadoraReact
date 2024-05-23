import React from 'react';

const Display = ({ value }) => {
  return (
    <div style={displayDesing} className="display">
      {value}
    </div>
  );
};

export default Display;

const displayDesing = {
  
  backgroundColor: '#25384E',
  border: '3px solid white',
  color: 'white',
  textAlign: 'right',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '40px',
  width: '96.3%',
  height: '60px',
  padding: '20px'

};
