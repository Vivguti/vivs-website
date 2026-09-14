import { Grid, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface FlipbookControlsProps {
  currentSpread: number;
  totalSpreads: number;
  isMobile: boolean;
  onToggleThumbnails: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  zoom: number;
}

export default function FlipbookControls({
  currentSpread,
  totalSpreads,
  isMobile,
  onToggleThumbnails,
  onToggleFullscreen,
  isFullscreen,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoom
}: FlipbookControlsProps) {
  
  // Display Page Counter
  const getPageCounter = () => {
    if (isMobile) {
      const p = currentSpread + 1;
      return `${p.toString().padStart(2, '0')} / ${totalSpreads}`;
    } else {
      if (currentSpread === 0) {
        return `01 / ${totalSpreads * 2 - 1}`;
      } else {
        const pLeft = currentSpread * 2;
        const pRight = currentSpread * 2 + 1;
        const maxP = totalSpreads * 2 - 1;
        return `${pLeft.toString().padStart(2, '0')}-${pRight.toString().padStart(2, '0')} / ${maxP}`;
      }
    }
  };

  const isZoomed = zoom > 1;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-8 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50">
      
      <button 
        onClick={onToggleThumbnails}
        className="text-gray-600 hover:text-black transition-colors"
        aria-label="Open thumbnails"
      >
        <Grid size={20} />
      </button>

      <div className="w-px h-4 bg-gray-300" />

      <button 
        onClick={onZoomOut}
        disabled={zoom <= 1}
        className="text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut size={20} />
      </button>

      {/* Reset button — only visible when zoomed */}
      <button 
        onClick={onZoomReset}
        disabled={!isZoomed}
        className={`text-gray-600 hover:text-black transition-all duration-200 ${isZoomed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none w-0 -mx-3'}`}
        aria-label="Reset zoom and center"
        title="Reset to center"
      >
        <RotateCcw size={18} />
      </button>
      
      <span className="font-body text-xs font-semibold tracking-widest text-gray-700 tabular-nums">
        {isZoomed ? `${Math.round(zoom * 100)}%` : getPageCounter()}
      </span>
      
      <button 
        onClick={onZoomIn}
        disabled={zoom >= 3}
        className="text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn size={20} />
      </button>

      <div className="w-px h-4 bg-gray-300" />

      <button 
        onClick={onToggleFullscreen}
        className="text-gray-600 hover:text-black transition-colors"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>
    </div>
  );
}
