import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from API
        const fetchLeave = async () => {

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authentication token found!");
                    return;
                }

                const response = await axios.get(`https://employee-server-five.vercel.app/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setLeave(response.data.leave);
                }

            } catch (error) {
                console.error("Error fetching Leave:", error);
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        };

        fetchLeave();
    }, [id]);

    const changeStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found!");
                return;
            }

            const response = await axios.put(`https://employee-server-five.vercel.app/api/leave/${id}`,{status}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }

        } catch (error) {
            console.error("Error fetching Leave:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    }

    return (
        <>{leave ? (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
                Leave Detail
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <img src={`https://employee-server-five.vercel.app/${leave.employeeId.userId.profileImage}`} alt="" className='rounded-full border w-72' />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name :</p>
                        <p className='font-medium'>{leave.employeeId.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>EmployeeID :</p>
                        <p className='font-medium'>{leave.employeeId.employeeId}</p>
                    </div>
                    
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Leave Type :</p>
                        <p className='font-medium'>{leave.leaveType}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Reason :</p>
                        <p className='font-medium'>{leave.reason}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Department :</p>
                        <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Start Date :</p>
                        <p className='font-medium'>{new Date(leave.startDate).toDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>End Date :</p>
                        <p className='font-medium'>{new Date(leave.endDate).toDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>
                        {leave.status === "Pending" ? "Action:" : "Status"}
                        </p>
                        {leave.status === "Pending" ? (
                            <div className='flex space-x-2'>
                                <button className='px-2 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700' 
                                onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                                <button className='px-2 py-2 rounded-md bg-red-600 text-white hover:bg-red-700' onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                            </div>
                        ):
                        <p className='font-medium'>{leave.status}</p>
                        }
                        
                    </div>

                </div>
            </div> 
        </div>
        ): <div>Lodding....</div>}</>
    )
}

export default Detail