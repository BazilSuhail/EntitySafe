'use client';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage'; // Import Firebase Storage module

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
const storage = firebase.storage(); // Initialize Firebase Storage

const AppDetails = ({ params }) => {
  const [appDetails, setAppDetails] = useState(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const snapshot = await db.ref(`apps/${params.appid}`).once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAppDetails(data);
        } else {
          console.log(`App with ID ${params.appid} does not exist`);
        }
      } catch (error) {
        console.error('Error fetching app details:', error);
      }
    };

    if (params.appid) {
      fetchAppDetails();
    }
  }, [params.appid]);

  const handleInstallApp = async () => {
    try {
      if (appDetails && appDetails.appFile) {
        // Get reference to the file in Firebase Storage
        const storageRef = storage.refFromURL(appDetails.appFile);
        
        // Get download URL for the file
        const downloadUrl = await storageRef.getDownloadURL();
  
        // Create a temporary anchor element to trigger download
        const aTag = document.createElement('a');
        aTag.href = downloadUrl;
  
        // Set the file name for download
        aTag.setAttribute('download', 'install1'); // You can set the desired file name here
  
        // Append the anchor element to the document and trigger the click event
        document.body.appendChild(aTag);
        aTag.click();
  
        // Remove the anchor element from the document
        aTag.remove();
      } else {
        console.error('App file download URL not available.');
      }
    } catch (error) {
      console.error('Error downloading app file:', error);
    }
  };
  

  if (!appDetails) {
    return <p className='pt-[85px]'>Loading...</p>;
  }

  return (
    <div className='pt-[85px]'>
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
        src={appDetails.trailerLink.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={handleInstallApp}>Install App</button>
    </div>
  );
};

export default AppDetails;
