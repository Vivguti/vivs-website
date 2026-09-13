import { useState, useRef, useEffect, forwardRef } from 'react';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';

// @ts-ignore
const FlipBook = HTMLFlipBook as any;

interface FlipbookViewerProps {
  pdfUrl: string;
  isMobile: boolean;
  zoom: number;
  isFullscreen: boolean;
  onLoadSuccess: (data: { numPages: number }) => void;
  onPageChange?: (pageIndex: number) => void;
}

// Create a wrapper component for the page so react-pageflip can inject its refs
const PageWrapper = forwardRef<HTMLDivElement, { pageNumber: number, width: number }>(
  ({ pageNumber, width }, ref) => {
    return (
      <div ref={ref} className="bg-black overflow-hidden flex items-center justify-center h-full w-full">
        <Page 
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          devicePixelRatio={Math.max(window.devicePixelRatio || 1, 2)}
          className="pointer-events-none"
        />
      </div>
    );
  }
);
PageWrapper.displayName = 'PageWrapper';

export default function FlipbookViewer({ 
  pdfUrl, 
  currentSpread,
  isMobile, 
  zoom, 
  isFullscreen,
  onLoadSuccess,
  onPageChange
}: FlipbookViewerProps & { currentSpread: number }) {
  
  const [error, setError] = useState<Error | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!aspectRatio || !containerRef.current) return;
    
    const updateSize = () => {
      const cw = containerRef.current!.clientWidth;
      const ch = containerRef.current!.clientHeight;
      
      // If fullscreen, minimize padding so it fills the screen
      const horizontalPadding = isFullscreen ? 16 : (isMobile ? 32 : 120);
      const verticalPadding = isFullscreen ? 16 : (isMobile ? 120 : 160); 
      
      const maxAvailableWidth = cw - horizontalPadding;
      const maxAvailableHeight = ch - verticalPadding;

      // Single page max width based on available space
      const maxPageWidth = isMobile ? maxAvailableWidth : maxAvailableWidth / 2;

      // Fit to screen algorithm
      let targetWidth = maxPageWidth;
      let targetHeight = targetWidth / aspectRatio;

      if (targetHeight > maxAvailableHeight) {
        targetHeight = maxAvailableHeight;
        targetWidth = targetHeight * aspectRatio;
      }

      setDimensions({ width: targetWidth, height: targetHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isMobile, aspectRatio, isFullscreen]);

  const [resetKey, setResetKey] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      const pageFlip = flipBookRef.current.pageFlip();
      const targetPage = isMobile ? currentSpread : currentSpread * 2;
      
      if (pageFlip.getCurrentPageIndex() !== targetPage && !isResetting) {
        // If looping back to the cover from deep in the book, trigger smooth reset
        if (targetPage === 0 && pageFlip.getCurrentPageIndex() > 2) {
          setIsResetting(true);
        } else {
          pageFlip.flip(targetPage);
        }
      }
    }
  }, [currentSpread, isMobile, isResetting]);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setResetKey(prev => prev + 1);
        setIsResetting(false);
      }, 400); // Wait for fade out to complete
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);
    onLoadSuccess({ numPages: pdf.numPages });

    // Fetch the aspect ratio immediately from the PDF metadata without rendering
    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      setAspectRatio(viewport.width / viewport.height);
    } catch (e) {
      console.error("Error fetching page aspect ratio:", e);
      // Fallback aspect ratio (e.g., standard US Letter Portrait 8.5x11)
      setAspectRatio(8.5 / 11);
    }
  };

  const handleFlip = (e: any) => {
    if (onPageChange && !isResetting) {
      onPageChange(e.data); // data is the new current page index
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-2 md:p-8">
      <motion.div 
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-full flex items-center justify-center transform-gpu"
        drag={zoom > 1}
        dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={setError}
          loading={<div className="text-gray-400 uppercase tracking-widest text-xs font-semibold">Loading HD Portfolio...</div>}
        >
          {numPages > 0 && (
            <motion.div 
              animate={{ opacity: isResetting || dimensions.width === 0 ? 0 : 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              {aspectRatio && dimensions.width > 0 && (
                <FlipBook
                  key={resetKey}
                  ref={flipBookRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  size="fixed"
                  drawShadow={false}
                  maxShadowOpacity={0}
                  showCover={true}
                  autoCenter={true}
                  mobileScrollSupport={true}
                  usePortrait={isMobile}
                  onFlip={handleFlip}
                  className="shadow-2xl mx-auto"
                  style={{ margin: '0 auto' }}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <PageWrapper 
                      key={index} 
                      pageNumber={index + 1} 
                      width={dimensions.width} 
                    />
                  ))}
                  {/* Add an empty back cover if the page count is odd so the last spread aligns correctly */}
                  {numPages % 2 !== 0 && (
                    <div className="bg-black overflow-hidden flex items-center justify-center h-full w-full" />
                  )}
                </FlipBook>
              )}
            </motion.div>
          )}
        </Document>

        {error && (
          <div className="absolute flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-xl">
            <h2 className="font-display text-xl text-gray-800">PORTFOLIO UNAVAILABLE</h2>
            <a href="/portfolio" className="px-6 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold tracking-widest uppercase">
              RETURN TO PORTFOLIO
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
