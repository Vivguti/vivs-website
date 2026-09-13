import { motion } from 'framer-motion';
import { Document, Page } from 'react-pdf';
import { X } from 'lucide-react';

interface ThumbnailDrawerProps {
  pdfUrl: string;
  numPages: number;
  onSelectPage: (index: number) => void;
  onClose: () => void;
}

export default function ThumbnailDrawer({ pdfUrl, numPages, onSelectPage, onClose }: ThumbnailDrawerProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 h-64 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200/50">
        <h3 className="font-display text-sm tracking-widest text-gray-800">Contents</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 py-4 custom-scrollbar">
        <div className="flex items-center gap-6 h-full min-w-max">
          <Document file={pdfUrl} className="flex gap-6 h-full items-center">
            {Array.from(new Array(numPages), (_el, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => onSelectPage(index)}
                className="group relative h-[140px] aspect-[0.77] flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-gray-900 rounded-sm"
              >
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Page
                  pageNumber={index + 1}
                  height={140}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-sm border border-gray-200 object-cover"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-semibold tabular-nums">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </Document>
        </div>
      </div>
    </motion.div>
  );
}