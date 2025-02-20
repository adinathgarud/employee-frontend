import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Fetch data from API
        const fetchEmployees = async () => {

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authentication token found!");
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }

            } catch (error) {
                console.error("Error fetching Employee:", error);
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        };

        fetchEmployees();
    }, []);

    return (
        <>{employee ? (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='teaxt-2xl font-bold mb-8 text-center'>
                Employee Detail
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <img src={`http://localhost:3000/${employee.userId.profileImage}`} alt="" className='rounded-full border w-72' />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name :</p>
                        <p className='font-medium'>{employee.userId.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>EmployeeID :</p>
                        <p className='font-medium'>{employee.employeeId}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Date Of Birth :</p>
                        <p className='font-medium'>{new Date(employee.dob).toDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Gender :</p>
                        <p className='font-medium'>{employee.gender}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Department :</p>
                        <p className='font-medium'>{employee.department.dep_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Maritial Status :</p>
                        <p className='font-medium'>{employee.maritalStatus}</p>
                    </div>

                </div>
            </div> 
        </div>
        ): <div>Lodding....</div>}</>
    )
}

export default View