import React, { useState } from 'react';

const Button = ({ onClick, label, highlight }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    backgroundColor: highlight ? '#16202C' : (isPressed ? '#16202C' : '#25384E'),
    border: '3px solid white',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    flex: '1 0 25%',
    boxSizing: 'border-box',
    fontSize: '20px',
    width: '70px',
    height: '70px',
    transition: 'background-color 0.3s',
  };

  return (
    <button
      style={buttonStyle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;
