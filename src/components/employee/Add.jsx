import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmplopyeeHelpers'; // Ensure the path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
            name: '',
            email: '',
            employeeId: '',
            dob : '',
            gender: '',
            maritalStatus: '',
            designation: '',
            department: '',
            salary: 0,
            password: '',
            role: '',
            image: null,
  });
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({...prevData, [name] : files[0]}));
    } else {
      setFormData((prevData) => ({...prevData, [name] : value}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a role for the employee.");
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key,  formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:3000/api/employee/add", formDataObj, {
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
    <div className='items-center max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='w-full text-2xl font-bold mb-6 text-center'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder='Insert Name'
              required
              
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder='Insert Email'
              required
              
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder='Employee ID'
              required
              
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Date of Birth</label>
            <input
              type="date"
              name="dob"
              required
              onChange={handleChange}
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Gender */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              required
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              required
              
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder='Designation'
              required
             
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Department */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Department</label>
            <select
              name="department"
              onChange={handleChange}
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder='Salary'
              required
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Password */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder='Password'
              required
              
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>

          {/* Role */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Role</label>
            <select
              name="role"
              onChange={handleChange}
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value="">Select Role</option>
              <option value="admin">admin</option>
              <option value="employee">employee</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className='block text-gray-700 text-sm font-medium'>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder='Upload Image'
              required
              accept='image/*'
              className='mt-2 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>
        </div>
        <button type="submit" className='w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-md'>Add Employee</button>
      </form>
    </div>
  );
}

export default Add;