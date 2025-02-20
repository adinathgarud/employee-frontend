import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmplopyeeHelpers"; // Ensure the path is correct
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments.");
      }
    };

    getDepartments();
  }, []);

  // Fetch employee details
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
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
          const employee = response.data.employee;
          setEmployee({
            name: employee.userId?.name || "",
            maritalStatus: employee.maritalStatus || "",
            designation: employee.designation || "",
            salary: employee.salary || "",
            department: employee.department || "",
          });
        } else {
          setError("Failed to fetch employee details.");
        }
      } catch (err) {
        console.error("Error fetching Employee:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert("Failed to edit employee: " + response.data.message);
      }
    } catch (err) {
      console.error("Error editing employee:", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="items-center max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="w-full text-2xl font-bold mb-6 text-center">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Insert Name"
              required
              className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              required
              value={employee.maritalStatus}
              className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={employee.designation}
              placeholder="Designation"
              required
              className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Salary"
              required
              className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium">Department</label>
            <select
              name="department"
              onChange={handleChange}
              value={employee.department}
              className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-md"
        >
          Edit Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
