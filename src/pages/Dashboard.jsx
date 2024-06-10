import { useState } from "react";
import { NavLink,  Outlet } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useTrainer from "../hook/useTrainer";
import useMember from "../hook/useMember";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [isAdmin] = useAdmin();
    const [isTrainer] = useTrainer();
    const[isMember]= useMember();


    return (
        <div className="flex flex-col lg:flex-row container mx-auto lg:px-12 py-8 px-3">
            {/* Sidebar */}
            <div className={`fixed inset-0 z-50 min-h-screen bg-gray-400 dark:bg-gray-50 dark:text-gray-800 lg:static lg:flex lg:w-60 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full p-3 w-60">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2>Dashboard</h2>
                            <button className="lg:hidden p-2" onClick={toggleSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
                                    <rect width="352" height="32" x="80" y="96"></rect>
                                    <rect width="352" height="32" x="80" y="240"></rect>
                                    <rect width="352" height="32" x="80" y="384"></rect>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">
                                {/* conditional */}
                                
                                
                                {
                                    isAdmin &&
                                   <>
                                    <li className="rounded-sm">
                                    <NavLink to={'/dashboard/allUsers'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>All User</span>
                                   </a></NavLink>
                                </li>
                                    <li className="rounded-sm">
                                    <NavLink to={'/dashboard/allNewsSub'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>All NewsLetter Subscriber</span>
                                   </a></NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to={'/dashboard/allTrainerConfirmed'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>All Trainer</span>
                                   </a></NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to={'/dashboard/appliedTrainer'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>Applied Trainer</span>
                                   </a></NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to={'/dashboard/balance'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>Balance</span>
                                   </a></NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to={'/dashboard/addNewClass'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>Add New Class</span>
                                   </a></NavLink>
                                </li>
                                   </> 
                                }
                                {
                                    isTrainer  &&
                                    <>
                                     <li className="rounded-sm">
                                     <NavLink to={'/dashboard/manageSlot'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        
                                        <span>Manage Slot</span>
                                    </a></NavLink>
                                 </li>
                                     <li className="rounded-sm">
                                     <NavLink to={'/dashboard/addNewSlot'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        
                                        <span>Add New Slot</span>
                                    </a></NavLink>
                                 </li>
                                 <li className="rounded-sm">
                                     <NavLink to={'/dashboard/addNewForum'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        
                                        <span>Add New Forum</span>
                                    </a></NavLink>
                                 </li>
                                
                                 
                                    </> 
                                    
                                    
                                    
                                }
                                {
                                    isMember && 
                                    <>
                                    <li className="rounded-sm">
                                    <NavLink  to={'/dashboard/profile'}> <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                         
                                         <span>User Profile</span>
                                     </a></NavLink>
                                 </li>
                                
                                 <li className="rounded-sm">
                                     <NavLink to={'/dashboard/activity'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        
                                        <span>Activity Log</span>
                                    </a></NavLink>
                                 </li>
                                 <li className="rounded-sm">
                                     <NavLink to={'/dashboard/recommended'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        
                                        <span>Booked trainers</span>
                                    </a></NavLink>
                                 </li>
                                    </>
                                }
                                {/* shared */}
                               <hr />
                               <li className="rounded-sm">
                                    <NavLink to={'/'}><a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                       
                                       <span>Home</span>
                                   </a></NavLink>
                                </li>

                              
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 lg:ml-60">
                
                    <button className="lg:hidden p-2" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
                            <rect width="352" height="32" x="80" y="96"></rect>
                            <rect width="352" height="32" x="80" y="240"></rect>
                            <rect width="352" height="32" x="80" y="384"></rect>
                        </svg>
                    </button>
                    
               
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
