import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './index.css'
 
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivetRoutes from "./utils/PrivetRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentsList from "./components/department/DepartmentsList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import EmployeeView from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add"
import ViewSalary from "./components/salary/View"
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List"
import LeaveAdd from "./components/leave/Add"
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route> 
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivetRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivetRoutes>
          
          }>

            <Route index element={<AdminSummary/>}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentsList/>}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>           
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
            
            <Route path="/admin-dashboard/employees" element={<List/>}></Route>
            <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<EmployeeView/>}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
                        
            <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>

            <Route path="/admin-dashboard/leaves" element={<Table/>}></Route>
            <Route path="/admin-dashboard/leaves/:id" element={<Detail/>}></Route>
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList/>}></Route>

            <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>



          </Route>
        <Route path="/employee-dashboard" element={
          <PrivetRoutes>
            <RoleBaseRoutes requiredRole={["admin","employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivetRoutes>
          
          }>

              <Route index element={<Summary/>}></Route>
              <Route path="/employee-dashboard/profile/:id" element={<EmployeeView />}></Route>
              <Route path="/employee-dashboard/leaves/:id" element={<LeaveList/>}></Route>
              <Route path="/employee-dashboard/add-leave" element={<LeaveAdd/>}></Route>
              <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
              <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>


          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
