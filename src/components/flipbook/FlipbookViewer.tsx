import { useState, useRef, useEffect, forwardRef } from 'react';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';

// @ts-ignore
const FlipBook = HTMLFlipBook as any;

const COVER_PDF_URL = "/portfolio/cover.pdf";

interface FlipbookViewerProps {
  pdfUrl: string;
  isMobile: boolean;
  zoom: number;
  onLoadSuccess: (data: { numPages: number }) => void;
  onPageChange?: (pageIndex: number) => void;
}

// Create a wrapper component for the page so react-pageflip can inject its refs
const PageWrapper = forwardRef<HTMLDivElement, { pageNumber: number, width: number }>(
  ({ pageNumber, width }, ref) => {
    return (
      <div ref={ref} className="bg-white overflow-hidden flex items-center justify-center h-full w-full">
        <Page 
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          devicePixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
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
  onLoadSuccess,
  onPageChange
}: FlipbookViewerProps & { currentSpread: number }) {
  
  const [error, setError] = useState<Error | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [fullPdfLoaded, setFullPdfLoaded] = useState(false);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!aspectRatio || !containerRef.current) return;
    
    const updateSize = () => {
      const cw = containerRef.current!.clientWidth;
      const ch = containerRef.current!.clientHeight;
      
      // Device-aware padding: phones get near-zero, tablets get minimal, desktops get comfortable
      const isTablet = !isMobile && cw <= 1366;
      const horizontalPadding = isMobile ? 8 : (isTablet ? 40 : 120);
      const verticalPadding = isMobile ? 16 : (isTablet ? 60 : 120); 
      
      const maxAvailableWidth = Math.max(0, cw - horizontalPadding);
      const maxAvailableHeight = Math.max(0, ch - verticalPadding);

      // Single page max width based on available space
      const maxPageWidth = isMobile ? maxAvailableWidth : maxAvailableWidth / 2;

      // Fit to screen algorithm
      let targetWidth = maxPageWidth;
      let targetHeight = targetWidth / aspectRatio;

      if (targetHeight > maxAvailableHeight) {
        targetHeight = maxAvailableHeight;
        targetWidth = targetHeight * aspectRatio;
      }

      setDimensions(prev => {
        const newW = Math.floor(targetWidth);
        const newH = Math.floor(targetHeight);
        if (Math.abs(prev.width - newW) > 5 || Math.abs(prev.height - newH) > 5) {
          return { width: newW, height: newH };
        }
        return prev;
      });
    };

    updateSize();
    
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateSize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile, aspectRatio]);

  const [resetKey, setResetKey] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      const pageFlip = flipBookRef.current.pageFlip();
      const targetPage = isMobile ? currentSpread : currentSpread * 2;
      
      // Determine what spread we are currently looking at
      const currentIndex = pageFlip.getCurrentPageIndex();
      const currentVisualSpread = isMobile ? currentIndex : Math.floor((currentIndex + 1) / 2);
      
      if (currentVisualSpread !== currentSpread && !isResetting) {
        // If looping back to the cover from deep in the book, trigger smooth reset
        if (targetPage === 0 && currentIndex > 2) {
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

  // Cover PDF loaded — get aspect ratio from it instantly
  const onCoverLoadSuccess = async (pdf: any) => {
    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      setAspectRatio(viewport.width / viewport.height);
    } catch (e) {
      console.error("Error fetching cover aspect ratio:", e);
      setAspectRatio(8.5 / 11);
    }
  };

  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);
    onLoadSuccess({ numPages: pdf.numPages });
    setFullPdfLoaded(true);

    // Also set aspect ratio from the full PDF if we don't have it yet
    if (!aspectRatio) {
      try {
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        setAspectRatio(viewport.width / viewport.height);
      } catch (e) {
        console.error("Error fetching page aspect ratio:", e);
        setAspectRatio(8.5 / 11);
      }
    }
  };

  const handleFlip = (e: any) => {
    if (onPageChange && !isResetting) {
      onPageChange(e.data); // data is the new current page index
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-1 md:p-4 lg:p-8">
      <motion.div 
        animate={{ scale: zoom, x: zoom <= 1 ? 0 : undefined, y: zoom <= 1 ? 0 : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-full flex items-center justify-center transform-gpu"
        drag={zoom > 1}
        dragConstraints={false}
        dragElastic={0.05}
      >
        {/* Instant cover placeholder — loads almost immediately from tiny 1-page PDF */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 z-0 ${fullPdfLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Document
            file={COVER_PDF_URL}
            onLoadSuccess={onCoverLoadSuccess}
            loading={<div className="text-gray-400 uppercase tracking-widest text-xs font-semibold">Loading Portfolio...</div>}
          >
            {aspectRatio && dimensions.width > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-full h-full shadow-2xl"
              >
                <Page
                  pageNumber={1}
                  width={dimensions.width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  devicePixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
                  className="pointer-events-none"
                />
              </motion.div>
            )}
          </Document>
        </div>

        {/* Full portfolio — loads in the background, crossfades in when ready */}
        <div className={fullPdfLoaded ? 'block' : 'hidden'}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={setError}
            loading={null}
          >
            {numPages > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isResetting || dimensions.width === 0 ? 0 : 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center justify-center w-full h-full"
              >
                {aspectRatio && dimensions.width > 0 && (
                  <div className="relative">
                    {/* Block all flipbook swipe/click interactions while zoomed */}
                    {zoom > 1 && (
                      <div className="absolute inset-0 z-10" />
                    )}
                    <FlipBook
                      key={`${resetKey}-${isMobile ? 'single' : 'double'}-${Math.round(dimensions.width)}x${Math.round(dimensions.height)}`}
                      ref={flipBookRef}
                      width={dimensions.width}
                      height={dimensions.height}
                      minWidth={10}
                      maxWidth={5000}
                      minHeight={10}
                      maxHeight={5000}
                      size="fixed"
                      drawShadow={false}
                      maxShadowOpacity={0}
                      showCover={true}
                      autoCenter={true}
                      mobileScrollSupport={zoom <= 1}
                      disableFlipByClick={zoom > 1}
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
                  </div>
                )}
              </motion.div>
            )}
          </Document>
        </div>

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
