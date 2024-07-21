'use client'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import Link from 'next/link';
import { IoSearchOutline } from "react-icons/io5";
import Image from 'next/image';
import style from "./Applist.module.css"

import { motion, AnimatePresence } from 'framer-motion';
const firebaseConfig = {
  apiKey: "AIzaSyCHRsCkuLO3aaIBqSGh-jRN8WO2iaYh8fY",
  authDomain: "entitysafe-a3a88.firebaseapp.com",
  databaseURL: "https://entitysafe-a3a88-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "entitysafe-a3a88",
  storageBucket: "entitysafe-a3a88.appspot.com",
  messagingSenderId: "473735399260",
  appId: "1:473735399260:web:a951f95f421639cbeaa399",
  measurementId: "G-M2T2GJQ0MZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();



const TopFiveApps = ({ apps }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Change app every 8 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % apps.length);
      setProgress(0); // Reset progress when changing app
    }, 8000); // 8-second interval

    return () => clearInterval(interval);
  }, [apps.length]);

  useEffect(() => {
    // Update progress every 100ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1.25; // Increment progress
        return 0; // Reset to 0 if it completes
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className='flex bg-background-color flex-col lg:h-screen'>
      <div className='xl:px-[12vw] lg:justify-evenly flex lg:flex-row items-center flex-col px-[15px]'>
        <div className='relative w-[95vw] lg:w-[75vw] xl:w-[64vw] xl:mr-[15px] h-[230px] sm:h-[380px] md:h-[430px] lg:h-[480px] xl:h-[510px] rounded-2xl bg-gray-600 overflow-hidden'>
          <AnimatePresence>
            {apps.map((app, index) => (
              index === activeIndex && (
                <motion.div
                  key={app.id}
                  className='absolute inset-0 flex items-end'
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  exit={{ x: -500, opacity: 0 }}
                  transition={{ duration: 0.5 }} // Faster transition
                >
                  <Image
                    src={app.coverPhoto}
                    alt={app.name}
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                    className='absolute inset-0'
                  />
                  <div className='absolute bottom-4 left-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded'>
                    {app.name}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <div className='lg:w-[15%] lg:h-[480px] xl:h-[510px] lg:mx-[0px] lg:mt-[0px] mt-[45px] mx-auto justify-between flex lg:overflow-x-hidden overflow-x-auto lg:flex-col'>
          <AnimatePresence>
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                className={`relative rounded-xl text-xl py-[15px] p-[16px] flex items-center ${index === activeIndex ? 'bg-hightlight-menu' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} // Adjusted transition
              >
                {index === activeIndex && (
                  <div className='absolute bottom-0 left-0 rounded-xl h-full bg-hightlight-progress' style={{ width: `${progress}%` }}></div>
                )}
                <div className='flex items-center'>
                  <Image
                    src={app.appIcon}
                    alt={`${app.name} icon`}
                    width={40}
                    height={80}
                    className=' mr-[15px] lg:mr-[10px] z-10'
                  />
                  <div className='relative lg:block hidden text-[15px] z-10'>{app.name}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AppCategorySection = ({ category, apps }) => {
  const filteredApps = apps.filter(app => app.category === category);

  return (
    <div className='mb-8'>
      <h2 className='text-xl text-gray-200 font-bold mb-4'>{category}s</h2>
      <div className='h-[3px] bg-line-color w-[95%] rounded-lg mx-auto mt-[8px] mb-[10px]'></div>
      <div className='flex flex-wrap lg:justify-start justify-center'>
        {filteredApps.map((app) => (
          <Link key={app.id} href={`/pages/AppList/${app.id}`}>
            <div className='flex flex-col mx-auto my-[5px] bg-navbar-color px-[20px] py-[12px] rounded-md'>
              <div className="relative mx-auto md:w-[270px] w-[320px] h-[310px] rounded-md overflow-hidden">
                <Image
                  src={app.coverPhoto}
                  alt={app.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className='w-full flex'>
                <p className='bg-gray-600 inline-block ml-auto px-[12px] my-[7px] rounded-lg text-white text-md' >Free</p></div>
              <p className=' text-xl' >{app.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const AppList = () => {
  const [apps, setApps] = useState([]);
  const [topFiveApps, setTopFiveApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const categories = ["Desktop Game", "Desktop Application", "Mobile Application"];
  useEffect(() => {
    const fetchApps = async () => {
      const appsRef = db.ref('apps');
      appsRef.on('value', (snapshot) => {
        const appsData = snapshot.val();
        const appsList = [];
        for (let id in appsData) {
          appsList.push({ id, ...appsData[id] });
        }
        setApps(appsList);
        setTopFiveApps(appsList.slice(0, 5));
        setLoading(false);
      });
    };
    fetchApps();
  }, []);

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  return (
    <div className='pt-[85px] bg-backrground-color'>

      <div className='xl:px-[13vw]  lg:justify-evenly flex flex-col mb-[22px] mt-[15px]'>
        <div className='w-[95%] mx-auto md:ml-[15px] lg:ml-[35px] xl:ml-[-15px] md:w-[320px] bg-hightlight-progress rounded-3xl flex items-center  px-[12px] py-[8px]'>
          <IoSearchOutline size={25} className="text-white mr-[8px]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-[18px] outline-none focus:outline-none focus:border-none"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {topFiveApps.length > 0 && <TopFiveApps apps={topFiveApps} />}


      <div className='xl:px-[13vw] lg:justify-evenly flex flex-col px-[15px]'>

        <h2 className='text-2xl mt-[35px] lg:mt-[-125px] text-center text-gray-200 font-bold mb-4'>All Applications</h2>
        <div className='h-[3px] bg-line-color w-[95%] rounded-lg mx-auto mt-[8px] mb-[10px]'></div>

        <div className={style.customScrollbar}>
          {apps.map((app) => (
            <Link key={app.id} href={`/pages/AppList/${app.id}`} >
              <div className='flex flex-col m-[5px] bg-navbar-color px-[20px] py-[12px] rounded-md'>
                <div className="relative mx-auto w-[270px] h-[310px] rounded-md overflow-hidden">
                  <Image
                    src={app.coverPhoto}
                    alt={app.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p>{app.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className='mt-[15px]'>
          {categories.map((category) => (
            <AppCategorySection key={category} category={category} apps={apps} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default AppList;