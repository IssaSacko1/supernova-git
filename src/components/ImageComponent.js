import React from 'react';

const ImageComponent = ({ src, alt, className }) => {
  return (
    <div className={`intro_img ${className}`}>
      <div className='intro_img_hold'>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default ImageComponent;
