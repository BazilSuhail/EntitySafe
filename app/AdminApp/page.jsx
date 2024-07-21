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
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [appIconFile, setAppIconFile] = useState(null);
  const [images, setImages] = useState(['', '', '', '', '']);
  const [newFunctionality, setNewFunctionality] = useState('');
  const [functionalities, setFunctionalities] = useState([]);
  const [category, setCategory] = useState('');
  const [appFile, setAppFile] = useState(null);
  const [appFileDownloadUrl, setAppFileDownloadUrl] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [newTechStackItem, setNewTechStackItem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddGenre = () => {
    if (newGenre.trim() !== '') {
      setGenres([...genres, newGenre]);
      setNewGenre('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setFeatures([...features, newFeature]);
      setNewFeature('');
    }
  };

  const handleAddFunctionality = () => {
    if (newFunctionality.trim() !== '') {
      setFunctionalities([...functionalities, newFunctionality]);
      setNewFunctionality('');
    }
  };

  const handleAddTechStackItem = () => {
    if (newTechStackItem.trim() !== '') {
      setTechStack([...techStack, newTechStackItem]);
      setNewTechStackItem('');
    }
  };

  const handleSaveApp = async () => {
    setLoading(true);
    const appRef = db.ref('apps');
    const newAppRef = appRef.push();
    const appId = newAppRef.key;

    let coverPhotoUrl = '';
    let appIconUrl = '';

    if (coverPhotoFile) {
      const coverPhotoSnapshot = await storage.ref(`apps/${appId}/coverPhoto`).put(coverPhotoFile);
      coverPhotoUrl = await coverPhotoSnapshot.ref.getDownloadURL();
    }

    if (appIconFile) {
      const appIconSnapshot = await storage.ref(`apps/${appId}/appIcon`).put(appIconFile);
      appIconUrl = await appIconSnapshot.ref.getDownloadURL();
    }

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
      features,
      trailerLink,
      coverPhoto: coverPhotoUrl,
      appIcon: appIconUrl,
      images,
      functionalities,
      category,
      appFile: appFileDownloadUrl,
      techStack,
    };

    await newAppRef.set(newApp);

    // Clear input fields and state after saving
    setAppName('');
    setAppDescription('');
    setGenres([]);
    setFeatures([]);
    setTrailerLink('');
    setCoverPhotoFile(null);
    setAppIconFile(null);
    setImages(['', '', '', '', '']);
    setFunctionalities([]);
    setCategory('');
    setAppFile(null);
    setTechStack([]);
    setLoading(false);
  };

  return (
    <div className='pt-[85px] bg-background-color min-h-screen text-gray-200'>
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
              onChange={(e) => setAppIconFile(e.target.files[0])}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-sm text-gray-400 mt-2'>Upload the app icon.</p>
          </div>
          <div className='mb-4'>
            {images.map((image, index) => (
              <div key={index} className='mb-2'>
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index] = e.target.value;
                    setImages(newImages);
                  }}
                  required
                  className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            ))}
          </div>
          <div className='mb-4'>
            <input
              type="file"
              onChange={(e) => setAppFile(e.target.files[0])}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-sm text-gray-400 mt-2'>Upload the app file.</p>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Genres</h3>
            <div className='flex flex-col mb-3'>
              <input
                type="text"
                placeholder="Enter Genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div>
                  
              <button
                onClick={handleAddGenre}
                className='p-2 bg-blue-600 inline-block mt-[15px] rounded-md text-white hover:bg-blue-700'
              >
                Add Genre
              </button>
                </div>
            </div>
            <div className='flex flex-wrap'>
              {genres.map((genre, index) => (
                <div key={index} className='p-2 bg-gray-700 rounded-md mr-2 mb-2'>
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Functionalities</h3>
            <div className='flex flex-col mb-3'>
              <input
                type="text"
                placeholder="Enter Functionality"
                value={newFunctionality}
                onChange={(e) => setNewFunctionality(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div >
              <button
                onClick={handleAddFunctionality}
                className='p-2 bg-blue-600 mt-[15px] inline-block rounded-md text-white hover:bg-blue-700'
              >
                Add Functionality
              </button>
                </div>
            </div>
            <div className='flex flex-wrap'>
              {functionalities.map((functionality, index) => (
                <div key={index} className='p-2 bg-gray-700 rounded-md mr-2 mb-2'>
                  {functionality}
                </div>
              ))}
            </div>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Features</h3>
            <div className='flex flex-col mb-3'>
              <input
                type="text"
                placeholder="Enter Feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
             
                <div>
                <button
                onClick={handleAddFeature}
                className='p-2 bg-blue-600 rounded-md inline-block mt-[15px] text-white hover:bg-blue-700'
              >
                Add Feature
              </button>
                </div>
            </div>
            <div className='flex flex-wrap'>
              {features.map((feature, index) => (
                <div key={index} className='p-2 bg-gray-700 rounded-md mr-2 mb-2'>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-3'>Tech Stack</h3>
            <div className='flex flex-col mb-3'>
              <input
                type="text"
                placeholder="Enter Tech Stack Item"
                value={newTechStackItem}
                onChange={(e) => setNewTechStackItem(e.target.value)}
                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />

              <div>
                <button
                  onClick={handleAddTechStackItem}
                  className='p-2 bg-blue-600 ml-auto  mt-[15px] inline-block rounded-md text-white hover:bg-blue-700' >
                  Add Tech Stack Item
                </button>
              </div>
            </div>
            <div className='flex flex-wrap'>
              {techStack.map((tech, index) => (
                <div key={index} className='p-2 bg-gray-700 rounded-md mr-2 mb-2'>
                  {tech}
                </div>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button
            onClick={handleSaveApp}
            className='w-full p-3 bg-green-600 rounded-md text-white hover:bg-green-700'
          >
            Save App
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAppManagement;
