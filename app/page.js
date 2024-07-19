// components/AnimatedText.js
'use client'

import { useEffect, useState } from 'react';
import style from "./Home.module.css"
import { motion, useScroll, useTransform, useAnimation, useSpring } from 'framer-motion';
import Image from 'next/image';
import picture from '../public/pic.png';


const ScrollAnimatedImage = () => {
  const { scrollY } = useScroll();

  // Transform scroll position to scale
  const scale = useTransform(scrollY, [0, 1300], [1.3, 0.6]);

  // States to track animation progress
  const [isScalingComplete, setIsScalingComplete] = useState(false);
  const [isRotationComplete, setIsRotationComplete] = useState(false);

  // Manage scroll progress for scaling, rotation, and fading
  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    // Update scrollYValue on every scroll event
    const handleScroll = () => {
      setScrollYValue(scrollY.get());
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    // Check if scaling is complete
    if (scrollYValue >= 1300) {
      setIsScalingComplete(true);
    } else {
      setIsScalingComplete(false);
    }
  }, [scrollYValue]);

  // Rotation and fade animations
  const rotate = useTransform(scrollY, [1300, 1500], [0, 0]);
  const x = useTransform(scrollY, [1600, 1650], [0, -500]);
  const opacity = useTransform(scrollY, [1600, 1610], [1, 0]);

  useEffect(() => {
    if (isScalingComplete) {
      if (scrollYValue >= 1600) {
        setIsRotationComplete(true);
      }
    }
  }, [isScalingComplete, scrollYValue]);

  return (
    <div className='relative h-[300vh] bg-background-color overflow-hidden'>
      <motion.div
        className='absolute w-full h-full flex items-center justify-center'
        style={{
          scale: scale,
          rotate: isScalingComplete ? rotate : 0,
          x: isRotationComplete ? x : 0,
          opacity: isRotationComplete ? opacity : 1,
          position: isScalingComplete ? 'static' : 'relative',
          top: isScalingComplete ? 'auto' : 'auto',
          left: isScalingComplete ? 'auto' : 'auto',
          transform: isScalingComplete ? 'none' : 'none',
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={picture}
          alt='Animated'
          layout='fill'
          objectFit='contain'
          className='absolute'
        />
      </motion.div>
    </div>
  );
};
const ScrollAnimatedVideo = () => {
  const { scrollY } = useScroll();

  // Transform scroll position to scale
  const scale = useTransform(scrollY, [0, 1300], [1.3, 0.6]);

  // States to track animation progress
  const [isScalingComplete, setIsScalingComplete] = useState(false);
  const [isRotationComplete, setIsRotationComplete] = useState(false);

  // Manage scroll progress for scaling, rotation, and fading
  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    // Update scrollYValue on every scroll event
    const handleScroll = () => {
      setScrollYValue(scrollY.get());
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    // Check if scaling is complete
    if (scrollYValue >= 1300) {
      setIsScalingComplete(true);
    } else {
      setIsScalingComplete(false);
    }
  }, [scrollYValue]);

  // Rotation and fade animations
  const rotate = useTransform(scrollY, [1300, 1500], [0, 0]);
  const x = useTransform(scrollY, [1400, 1480], [0, -500]);
  const opacity = useTransform(scrollY, [1400, 1500], [1, 0]);

  useEffect(() => {
    if (isScalingComplete) {
      if (scrollYValue >= 1600) {
        setIsRotationComplete(true);
      }
    }
  }, [isScalingComplete, scrollYValue]);

  return (
    <div className='relative h-[300vh] bg-background-color overflow-hidden'>
      <motion.div
        className='relative w-full'
        style={{
          scale: scale,
          rotate: isScalingComplete ? rotate : 0,
          x: isRotationComplete ? x : 0,
          opacity: isRotationComplete ? opacity : 1,
          position: isScalingComplete ? 'static' : 'relative',
          top: isScalingComplete ? '50%' : 'auto',
          left: isScalingComplete ? '50%' : 'auto',
          transform: isScalingComplete ? 'translate(-50%, -50%)' : 'none',
        }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative' style={{ paddingTop: '86.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/RDIWT43ZQIo?autoplay=1&loop=1&playlist=RDIWT43ZQIo&mute=1&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full'
            style={{ pointerEvents: 'none' }}  // Disables user interaction
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

const generateRandomValue = (min, max) => Math.random() * (max - min) + min;

const AnimatedText = () => {
  const controls = useAnimation();

  // Function to animate shapes with random properties
  const animateShapes = () => {
    controls.start(i => ({
      x: generateRandomValue(-900, 900),
      y: generateRandomValue(-600, 600),
      rotate: generateRandomValue(0, 360),
      scale: generateRandomValue(0.1, 1.2),
      opacity: generateRandomValue(0, 1),
      transition: {
        duration: generateRandomValue(1, 3),
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: i * 0.2, // Staggered effect for each shape
      }
    }));
  };

  useEffect(() => {
    animateShapes();
  }, []);

  return (
    <main>
      <section className='relative flex bg-background-color pt-[70px] flex-col h-screen overflow-hidden'>
        {/* Text animation */}
        <div className="flex z-20 flex-col items-center justify-center h-full">

          <div className='flex'>
            <motion.div
              className={style.gradientAnimation}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 4,
                delay: 1
              }}
            >
              Entity
            </motion.div>
            <motion.div
              className={style.gradientAnimation}
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                duration: 4,
                delay: 1
              }}
            >
              Safe
            </motion.div>
          </div>

          <motion.div
            className="text-center text-white text-[24px] font-bold "
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              type: 'spring',
              stiffness: 50
            }}
          >
            My ultimate vault for my Applications
          </motion.div>
        </div>



        {/* Shapes animation */}
        <div className="absolute top-0 left-0 w-full h-full text-[65px] md:text-[105px] overflow-hidden">
          {[...Array(25)].map((_, index) => (
            <motion.div
              key={index}
              className={style.shape}
              custom={index}
              animate={controls}
            ></motion.div>
          ))}
        </div>
      </section> 
      <section className='mt-[85px] '>
        <ScrollAnimatedVideo />
      </section>
      <section className='relative flex bg-background-color pt-[70px] flex-col h-screen overflow-hidden'>
        {/* Text animation */}
        <div className="flex z-20 flex-col items-center justify-center h-full">

          <div className='flex'>
            <motion.div
              className={style.gradientAnimation}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 4,
                delay: 1
              }}
            >
              Entity
            </motion.div>
            <motion.div
              className={style.gradientAnimation}
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                duration: 4,
                delay: 1
              }}
            >
              Safe
            </motion.div>
          </div>

          <motion.div
            className="text-center text-white text-[24px] font-bold "
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              type: 'spring',
              stiffness: 50
            }}
          >
            My ultimate vault for my Applications
          </motion.div>
        </div>



        {/* Shapes animation */}
        <div className="absolute top-0 left-0 w-full h-full text-[65px] md:text-[105px] overflow-hidden">
          {[...Array(25)].map((_, index) => (
            <motion.div
              key={index}
              className={style.shape}
              custom={index}
              animate={controls}
            ></motion.div>
          ))}
        </div>
      </section> 
    </main>
  );
};

export default AnimatedText;
