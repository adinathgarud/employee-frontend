import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmplopyeeHelpers";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No authentication token found!");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A", // Safe navigation operator for department
            name: emp.userId?.name || "N/A", // Safe navigation operator for userId
            dob: emp.dob ? new Date(emp.dob).toDateString() : "N/A", // Handle missing or invalid dob
            profileImage: emp.userId?.profileImage ? (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:3000/${emp.userId.profileImage}`}
                alt="Profile"
              />
            ) : (
              "No Image"
            ), // Handle missing profileImage
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          alert("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Manage Employee</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-2 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 rounded-full text-white"
        >
          Add New Employee
        </Link>
      </div>
      <DataTable columns={columns} data={filteredEmployees} pagination />
    </div>
  );
};

export default List;
