import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
}

interface EmployeeState {
    employees: Employee[];
}

const initialState: EmployeeState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees(state, action: PayloadAction<Employee[]>) {
            state.employees = action.payload;
        },
        addEmployee(state, action: PayloadAction<Employee>) {
            state.employees.push(action.payload);
        },
    },
});

export const { setEmployees, addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;