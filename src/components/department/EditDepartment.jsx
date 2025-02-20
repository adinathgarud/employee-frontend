import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({ dep_name: '', description: '' });
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch data from API
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authentication token found!");
                    return;
                }

                const response = await axios.get(`https://employee-server-five.vercel.app/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setDepartment(response.data.department);
                } 

            } catch (error) {
                console.error("Error fetching departments:", error);
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An unexpected error occurred.");
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo here
        try {
            const response = await axios.put(`https://employee-server-five.vercel.app/api/department/${id}`, department, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep-name" className="text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name}
                                placeholder="Enter department name"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                value={department.description}
                                placeholder="Enter description"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-2 rounded"
                        >
                            Edit Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;