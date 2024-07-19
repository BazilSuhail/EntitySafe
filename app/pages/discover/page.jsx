'use client'
import { motion } from 'framer-motion';

const AnimatedText = () => {
  const text = "Entity  App  Vault";

  return (
    <main className='flex bg-backrground-color  pt-[70px] flex-col h-screen'>
      
      <div className='lg:px-[12vw] justify-around flex lg:flex-row md:flex-col px-[15px] mt-[60px]'>
        <div className='w-[85vw]  lg:w-[60vw] h-[450] rounded-2xl bg-gray-600'>
          
        </div>
        <div className='w-[15%] h-[450px] bg-slate-700 '>

        </div>  
      </div>
      
    </main>
  );
};

export default AnimatedText;
