import React, { useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Book = () => {
  const bookRef = useRef();

  const Page = React.forwardRef((props, ref) => {
    const isCover = props.number === 1;
    return (
      <div 
        className={`page ${isCover ? 'bg-red-600' : 'bg-white'} p-10 text-center flex flex-col justify-center items-center h-full box-border `} 
        ref={ref}
      >
        <h2 className={`text-3xl font-bold ${isCover ? 'text-white' : 'text-gray-700'} mb-4`}>{props.title}</h2>
        <p className={`text-lg ${isCover ? 'text-white' : 'text-gray-600'} leading-relaxed max-w-[80%] mx-auto`}>{props.content}</p>
      </div>
    );
  });

  const onFlip = useCallback((e) => {
    console.log('Current page:', e.data);
  }, []);

  const onChangeState = useCallback((e) => {
    console.log('Book state:', e.data);
  }, []);

  return (
    <div className="perspective-1000 bg-[#8B4513] rounded-lg shadow-lg mx-auto w-full">
      <HTMLFlipBook
        width={550}
        height={600}
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
        onChangeState={onChangeState}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
      >
        <Page number={1} title="Trang Bìa" content="Chào mừng đến với quyển sách của chúng ta!" />
        <Page number={2} title="Trang 1" content="Đây là nội dung trang 1 của quyển sách." />
        <Page number={3} title="Trang 2" content="Đây là nội dung trang 2 của quyển sách." />
        <Page number={4} title="Trang 3" content="Đây là nội dung trang 3 của quyển sách." />
        <Page number={5} title="Trang 4" content="Đây là nội dung trang 4 của quyển sách." />
        <Page number={6} title="Trang Cuối" content="Cảm ơn bạn đã đọc quyển sách này!" />
      </HTMLFlipBook>
    </div>
  );
};

export default Book; 