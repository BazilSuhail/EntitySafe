'use client';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Link from 'next/link';
import Image from 'next/image';
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

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

const AppDetails = () => {
    const [apps, setApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
 
    // Array of categories - you can manually handle this as needed
    const categories = ['All', 'Desktop Game', 'Desktop Application', 'Mobile Applications'];

    useEffect(() => {
        const fetchApps = async () => {
            const appsRef = db.ref('apps');
            appsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                const appsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                setApps(appsArray);
                setFilteredApps(appsArray);
                setLoading(false); // Set loading to false after fetching data
            });
        };

        fetchApps();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredApps(apps);
        } else {
            setFilteredApps(apps.filter(app => app.category === selectedCategory));
        }
    }, [selectedCategory, apps]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='pt-[85px] bg-backrground-color '>
            <div className='max-w-6xl mx-auto p-6'>
                <h2 className='text-3xl font-bold mb-6'>App Details</h2>
                <div className='h-[3px] w-[100%] rounded-xl bg-hightlight-progress mb-[15px]'></div>

                {loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <p className='text-lg font-semibold'>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className='flex mb-6'>
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`cursor-pointer px-[15px] py-[4px] rounded-md mr-2 text-center transition-colors duration-300
                                        ${selectedCategory === category ? 'bg-hightlight-progress text-gray-200' : 'border-2 border-hightlight-menu text-gray-300'}`}
                                >
                                    {category === 'All' ? <p>{category}</p> : <p>{category}s</p>}
                                </div>
                            ))}
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                            {filteredApps.map((app) => (
                                <Link
                                    key={app.id}
                                    href={`/pages/AppList/${app.id}`}
                                    className='flex flex-col p-4 rounded-md hover:bg-hightlight-menu'
                                >
                                    <div className='flex '>
                                        <Image
                                            src={app.appIcon}
                                            alt={`${app.name} icon`}
                                            width={90}
                                            height={90}
                                            className=' mr-[15px] rounded-md lg:mr-[10px] z-10'
                                        />
                                        <div>

                                            <div className='relative text-[24px]'>{app.name}</div>
                                            <div className='p-[5px] inline-block rounded-lg bg-hightlight-progress text-[12px] '>{app.category}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AppDetails;
