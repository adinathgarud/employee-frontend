import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const { user } = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found!");
                return;
            }

            const response = await axios.post("http://localhost:3000/api/leave/add", leave, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            console.error("Error submitting leave request:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                        <select
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">From Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">To Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="reason"
                            value={leave.reason}
                            placeholder="Reason for leave"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Request Leave
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Add;
