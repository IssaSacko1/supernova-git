import React from 'react';
import '../styles/Employee.css';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg';



const Employee = ({ employee }) => {
  // Vérifiez que `employee` existe avant d'accéder à ses propriétés
  if (!employee) {
    return null; // ou un message d'erreur, si vous le souhaitez
  }

  return (
    <div className="employee">
      <img src={employee.imageSrc} alt={employee.title} />
      <h3>{employee.title}</h3>
      <p>{employee.description}</p>
      <div className="social-network">
        <a href='http://google.com'><img src={instagram} alt="instagram"/></a>
        <a href='http://google.com'><img src={linkedin} alt="linkedin"/></a>
      </div>
    </div>
  );
};

export default Employee;
