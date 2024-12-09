import React from 'react';
import Marquee from 'react-fast-marquee';

const LogoComponent = ({ logos }) => {
  return (
    <div className="logo-container">
      <Marquee speed={150}>
        {logos.map((logo, idx) => (
          <div className="logo" key={idx}>
            <img src={logo.src} alt={logo.figcaption.title} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoComponent;
