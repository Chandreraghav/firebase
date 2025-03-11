import React from 'react';

interface EmployeeProps {
    firstName: string;
    lastName: string;
    position: string;
}

const EmployeeCard: React.FC<EmployeeProps> = ({ firstName, lastName, position }) => {
    return (
        <div className='employee-card'>
            <h3>{firstName} {lastName}</h3>
            <p>{position}</p>
        </div>
    );
};

export default EmployeeCard;