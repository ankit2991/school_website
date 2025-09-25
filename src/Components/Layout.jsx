import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <>
      {/* Pass toggle handler to Header */}
      <Header onToggleSidebar={() => setSidebarToggle(!sidebarToggle)} />

      <div className="flex mt-16 w-full">
        {/* Sidebar receives toggle state */}
       

        {/* Use context to pass values to child routes */}
        <div className={`${sidebarToggle?"mr-64":"mr-0"} w-full transition-all duration-700 ease-in-out overflow-y-hidden`}>

        <Outlet context={{ sidebarToggle, setSidebarToggle }} />
         
        </div>
        <Sidebar sidebarToggle={sidebarToggle}  setSidebarToggle={setSidebarToggle} />
        
      </div>
    </>
  );
}

export default Layout;
  