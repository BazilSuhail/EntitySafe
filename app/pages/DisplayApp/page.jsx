'use client'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Image from 'next/image';

// Initialize Firebase (if not already initialized)
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

const DisplayAppData = () => {
  const [appsData, setAppsData] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      const appRef = db.ref('apps');
      const snapshot = await appRef.once('value');
      const data = snapshot.val();
      if (data) {
        setAppsData(Object.values(data));
      }
    };

    fetchAppData();
  }, []);

  if (appsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pt-[85px]'>
      {appsData.map((app, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h1>{app.name}</h1>
          <p>{app.description}</p>
          {app.coverPhoto && (
            <Image 
              src={app.coverPhoto} 
              alt="Cover Photo" 
              width={200} 
              height={200} 
              layout="responsive" 
              objectFit="cover"
            />
          )}

          <h2>Genres</h2>
          {app.genres && app.genres.length > 0 ? (
            <ul>
              {app.genres.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          ) : (
            <p>No genres available</p>
          )}

          <h2>Titles</h2>
          {app.titles && app.titles.length > 0 ? (
            <ul>
              {app.titles.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          ) : (
            <p>No titles available</p>
          )}

          <h2>Images</h2>
          {app.images && app.images.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {app.images.map((image, index) => (
                <div key={index} style={{ width: '200px', height: '200px', position: 'relative' }}>
                  <Image 
                    src={image} 
                    alt={`App Image ${index + 1}`} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}

          <h2>Trailer</h2>
          {app.trailerLink ? (
            <iframe 
              width="560" 
              height="315" 
              src={app.trailerLink.replace("watch?v=", "embed/")} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Trailer"
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayAppData;
