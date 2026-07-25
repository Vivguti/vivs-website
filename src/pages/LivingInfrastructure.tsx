import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function LivingInfrastructure() {

  return (
    <div className="min-h-screen bg-[#93A3B9] w-full relative">
      <BackButton to="/portfolio" label="Back to Portfolio" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center p-4 md:p-12 lg:p-16"
      >
        <div className="w-full max-w-[1600px] bg-white p-2 md:p-4 shadow-2xl">
          <img 
            src="/living-infrastructure-board.png" 
            alt="Living Infrastructure Presentation Board" 
            className="w-full h-auto block"
          />
        </div>
      </motion.div>
    </div>
  );
}
