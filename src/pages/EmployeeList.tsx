import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

const auth = getAuth();

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  department: string;
  position: string;
  salary: number | string;
  doj: string;
  employmentType: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    firstName: "",
    lastName: "",
    dob: "",
    department: "",
    position: "",
    salary: "",
    doj: "",
    employmentType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employeeList: Employee[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (showForm) {
      document.getElementById("employee-form")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditingEmployee(null);
    setNewEmployee({
      firstName: "",
      lastName: "",
      dob: "",
      department: "",
      position: "",
      salary: "",
      doj: "",
      employmentType: "",
    });
    setShowForm(false);
  };

  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      const employeeRef = doc(db, "employees", editingEmployee.id);

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp
        )
      );

      await updateDoc(employeeRef, newEmployee);
      resetForm();
    } else {
      const tempId = Math.random().toString(36).substring(2, 9);
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        { id: tempId, ...newEmployee },
      ]);

      const docRef = await addDoc(collection(db, "employees"), newEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === tempId ? { ...emp, id: docRef.id } : emp
        )
      );

      resetForm();
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      dob: employee.dob,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      doj: employee.doj,
      employmentType: employee.employmentType,
    });
    setShowForm(true);
  };

  return (
    <div className="employee-container">
      <h2>People</h2>
      <button className="add-employee-btn" onClick={() => setShowForm(true)}>+ Add New Employee</button>

      {showForm && (
        <form id="employee-form" className="employee-form" onSubmit={handleSaveEmployee}>
          <input type="text" name="firstName" placeholder="First Name" value={newEmployee.firstName} onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={newEmployee.lastName} onChange={handleInputChange} required />
          <input type="date" name="dob" value={newEmployee.dob} onChange={handleInputChange} required />
          <input type="text" name="department" placeholder="Department" value={newEmployee.department} onChange={handleInputChange} required />
          <input type="text" name="position" placeholder="Role" value={newEmployee.position} onChange={handleInputChange} required />
          <input type="number" name="salary" placeholder="Salary (€)" value={newEmployee.salary} onChange={handleInputChange} required />
          <select name="employmentType" value={newEmployee.employmentType} onChange={handleInputChange} required>
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <button type="submit">{editingEmployee ? "Update Employee" : "Add Employee"}</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </form>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>D.O.E</th>
            <th>Employment Type</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.doj}</td>
              <td>{employee.employmentType}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>€{employee.salary}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployeeList;
