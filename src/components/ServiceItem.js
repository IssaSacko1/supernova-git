import React from 'react';

function ServiceItem({ service, index }) {
  return (
    <div className={`service-${index % 2 === 0 ? 'even' : 'odd'}`}>
      <div className='text'>
        <h2>{service.title}</h2>
        {service.content.split('\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      <div className={`box-image-${index + 1}`}>
        <div className="image-container">
          <img src={service.imageSrc} alt={service.title} className={service.className} />
          <span>{service.title}</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;
