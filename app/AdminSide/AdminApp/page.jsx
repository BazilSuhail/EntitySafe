'use client'
import { useState } from 'react';
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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const storage = firebase.storage();

const AdminAppManagement = () => {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [images, setImages] = useState([]);
  const [newImageFile, setNewImageFile] = useState(null);
  const [appFile, setAppFile] = useState(null); // State to hold uploaded app file
  const [appFileDownloadUrl, setAppFileDownloadUrl] = useState(''); // State to hold download URL
  const [loading, setLoading] = useState(false);

  const handleAddGenre = () => {
    if (newGenre.trim() !== '') {
      setGenres([...genres, newGenre]);
      setNewGenre('');
    }
  };

  const handleAddTitle = () => {
    if (newTitle.trim() !== '') {
      setTitles([...titles, newTitle]);
      setNewTitle('');
    }
  };

  const handleAddImage = () => {
    if (newImageFile && images.length < 5) {
      setImages([...images, newImageFile]);
      setNewImageFile(null);
    }
  };

  const handleSaveApp = async () => {
    setLoading(true);
    const appRef = db.ref('apps');
    const newAppRef = appRef.push();
    const appId = newAppRef.key;

    let coverPhotoUrl = '';

    if (coverPhotoFile) {
      const coverPhotoSnapshot = await storage.ref(`apps/${appId}/coverPhoto`).put(coverPhotoFile);
      coverPhotoUrl = await coverPhotoSnapshot.ref.getDownloadURL();
    }

    const imageUrls = [];

    for (const imageFile of images) {
      const imageSnapshot = await storage.ref(`apps/${appId}/images/${imageFile.name}`).put(imageFile);
      const imageUrl = await imageSnapshot.ref.getDownloadURL();
      imageUrls.push(imageUrl);
    }

    // Upload app file
    let appFileDownloadUrl = '';
    if (appFile) {
      const appFileSnapshot = await storage.ref(`apps/${appId}/appFile/${appFile.name}`).put(appFile);
      appFileDownloadUrl = await appFileSnapshot.ref.getDownloadURL();
      setAppFileDownloadUrl(appFileDownloadUrl);
    }

    const newApp = {
      name: appName,
      description: appDescription,
      genres,
      titles,
      trailerLink,
      coverPhoto: coverPhotoUrl,
      images: imageUrls,
      appFile: appFileDownloadUrl, // Store the download URL of the uploaded app file
    };

    await newAppRef.set(newApp);

    // Clear input fields and state after saving
    setAppName('');
    setAppDescription('');
    setGenres([]);
    setTitles([]);
    setTrailerLink('');
    setCoverPhotoFile(null);
    setImages([]);
    setAppFile(null);
    setLoading(false);
  };

  return (
    <div className='pt-[85px] bg-backrground-color min-h-screen text-gray-200'>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          <p className="text-xl font-bold text-gray-200 ml-4">Uploading App...</p>
        </div>
      ) : (
        <div className='max-w-4xl mx-auto p-6'>
          <h2 className='text-3xl font-bold mb-6'>Admin App Management</h2>
          <div className='mb-4'>
            <input
              type="text"
              placeholder="App Name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <textarea
              placeholder="App Description"
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <input
              type="text"
              placeholder="Trailer Link"
              value={trailerLink}
              onChange={(e) => setTrailerLink(e.target.value)}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-sm text-gray-400 mt-2'>URL to the trailer video of the app.</p>
          </div>
          <div className='mb-4'>
            <input
              type="file"
              onChange={(e) => setCoverPhotoFile(e.target.files[0])}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-sm text-gray-400 mt-2'>Upload the cover photo of the app.</p>
          </div>
          <div className='mb-4'>
            <input
              type="file"
              onChange={(e) => setNewImageFile(e.target.files[0])}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button 
              onClick={handleAddImage} 
              disabled={images.length >= 5}
              className='p-2 bg-blue-600 text-gray-200 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Add Image
            </button>
            <p className='text-sm text-gray-400 mt-2'>Upload up to 5 images for the app.</p>
            <ul className='list-disc pl-5'>
              {images.map((imageFile, index) => (
                <li key={index} className='mb-1'>{imageFile.name}</li>
              ))}
            </ul>
          </div>
          <div className='mb-4'>
            <input
              type="file"
              onChange={(e) => setAppFile(e.target.files[0])} // Capture the uploaded file
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-sm text-gray-400 mt-2'>Upload the app file.</p>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Genres</h3>
            <div className='flex items-center mb-3'>
              <input
                type="text"
                placeholder="Enter Genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button 
                onClick={handleAddGenre} 
                className='p-2 bg-blue-600 text-gray-200 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Add Genre
              </button>
            </div>
            <ul className='list-disc pl-5'>
              {genres.map((genre, index) => (
                <li key={index} className='mb-1'>{genre}</li>
              ))}
            </ul>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Titles</h3>
            <div className='flex items-center mb-3'>
              <input
                type="text"
                placeholder="Enter Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button 
                onClick={handleAddTitle} 
                className='p-2 bg-blue-600 text-gray-200 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Add Title
              </button>
            </div>
            <ul className='list-disc pl-5'>
              {titles.map((title, index) => (
                <li key={index} className='mb-1'>{title}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={handleSaveApp} 
            className='w-full p-3 bg-green-600 text-gray-200 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Save App
          </button>
          {appFileDownloadUrl && (
            <div className="mt-4">
              <p className="text-lg font-semibold">App File Uploaded:</p>
              <a
                href={appFileDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download App File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAppManagement;
