import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({ to = '/portfolio', label = 'Back to Portfolio' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      aria-label={label}
      title={label}
      className="fixed top-8 left-6 md:left-12 z-50 flex items-center justify-center w-12 h-12 bg-transparent hover:bg-white/10 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all hover:scale-110 active:scale-95 cursor-pointer overflow-hidden"
    >
      <img 
        src="/icon-back.png" 
        alt="Back direction arrow" 
        className="w-full h-full object-cover opacity-90 invert" 
      />
    </button>
  );
}
