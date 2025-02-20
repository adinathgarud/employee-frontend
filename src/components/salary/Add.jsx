import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmplopyeeHelpers'; // Ensure the path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,

    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();
     

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await fetchDepartments();
                setDepartments(departments);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) =>  {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }


    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(`https://employee-server-five.vercel.app/api/salary/add`, salary, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            } else {
                alert("Failed to add employee: " + response.data.message);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <>{departments  ? (
            <div className='items-center max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='w-full text-2xl font-bold mb-6 text-center'>Add Salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        {/* Department */}
                        <div>
                            <label className='block text-gray-700 text-sm font-medium'>Department</label>
                            <select
                                name="department"
                                onChange={handleDepartment}
                                
                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>


                        {/* Employee */}
                        <div >
                            <label className='block text-gray-700 text-sm font-medium'>Employee</label>
                            <select
                                name="employeeId"
                                onChange={handleChange}

                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>


                        {/* Designation */}
                        <div>
                            <label className='block text-gray-700 text-sm font-medium'>Basic Salary</label>
                            <input
                                type="number"
                                name="basicSalary"
                                onChange={handleChange}
                               
                                placeholder='Basic Salary'
                                required

                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className='block text-gray-700 text-sm font-medium'>Allowances</label>
                            <input
                                type="number"
                                name="allowances"                              
                                onChange={handleChange}
                                placeholder='Allowance'
                                required
                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                            />
                        </div>

                        <div>
                            <label className='block text-gray-700 text-sm font-medium'>Deductions</label>
                            <input
                                type="number"
                                name="deductions"                              
                                onChange={handleChange}
                                placeholder='Deductions'
                                required
                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                            />
                        </div>

                        <div>
                            <label className='block text-gray-700 text-sm font-medium'>Pay Date</label>
                            <input
                                type="date"
                                name="payDate"                              
                                onChange={handleChange}
                                required
                                className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
                            />
                        </div>


                    </div>
                    <button type="submit" className='w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-md'>Add Salary</button>
                </form>
            </div>
        ) : <div>Loding...</div>}</>
    );
}

export default AddSalary;