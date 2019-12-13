import React from 'react';
import gif from '../../assets/loader.gif';

export default function Loader() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <img src={gif} alt="loader" />
    </div>
  );
}
