import React, { useState } from 'react';
import useStore from '../store/useStore';

const Sidebar = ({ onChapterSelect, searchQuery }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredSection, setHoveredSection] = useState(null);
  const { collapsed } = useStore();

  // Dữ liệu mẫu cho cẩm nang công an
  const handbookData = [
    {
      id: 1,
      title: "Giáo dục chính trị",
      icon: "🎯",
      chapters: [
        { id: 11, title: "Tư tưởng Hồ Chí Minh", content: "Nội dung về tư tưởng Hồ Chí Minh..." },
        { id: 12, title: "Chủ nghĩa Mác-Lênin", content: "Nội dung về chủ nghĩa Mác-Lênin..." },
        { id: 13, title: "Đường lối Đảng", content: "Nội dung về đường lối của Đảng..." }
      ]
    },
    {
      id: 2,
      title: "Pháp luật",
      icon: "⚖️",
      chapters: [
        { id: 21, title: "Luật Công an nhân dân", content: "Nội dung về luật Công an nhân dân..." },
        { id: 22, title: "Bộ luật Hình sự", content: "Nội dung về bộ luật hình sự..." },
        { id: 23, title: "Luật Tố tụng hình sự", content: "Nội dung về luật tố tụng hình sự..." },
        { id: 24, title: "Luật An ninh mạng", content: "Nội dung về luật an ninh mạng..." }
      ]
    },
    {
      id: 3,
      title: "Tổ chức",
      icon: "🏛️",
      chapters: [
        { id: 31, title: "Cơ cấu tổ chức", content: "Nội dung về cơ cấu tổ chức..." },
        { id: 32, title: "Chức năng nhiệm vụ", content: "Nội dung về chức năng nhiệm vụ..." },
        { id: 33, title: "Quy chế làm việc", content: "Nội dung về quy chế làm việc..." }
      ]
    },
    {
      id: 4,
      title: "Nghiệp vụ",
      icon: "🔍",
      chapters: [
        { id: 41, title: "Điều tra hình sự", content: "Nội dung về điều tra hình sự..." },
        { id: 42, title: "An ninh quốc gia", content: "Nội dung về an ninh quốc gia..." },
        { id: 43, title: "Trật tự xã hội", content: "Nội dung về trật tự xã hội..." },
        { id: 44, title: "Phòng cháy chữa cháy", content: "Nội dung về phòng cháy chữa cháy..." }
      ]
    },
    {
      id: 5,
      title: "Kỹ năng nghề nghiệp",
      icon: "💪",
      chapters: [
        { id: 51, title: "Kỹ năng giao tiếp", content: "Nội dung về kỹ năng giao tiếp..." },
        { id: 52, title: "Sử dụng vũ khí", content: "Nội dung về sử dụng vũ khí..." },
        { id: 53, title: "Võ thuật", content: "Nội dung về võ thuật..." },
        { id: 54, title: "Lái xe an toàn", content: "Nội dung về lái xe an toàn..." }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChapterClick = (chapter, section) => {
    onChapterSelect({
      ...chapter,
      sectionTitle: section.title,
      sectionIcon: section.icon
    });
  };

  const filteredData = searchQuery 
    ? handbookData.map(section => ({
        ...section,
        chapters: section.chapters.filter(chapter => 
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.chapters.length > 0)
    : handbookData;

  return (
    <div className={` bg-gradient-to-b  from-gray-50 to-gray-100  h-[calc(100vh-100px)] overflow-y-auto shadow-[2px_0_15px_rgba(0,0,0,0.15)] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#c41e3a] hover:scrollbar-thumb-[#8b0000] md:max-h-none max-h-[300px] md:w-[350px] w-full transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-[350px] opacity-100'}`}>
      <div className="sticky top-0 z-10 px-6 py-4 bg-gradient-to-br from-[#EEE5AA] to-[#EEE5AA] text-white border-b-2 border-[#EEE5AA] shadow-lg">
        <h2 className="m-0 text-[1.5rem] font-bold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] flex items-center">
          <span className="mr-3">📚</span>
          Mục lục
        </h2>
        {searchQuery && (
          <div className="mt-3 text-sm bg-white/20 p-2.5 rounded-lg backdrop-blur-sm border border-white/30">
            <span className="font-medium">Kết quả tìm kiếm:</span> "{searchQuery}"
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        {filteredData.map(section => (
          <div 
            key={section.id} 
            className="rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white transform transition-all duration-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div 
              className={`flex items-center p-4 cursor-pointer transition-all duration-300 border-b border-gray-100 ${
                expandedSections[section.id] 
                  ? 'bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white' 
                  : 'bg-gradient-to-br from-white to-gray-50 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100'
              }`}
              onClick={() => toggleSection(section.id)}
            >
              <span className={`text-2xl mr-3 transition-transform duration-300 ${
                hoveredSection === section.id ? 'scale-110' : ''
              }`}>{section.icon}</span>
              <span className="flex-1 font-semibold text-lg">{section.title}</span>
              <span className={`text-sm transition-all duration-300 ${
                expandedSections[section.id] ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </div>
            
            {expandedSections[section.id] && (
              <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-100">
                {section.chapters.map((chapter) => (
                  <div 
                    key={chapter.id}
                    className="relative pl-12 pr-4 py-3.5 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-[#c41e3a]/10 hover:to-transparent group"
                    onClick={() => handleChapterClick(chapter, section)}
                  >
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm transition-transform duration-300 group-hover:scale-110">📄</span>
                    <span className="text-[0.95rem] font-medium group-hover:text-[#c41e3a] transition-colors duration-300">{chapter.title}</span>
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#c41e3a] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 