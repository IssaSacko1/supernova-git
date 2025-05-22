import React from 'react';
import '../styles/Employee.css';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg';



const Employee = ({ employee }) => {
  // Vérifiez que `employee` existe avant d'accéder à ses propriétés
  console.log(employee)
  if (!employee) {
    return null; // ou un message d'erreur, si vous le souhaitez
  }

  return (
    <div className="employee">
      <img src={employee.imageSrc} alt={employee.title} />
      <h3>{employee.title}</h3>
      <p>{employee.description}</p>
      <div className="social-network">
        <a href={employee.instagram}><img src={instagram} target="_blank" alt="instagram"/></a>
        <a href={employee.linkedin}><img src={linkedin} target="_blank" alt="linkedin"/></a>
      </div>
    </div>
  );
};

export default Employee;
