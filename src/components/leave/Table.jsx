import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, LeaveButtons } from '../../utils/LeaveHelpers';
import DataTable from 'react-data-table-component';

const Table = () => {

    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setFilteredLeaves] = useState(null);

    const fetchLeaves = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
              alert("No authentication token found!");
              return;
            }
    
            const response = await axios.get("https://employee-server-five.vercel.app/api/leave", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.data.success) {
              let sno = 1;
              const data = response.data.leaves.map((leave) => ({
                _id: leave._id,
                sno: sno++,
                employeeId: leave.employeeId.employeeId,
                name:leave.employeeId.userId.name,
                leaveType: leave.leaveType,
                department: leave.employeeId.department.dep_name,
                days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                status: leave.status,
                
                action: <LeaveButtons Id={leave._id} />,
              }));
              setLeaves(data);
              setFilteredLeaves(data);
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
    }


    useEffect (() => {
        fetchLeaves()
    }, [])

    const filterByInput = (e) => {
        const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data)
    };
    
    const filterByButton = (status) => {
        const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data)
    };

  return (
    <>
    {filteredLeaves ? (
    <div className='p-6'>
        <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3> {/* Fixed class */}
            </div>
            <div className="flex justify-between items-center mt- mb-6"> {/* Added spacing */}
                <input
                    type="text"
                    placeholder="Search By Emp Id" 
                    className="px-4 py-1 border rounded"
                    onChange={filterByInput}
                />
                <div className='space-x-3'>
                <button className='px-2 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700' 
                onClick={() => filterByButton("Pending")}>Pending</button>
                <button className='px-2 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700' onClick={() => filterByButton("Approved")}>Approved</button>
                <button className='px-2 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700' onClick={() => filterByButton("Rejected")}>Rejected</button>
                </div> 
            </div>

            <DataTable columns={columns} data={filteredLeaves} pagination/>
    </div>
    ) : <div>Loding</div>}
    </>
  )
}

export default Table