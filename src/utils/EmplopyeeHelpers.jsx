import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
      name : "S No",
      selector: (row) => row.sno,
      width: "60px"
  },
  {
      name : "Name",
      selector: (row) => row.name, 
      sortable: true,
      width: "180px"
  },
  {
    name : "Image",
    selector: (row) => row.profileImage, 
    sortable: true,
    width: "100px"
},
{
  name : "Department",
  selector: (row) => row.dep_name, 
  sortable: true,
  width: "130px"
},
{
  name : "DoB",
  selector: (row) => row.dob, 
  sortable: true,
  width: "150px"
},
  {
      name : "Action",
      selector: (row) => row.action,
      center:true
  }
]

export const fetchDepartments = async () => {
    let departments
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
         departments = response.data.departments
      } 
    } catch (error) {
      
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } 
    }
    return departments
  };

  //Employee for salary form
  export const getEmployees = async (id) => {
    let employees
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found!");
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        employees = response.data.employees
      } 
    } catch (error) {
      
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } 
    }
    return employees
  };


  export const EmployeeButtons = ({Id}) =>{
    const navigate = useNavigate()
    

    
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-2 bg-teal-600 text-white rounded-md"
            onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                Viwe
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)} >
                Edit
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-md" 
            onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-md" onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)} >
                Leave
            </button>
        </div>
    )
}