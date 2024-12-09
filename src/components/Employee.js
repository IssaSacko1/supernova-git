import React from 'react';
import '../styles/Employee.css';


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
    </div>
  );
};

export default Employee;
