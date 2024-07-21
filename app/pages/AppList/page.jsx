'use client'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className='relative w-[95vw] lg:w-[60vw] h-[32vh] md:h-[45vh] lg:h-[510px] rounded-2xl bg-gray-600 overflow-hidden'>
          <AnimatePresence>
            {apps.map((app, index) => (
              index === activeIndex && (
                <motion.div
                  key={app.id}
                  className='absolute inset-0 flex items-end'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }} // Faster transition
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

        <div className='lg:w-[15%] lg:h-[510px] lg:mx-[0px] lg:mt-[0px] mt-[45px] mx-auto justify-between flex lg:flex-col'>
          <AnimatePresence>
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                className={`relative rounded-xl text-xl py-[15px] p-[16px] ${index === activeIndex ? 'bg-gray-800' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} // Adjusted transition
              >
                {index === activeIndex && (
                  <div className='absolute bottom-0 left-0 rounded-xl h-full bg-gray-700' style={{ width: `${progress}%` }}></div>
                )}
                <div className='relative z-10'>{app.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


const applications = ({ apps }) => {
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
        <div className='relative w-[95vw] lg:w-[60vw] h-[32vh] md:h-[45vh] lg:h-[510px] rounded-2xl bg-gray-600 overflow-hidden'>
          <AnimatePresence>
            {apps.map((app, index) => (
              index === activeIndex && (
                <motion.div
                  key={app.id}
                  className='absolute inset-0 flex items-end'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }} // Faster transition
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

        <div className='lg:w-[15%] lg:h-[510px] lg:mx-[0px] lg:mt-[0px] mt-[45px] mx-auto justify-between flex lg:flex-col'>
          <AnimatePresence>
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                className={`relative rounded-xl text-xl py-[15px] p-[16px] ${index === activeIndex ? 'bg-gray-800' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} // Adjusted transition
              >
                {index === activeIndex && (
                  <div className='absolute bottom-0 left-0 rounded-xl h-full bg-gray-700' style={{ width: `${progress}%` }}></div>
                )}
                <div className='relative z-10'>{app.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AppList = () => {
  const [apps, setApps] = useState([]);
  const [topFiveApps, setTopFiveApps] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className='pt-[85px]'>
        {topFiveApps.length > 0 && <TopFiveApps apps={topFiveApps} />}
        <h1>All Apps</h1>
        <div style={{ display: 'flex' }}>
          {apps.map((app) => (
            <Link key={app.id} href={`/pages/AppList/${app.id}`}>
              <div style={{ margin: '10px', textDecoration: 'none', color: 'inherit' }}>
                <Image src={app.coverPhoto} alt={app.name} width={200} height={400} />
                <p>{app.name}</p>
              </div>
            </Link>
          ))}

          <div>
            <applications />
          </div>
        </div> 
    </div>
  );
};

export default AppList;