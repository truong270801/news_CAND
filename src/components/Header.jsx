import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <header className="bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white px-8 py-2 flex justify-between items-center shadow-lg relative z-50 md:flex-row flex-col md:gap-0 gap-4">
      {/* Left section with logo */}
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <img 
            src="/logo.jpg" 
            alt="Công An Việt Nam" 
            className="w-[60px] h-[60px] object-contain bg-white rounded-full p-[5px]" 
          />
          <div className="flex flex-col">
            <h1 className="m-0 text-2xl font-bold drop-shadow-md md:text-2xl text-xl">
              CẨM NANG ĐIỆN TỬ
            </h1>
            <p className="m-0 text-sm opacity-90 font-medium md:text-sm text-xs">
              CÔNG AN TỈNH QUẢNG NINH
            </p>
          </div>
        </div>
      </div>

      {/* Center section with search */}
      <div className="flex-1 max-w-[500px] mx-8 md:mx-8 mx-0 md:max-w-[500px] w-full">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm trong cẩm nang..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-5 py-3 pr-[50px] border-none rounded-full text-base outline-none bg-white/95 text-gray-800 shadow-md transition-all duration-300 ease-in-out focus:bg-white focus:shadow-lg focus:-translate-y-[1px]"
            />
            <button
              type="submit"
              className="absolute right-2 bg-[#c41e3a] border-none rounded-full w-9 h-9 flex items-center justify-center text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#8b0000] hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Right section with flag */}
      <div className="flex items-center">
        <div className="flex items-center">
          <img 
            src="/vietnam-flag.svg" 
            alt="Cờ Việt Nam" 
            className="w-[50px] h-[35px] object-cover rounded shadow-md" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 