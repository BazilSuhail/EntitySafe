// components/AnimatedText.js
'use client'

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import style from "./Home.module.css"
import { motion, useScroll, useTransform, useAnimation, useSpring } from 'framer-motion';

const ScrollAnimatedVideo = () => {
  const { scrollY } = useScroll();

  // Transform scroll position to scale
  const scale = useTransform(scrollY, [0, 1300], [1.3, 0.4]);

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
    if (scrollYValue >= 1250) {
      setIsScalingComplete(true);
    } else {
      setIsScalingComplete(false);
    }
  }, [scrollYValue]);

  // Rotation and fade animations
  const rotate = useTransform(scrollY, [1280, 1500], [0, 0]);
  const x = useTransform(scrollY, [1280, 1380], [0, -500]);
  const opacity = useTransform(scrollY, [1280, 1380], [1, 0]);

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
            src="https://www.youtube.com/embed/UmfhqDJmzeg?autoplay=1&loop=1&playlist=UmfhqDJmzeg&mute=1&controls=0"
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


const badges1 = [
  { alt: "C++", src: "https://img.shields.io/badge/c++%20-%2300599C.svg?&style=for-the-badge&logo=c%2B%2B&ogoColor=white" },
  { alt: "SFML", src: "https://img.shields.io/badge/SFML-%23FF7139.svg?&style=for-the-badge&logo=sfml&logoColor=white" },
  { alt: "Python", src: "https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white" },
  { alt: "JavaScript", src: "https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" }
];
const badges2 = [
  { alt: "Next Js", src: "https://img.shields.io/badge/Next.js-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white" },
  { alt: "Node js", src: "https://img.shields.io/badge/Node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" },
  { alt: "Express js", src: "https://img.shields.io/badge/Express.js-%23000000.svg?&style=for-the-badge&logo=express&logoColor=white" },
  { alt: "React", src: "https://img.shields.io/badge/React-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=white" },
  { alt: "MySQL", src: "https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white" }
];
const badges3 = [
  { alt: "LaTeX", src: "https://img.shields.io/badge/latex%20-%23008080.svg?&style=for-the-badge&logo=latex&logoColor=white" },
  { alt: "Supabase", src: "https://img.shields.io/badge/Supabase-%233ECF8E.svg?&style=for-the-badge&logo=supabase&logoColor=white" },
  { alt: "MongoDB", src: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white" },
  { alt: "Firebase", src: "https://img.shields.io/badge/firebase%20-%23039BE5.svg?&style=for-the-badge&logo=firebase" },
  { alt: "SQLite", src: "https://img.shields.io/badge/sqlite-%2307405e.svg?&style=for-the-badge&logo=sqlite&logoColor=white" }
];
const badges4 = [
  { alt: "Git", src: "https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white" },
  { alt: "Windows 10", src: "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" },
  { alt: "HTML5", src: "https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" },
  { alt: "CSS3", src: "https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" }
];
// Split text into words
const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, index) => ({ word, index }));
};
const AnimatedText = () => {
  const controls = useAnimation();
  const text = `Hey there! Welcome to ENTITYcode Store, where I, Bazil Suhail, showcase a curated collection of both mobile and desktop applications. As a software engineer with a knack for creating elegant digital experiences, I built this platform to help you discover innovative apps designed with both style and functionality in mind. ENTITYcode Store is more than just a repository; it’s a testament to my expertise and passion for developing high-quality software. Whether you're searching for productivity boosters, fun games, or unique tools, you’ll find a variety of apps that reflect the careful craftsmanship and creativity I bring to every project. Feel free to explore and find the perfect apps for your needs!`;

  // Split text into words
  const words = splitTextIntoWords(text);

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
        ease: "easeIn",
        repeat: Infinity,
        // repeatType: "loop", // Changed to loop to ensure continuous movement 
        delay: i * 0.2, // Staggered effect for each shape
      }
    }));
  }; 
  
  const { scrollY } = useScroll();
  const range = [0, 500]; // Adjust this range based on your scroll container's height
  const rotation = useTransform(scrollY, range, ['-5deg', '0deg']);
  const opacity = useTransform(scrollY, range, [0, 1]);
  const y = useTransform(scrollY, range, [200, 0]);

  const textColor = useTransform(scrollY, [400, 1500], ['#FF0000', '#FFFFFF']); // Adjust range as needed

  useEffect(() => {
    animateShapes();
  }, []);
  const reverse = true;

  return (
    <main>
      <section className='relative flex bg-navbar-color pt-[70px] flex-col h-screen overflow-hidden'>
        {/* Text animation */}
        <div className="flex z-20 flex-col items-center justify-center h-full">

          <div className='flex'>
            <motion.div
              className={style.gradientAnimation}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 40,
                duration: 2,
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
                stiffness: 40,
                duration: 2,
                delay: 1
              }}
            >
              Safe
            </motion.div>
          </div>

          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              type: 'spring',
              stiffness: 50
            }}
          >
            <div className='h-[3px] w-[100%] bg-gray-300 my-[5px]'></div>
            <div className='text-white text-[20px] px-[45px]'>My ultimate vault for my Applications</div>
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

      <section className="p-6 my-[35px] text-center font-bold w-[64%] mx-auto">
        <div className="text-[25px] leading-relaxed">
          {words.map(({ word, index }) => {
            // Define animation properties for each word
            const animateProps = {
              rotate: rotation,
              opacity: opacity,
              y: y,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              },
            };

            return (
              <motion.span
                key={index}
                style={animateProps}
                className="inline-block transition-transform duration-300 ease-out mr-[6px]"
              >
                {word + ' '}
              </motion.span>
            );
          })}
        </div>
      </section>

      <section className='h-[300px] w-full flex justify-center'>
        <div className={style.verticalSlider} style={{ '--width': '150px', '--height': '50px', '--quantity': badges1.length }}>
          <div className={style.verticalList}>
            {badges1.map((badge, index) => (
              <div key={index} className={style.verticalItem} style={{ '--position': index + 1 }}>
                <Image
                  alt={badge.alt}
                  src={badge.src}
                  width={120}
                  height={20}
                  layout="intrinsic"
                  unoptimized={true}  // Disable optimization for SVGs
                  className='rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
        <div className={`${style.verticalSlider} ${reverse ? style.reverse : ''}`} style={{ '--width': '150px', '--height': '50px', '--quantity': badges2.length }}>
          <div className={style.verticalList}>
            {badges2.map((badge, index) => (
              <div key={index} className={style.verticalItem} style={{ '--position': index + 1 }}>
                <Image
                  alt={badge.alt}
                  src={badge.src}
                  width={120}
                  height={20}
                  layout="intrinsic"
                  unoptimized={true}  // Disable optimization for SVGs
                  className='rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
        <div className={style.verticalSlider} style={{ '--width': '150px', '--height': '50px', '--quantity': badges3.length }}>
          <div className={style.verticalList}>
            {badges3.map((badge, index) => (
              <div key={index} className={style.verticalItem} style={{ '--position': index + 1 }}>
                <Image
                  alt={badge.alt}
                  src={badge.src}
                  width={120}
                  height={20}
                  layout="intrinsic"
                  unoptimized={true}  // Disable optimization for SVGs
                  className='rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
        <div className={`${style.verticalSlider} ${reverse ? style.reverse : ''}`} style={{ '--width': '150px', '--height': '50px', '--quantity': badges4.length }}>
          <div className={style.verticalList}>
            {badges4.map((badge, index) => (
              <div key={index} className={style.verticalItem} style={{ '--position': index + 1 }}>
                <Image
                  alt={badge.alt}
                  src={badge.src}
                  width={120}
                  height={20}
                  layout="intrinsic"
                  unoptimized={true}  // Disable optimization for SVGs
                  className='rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='hidden z-10 lg:block lg:mt-[-45px] '>
        <ScrollAnimatedVideo />
      </section>


      <section className='lg:hidden block mt-[-3vh]'>
        <ScrollAnimatedVideo />
      </section>


    </main>
  );
};

export default AnimatedText;