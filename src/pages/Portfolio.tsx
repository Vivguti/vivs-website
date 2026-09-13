import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import FlipbookControls from '../components/flipbook/FlipbookControls';
import FlipbookViewer from '../components/flipbook/FlipbookViewer';
import ThumbnailDrawer from '../components/flipbook/ThumbnailDrawer';

const PDF_URL = "/portfolio/Viv's Portfolio (Current 2026 Version).pdf";
const TOTAL_PAGES = 25;

export default function Portfolio() {
  const [numPages, setNumPages] = useState<number>(TOTAL_PAGES);
  const [currentSpread, setCurrentSpread] = useState(0); 
  const maxSpread = Math.ceil(TOTAL_PAGES / 2);
  
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  // const height = typeof window !== 'undefined' ? window.innerHeight : 800;
      // Single page if strictly mobile width OR if the screen is taller than it is wide (portrait mode tablet/phone)
      setIsSinglePage(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Idle timer for auto-hiding controls
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 3000);
    };
    
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    window.addEventListener('keydown', resetIdle);
    
    resetIdle();
    
    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      clearTimeout(timeout);
    };
  }, []);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const goNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);

    if (isSinglePage) {
      if (currentSpread < TOTAL_PAGES - 1) setCurrentSpread(prev => prev + 1);
      else setCurrentSpread(0);
    } else {
      if (currentSpread < maxSpread - 1) setCurrentSpread(prev => prev + 1);
      else setCurrentSpread(0);
    }
    setZoom(1);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);

    if (currentSpread > 0) setCurrentSpread(prev => prev - 1);
    setZoom(1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'Escape') {
      setZoom(1);
      setShowThumbnails(false);
    }
    if (e.key === 'Home') setCurrentSpread(0);
    if (e.key === 'End') setCurrentSpread(isSinglePage ? TOTAL_PAGES - 1 : maxSpread - 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = "Viv's Portfolio (Current 2026 Version).pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prevent zooming out too far
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-[100] bg-[#e5e5e5] flex flex-col font-body overflow-hidden"
    >
      {/* Top Bar */}
      <header className={`flex items-center justify-between px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))] bg-[#e5e5e5] z-10 transition-opacity duration-500 ${isFullscreen || isIdle ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center gap-4">
          <Link to="/selected-works" className="text-gray-500 hover:text-black flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors" aria-label="Back to Selected Works">
            <ChevronLeft size={16} />
            BACK TO SELECTED WORKS
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleDownload} className="text-gray-500 hover:text-black transition-colors" aria-label="Download portfolio PDF">
            <Download size={20} />
          </button>
        </div>
      </header>

      {/* Main Viewer Area */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden touch-pan-x touch-pan-y" style={{ cursor: zoom > 1 ? 'grab' : 'default' }}>
        <FlipbookViewer 
          pdfUrl={PDF_URL}
          currentSpread={currentSpread}
          isMobile={isSinglePage}
          zoom={zoom}
          isFullscreen={isFullscreen}
          onLoadSuccess={handleDocumentLoadSuccess}
          onPageChange={(pageIndex) => {
            setCurrentSpread(isSinglePage ? pageIndex : Math.floor((pageIndex + 1) / 2));
          }}
        />
        
        {/* Navigation Overlays */}
        <button 
          onClick={goPrev} 
          disabled={currentSpread === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur hover:bg-white/80 disabled:opacity-0 transition-all duration-300 z-20 ${isIdle ? 'opacity-0' : 'opacity-100'}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        
        <button 
          onClick={goNext} 
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur hover:bg-white/80 transition-all duration-300 z-20 ${isIdle ? 'opacity-0' : 'opacity-100'}`}
          aria-label="Next page"
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>
      </main>

      {/* Bottom Controls */}
      <div className={`transition-opacity duration-500 pb-[env(safe-area-inset-bottom)] ${isIdle && !showThumbnails ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <FlipbookControls 
          currentSpread={currentSpread}
          totalSpreads={isSinglePage ? numPages : maxSpread}
          isMobile={isSinglePage}
          onToggleThumbnails={() => setShowThumbnails(!showThumbnails)}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          zoom={zoom}
        />
      </div>

      {/* Thumbnails Drawer */}
      <AnimatePresence>
        {showThumbnails && (
          <ThumbnailDrawer 
            pdfUrl={PDF_URL}
            numPages={numPages}
            onSelectPage={(pageIndex) => {
              setCurrentSpread(isSinglePage ? pageIndex : Math.floor((pageIndex + 1) / 2));
              setShowThumbnails(false);
            }}
            onClose={() => setShowThumbnails(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
