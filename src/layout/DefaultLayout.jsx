import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex">
        <Sidebar collapsed={collapsed} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 bg-gray-50 max-h-screen mt-2 ">
            {children}
          </main>
      
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
