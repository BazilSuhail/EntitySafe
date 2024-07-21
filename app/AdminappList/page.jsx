'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


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

const AdminAppList = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            const appsRef = db.ref('apps');
            appsRef.on('value', (snapshot) => {
                const appsData = snapshot.val();
                const appsList = Object.keys(appsData).map((key) => ({
                    id: key,
                    ...appsData[key],
                }));
                setApps(appsList);
            });
        };

        fetchApps();
    }, []);

    return (
        <div className='pt-[85px] bg-background-color min-h-screen text-gray-200'>
            <div className='max-w-4xl mx-auto p-6'>
                <h2 className='text-3xl font-bold mb-6'>Admin App List</h2>
                <ul>
                    {apps.map((app) => (
                        <li key={app.id} className='mb-4'>
                            <Link  href={`/AdminappList/${app.id}`} >
                                <p className='text-blue-500'>{app.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminAppList;
