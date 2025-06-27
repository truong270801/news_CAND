import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';

const DefaultLayout = ({ children }) => {
  const { collapsed, toggleSidebar, searchQuery, setSearchQuery, setSelectedChapter } = useStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
      <div className="flex-1 flex">
        <Sidebar collapsed={collapsed} searchQuery={searchQuery} onChapterSelect={setSelectedChapter} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1  bg-gray-50 max-h-screen  ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
