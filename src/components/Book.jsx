import React, { useRef, useCallback, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

class BookErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Book Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-600 font-bold mb-2">Đã xảy ra lỗi</h2>
          <p className="text-red-500">Vui lòng thử lại sau</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const Book = ({ selectedChapter }) => {
  const bookRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [key, setKey] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (bookRef.current) {
        try {
          bookRef.current.pageFlip().destroy();
        } catch (error) {
          console.error('Error destroying book:', error);
        }
      }
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (selectedChapter) {
      setKey(prev => prev + 1);
    }
  }, [selectedChapter]);

  const onFlip = useCallback((e) => {
    console.log('Current page:', e.data);
  }, []);

  const handleReadText = (text) => {
    if (!text) return;
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsReading(false);
      return;
    }
    utteranceRef.current = new window.SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = speechRate;
    utteranceRef.current.onend = () => setIsReading(false);
    synthRef.current.speak(utteranceRef.current);
    setIsReading(true);
  };

  if (!isMounted) {
    return null;
  }

  const Page = React.forwardRef((props, ref) => {
    const isCover = props.number === 1;
    const isWelcome = !selectedChapter && props.number === 1;
    
    return (
      <div 
        className={`page relative ${isCover ? 'bg-gradient-to-br from-red-600 to-red-800' : 'bg-white'} 
          p-8 text-center flex flex-col justify-center items-center h-full box-border
          shadow-lg hover:shadow-2xl transition-shadow duration-300
          page-thick-effect`}
        ref={ref}
        style={{
          borderRadius: '12px',
          boxShadow: isCover
            ? '0 8px 24px 0 rgba(139,69,19,0.4), 0 1.5px 0 0 #a0522d inset'
            : '0 4px 16px 0 rgba(0,0,0,0.10), 0 0.5px 0 0 #e0e0e0 inset',
          transform: isCover ? 'perspective(600px) rotateY(-3deg)' : 'perspective(600px) rotateY(1deg)',
          borderLeft: !isCover ? '8px solid #e5e7eb' : undefined,
        }}
      >
        {!isCover && <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-r from-gray-300 to-transparent rounded-l-lg" style={{zIndex:2}}></div>}
        {!isCover && <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-l from-gray-300 to-transparent rounded-r-lg" style={{zIndex:2}}></div>}
        {isWelcome ? (
          <div className="welcome-content animate-fade-in">
            <h2 className="text-4xl text-white font-bold mb-6 uppercase">Cẩm nang Điện tử</h2>
            <div className="emblem-text font-bold text-xl text-white mb-8">CÔNG AN NHÂN DÂN VIỆT NAM</div>

            <div className="police-emblem max-w-[60%] mx-auto w-full  p-6 rounded-full shadow-2xl">
              <div className="emblem-star  flex justify-center text-4xl mb-2"><img className='w-24 h-24' src="/star.svg" alt="" /></div>
            </div>
          </div>
        ) : isCover ? (
          <div className="cover-design text-white">
            <div className="cover-title text-4xl font-bold mb-6 tracking-wider">CẨM NANG ĐIỆN TỬ</div>
            <div className="cover-subtitle text-2xl mb-1">CÔNG AN NHÂN DÂN VIỆT NAM</div>
            <div className="emblem-star  flex justify-center text-4xl mb-2"><img className='w-24 h-24' src="/star.svg" alt="" /></div>
            
           
          </div>
        ) : (
          <div className="chapter-content w-full max-w-2xl mx-auto">
            <div className="chapter-header mb-1 bg-gray-50 p-2 rounded-lg">
              <div className="chapter-icon text-4xl mb-3">{selectedChapter?.sectionIcon}</div>
              <div className="chapter-info">
                <h1 className="text-xl font-bold mb-2 text-gray-800">{selectedChapter?.title}</h1>
                <p className="section-name text-gray-600">{selectedChapter?.sectionTitle}</p>
              </div>
            </div>
            
            <div className="chapter-body">
              <div className="page-number text-sm text-gray-500 mb-6 border-b pb-2">Trang {props.number}</div>
              
              {props.number === 1 && (
                <div className="page-content">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Giới thiệu</h2>
                  <p className="mb-1 text-gray-700 leading-relaxed">{selectedChapter?.content}</p>
                  
                  <div className="content-section mb-1 bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Mục tiêu học tập</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Nắm vững các kiến thức cơ bản về {selectedChapter?.title.toLowerCase()}</li>
                      <li>Áp dụng hiệu quả trong công tác thực tiễn</li>
                      <li>Tuân thủ nghiêm túc các quy định của pháp luật</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 my-4 justify-center">
                    <button
                      className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition ${isReading ? 'opacity-60' : ''}`}
                      onClick={() => handleReadText(selectedChapter?.content)}
                      disabled={isReading}
                    >
                      {isReading ? 'Đang đọc...' : 'Đọc nội dung'}
                    </button>
                    <label className="flex items-center gap-2 text-gray-700">
                      Tốc độ:
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={speechRate}
                        onChange={e => setSpeechRate(Number(e.target.value))}
                        className="accent-blue-600"
                        style={{width:'80px'}}
                        disabled={isReading}
                      />
                      <span className="w-8 inline-block text-right">{speechRate.toFixed(1)}x</span>
                    </label>
                  </div>
                </div>
              )}

              {props.number === 2 && (
                <div className="page-content">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Chi tiết nội dung</h2>
                  
                  <div className="content-section mb-1 bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-green-800">1. Khái niệm và ý nghĩa</h3>
                    <p className="text-gray-700 leading-relaxed">Đây là phần giải thích chi tiết về khái niệm và ý nghĩa của {selectedChapter?.title.toLowerCase()} 
                       trong hệ thống công tác của Công an nhân dân Việt Nam.</p>
                  </div>

                  <div className="content-section mb-1 bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-800">2. Các nguyên tắc cơ bản</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Tuân thủ pháp luật và quy định của Đảng, Nhà nước</li>
                      <li>Bảo vệ quyền và lợi ích hợp pháp của công dân</li>
                      <li>Thực hiện đúng quy trình, thủ tục theo quy định</li>
                      <li>Phối hợp chặt chẽ với các cơ quan liên quan</li>
                    </ul>
                  </div>
                </div>
              )}

              {props.number >= 3 && (
                <div className="page-content">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Thực hành và ứng dụng</h2>
                  
                  <div className="content-section mb-1 bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800">Các bước thực hiện</h3>
                    <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                      <li>Chuẩn bị đầy đủ tài liệu, hồ sơ cần thiết</li>
                      <li>Thực hiện theo đúng quy trình đã được quy định</li>
                      <li>Ghi chép, lưu trữ thông tin một cách chính xác</li>
                      <li>Báo cáo kết quả theo đúng thời hạn</li>
                    </ol>
                  </div>

                  <div className="quiz-section bg-red-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4 text-red-800">📝 Câu hỏi ôn tập</h4>
                    <div className="space-y-4 text-gray-700">
                      <p>1. Nêu các nguyên tắc cơ bản khi thực hiện {selectedChapter?.title.toLowerCase()}?</p>
                      <p>2. Trình bày quy trình thực hiện chi tiết?</p>
                      <p>3. Những lưu ý quan trọng cần nhớ?</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <BookErrorBoundary>
      <div className="perspective-1000 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-lg shadow-2xl mx-auto w-full p-8">
        <HTMLFlipBook
          key={key}
          width={550}
          height={570}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="bg-white shadow-xl"
          ref={bookRef}
          onFlip={onFlip}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
        >
          <Page number={1} />
          <Page number={2} />
          <Page number={3} />
          <Page number={4} />
        </HTMLFlipBook>
      </div>
    </BookErrorBoundary>
  );
};

export default Book; 