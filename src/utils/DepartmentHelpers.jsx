import axios from "axios"
import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name : "S No",
        selector: (row) => row.sno
    },
    {
        name : "Department Name",
        selector: (row) => row.dep_name, 
        sortable: true
    },
    {
        name : "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({id, onDeleteDepartment}) =>{
    const navigate = useNavigate()
    

    const handleDelete = async () =>{
        const confirm = window.confirm("Do You wangt to Delete?")
        if(confirm){
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found!");
                return;
            }

            const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                onDeleteDepartment(); 
            } 

        } catch (error) {
            console.error("Error fetching departments:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    } 
    }
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-2 bg-teal-600 text-white rounded-md"
            onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Edit
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-md" onClick={() => handleDelete(id)}>
                Delete
            </button>
        </div>
    )
}