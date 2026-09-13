import { Grid, Maximize, Minimize, ZoomIn, ZoomOut } from 'lucide-react';

interface FlipbookControlsProps {
  currentSpread: number;
  totalSpreads: number;
  isMobile: boolean;
  onToggleThumbnails: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
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
      
      <span className="font-body text-xs font-semibold tracking-widest text-gray-700 tabular-nums">
        {getPageCounter()}
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
