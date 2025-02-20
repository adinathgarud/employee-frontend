import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Ensure this import is included
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const List = () => {

    const {user} = useAuth()
    const [leaves, setLeaves] = useState(null)
    let sno = 1;
    const {id} = useParams()

    const fetchLeaves = async () => {

        try {
            const token = localStorage.getItem("token");
            

            const response = await axios.get(`https://employee-server-five.vercel.app/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setLeaves(response.data.leaves);
                
            }
            console.log(response.data)

        } catch (error) {
            console.error("Error fetching Employee:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };
    useEffect(() => {
        fetchLeaves()
    }, [])

    if(!leaves){
        return <div>Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3> {/* Fixed class */}
            </div>
            <div className="flex justify-between items-center mt-4"> {/* Added spacing */}
                <input
                    type="text"
                    placeholder="Search By Dep Name" 
                    className="px-4 py-1 border rounded"
                />
                {user.role === "employee" && (
                <Link 
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Leave
                </Link>
            )}
            </div>

            <table className='w-full texxt-sm text-left text-gray-500 mt-6'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>SNO</th>
                                <th className='px-6 py-3'>Leave Type</th>
                                <th className='px-6 py-3'>From </th>
                                <th className='px-6 py-3'>To</th>
                                <th className='px-6 py-3'>Description</th>
                                <th className='px-6 py-3'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr 
                                key={leave._id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                                >
                                    <td className='px-6 py-3'>{sno++}</td>
                                    <td className='px-6 py-3'>{leave.leaveType}</td>
                                    <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className='px-6 py-3'>{leave.reason}</td>
                                    <td className='px-6 py-3'>{leave.status}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>

        </div>
    );
};

export default List;
