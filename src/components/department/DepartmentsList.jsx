import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
import axios from "axios";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);

  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDeleteDepartment = async () => {

    fetchDepartments()
    // const data = departments.filter(dep => dep._id !== id);
    // setFilteredDepartments(data)
  }

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found!");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons id={dep._id} onDeleteDepartment={onDeleteDepartment} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data); 
      } else { 
        alert("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    // Fetch data from API
    

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records  = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()) 
     )

     setFilteredDepartments(records)
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Manage Departments</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-2 border rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-2 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredDepartments}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default DepartmentsList;
