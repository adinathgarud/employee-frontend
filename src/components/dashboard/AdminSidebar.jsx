import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaAssistiveListeningSystems, FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'
const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 flex items-center'>
            <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
        </div>
        <div className='px-5'>
            <NavLink to="/admin-dashboard" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`} end>
                <FaTachometerAlt/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard/employees" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`}>
                <FaUsers/>
                <span>Employee</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`}>
                <FaBuilding />
                <span>Department</span>
            </NavLink>
            <NavLink to="/admin-dashboard/leaves" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`}>
                <FaCalendarAlt/>
                <span>Leave</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary/add" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`}>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard/setting" className={ ({isActive})=> ` ${isActive ? "bg-teal-500" : "  "} flex items-center space-x-2 px-5 py-2.5 rounded`}>
                <FaCogs/>
                <span>Setting</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar