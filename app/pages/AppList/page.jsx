// components/AppList.js
'use client'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import Link from 'next/link';

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

const AppList = () => {
  const [apps, setApps] = useState([]);

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
      });
    };
    fetchApps();
  }, []);

  return (
    <div className='pt-[85px]'>
      <h1>All Apps</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {apps.map((app) => (
          <Link key={app.id} href={`/pages/AppList/${app.id}`}>
            <div style={{ margin: '10px', textDecoration: 'none', color: 'inherit' }}>
              <img src={app.coverPhoto} alt={app.name} width="200" height="400" />
              <p>{app.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppList;
