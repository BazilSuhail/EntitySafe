// components/AppDetails.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

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

const AppDetails = () => {
  const [appDetails, setAppDetails] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchAppDetails = async () => {
        const appRef = db.ref(`apps/${id}`);
        appRef.on('value', (snapshot) => {
          setAppDetails(snapshot.val());
        });
      };
      fetchAppDetails();
    }
  }, [id]);

  if (!appDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{appDetails.name}</h1>
      <img src={appDetails.coverPhoto} alt={appDetails.name} width="200" height="200" />
      <h2>Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {appDetails.images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={image} alt={`${appDetails.name} image ${index + 1}`} width="200" height="200" />
          </div>
        ))}
      </div>
      <h2>Description</h2>
      <p>{appDetails.description}</p>
      <h2>Genres</h2>
      <ul>
        {appDetails.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <h2>Titles</h2>
      <ul>
        {appDetails.titles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
      <h2>Trailer</h2>
      <iframe 
        width="560" 
        height="315" 
        src={appDetails.trailerLink} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default AppDetails;
