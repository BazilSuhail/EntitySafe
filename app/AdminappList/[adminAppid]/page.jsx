'use client';
import { useState, useEffect } from 'react';
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

const AdminEditApp = ({ params }) => {
    const id = params.adminAppid; 
    const [appData, setAppData] = useState({
        name: '',
        description: '',
        trailerLink: '',
        coverPhoto: '',
        appIcon: '',
        images: [],
        genres: [],
        functionalities: [],
        features: [],
        techStack: [],
        category: '' // Single category as a string
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchAppData = async () => {
                const appRef = db.ref(`apps/${id}`);
                appRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    setAppData({
                        name: data?.name || '',
                        description: data?.description || '',
                        trailerLink: data?.trailerLink || '',
                        coverPhoto: data?.coverPhoto || '',
                        appIcon: data?.appIcon || '',
                        images: data?.images || [],
                        genres: data?.genres || [],
                        functionalities: data?.functionalities || [],
                        features: data?.features || [],
                        techStack: data?.techStack || [],
                        category: data?.category || '' // Load single category
                    });
                });
            };

            fetchAppData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        setAppData((prevData) => ({ ...prevData, [fieldName]: file }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        const appRef = db.ref(`apps/${id}`);

        let coverPhotoUrl = appData.coverPhoto;
        let appIconUrl = appData.appIcon;

        if (appData.coverPhoto instanceof File) {
            const coverPhotoSnapshot = await storage.ref(`apps/${id}/coverPhoto`).put(appData.coverPhoto);
            coverPhotoUrl = await coverPhotoSnapshot.ref.getDownloadURL();
        }

        if (appData.appIcon instanceof File) {
            const appIconSnapshot = await storage.ref(`apps/${id}/appIcon`).put(appData.appIcon);
            appIconUrl = await appIconSnapshot.ref.getDownloadURL();
        }

        const updatedAppData = {
            ...appData,
            coverPhoto: coverPhotoUrl,
            appIcon: appIconUrl,
        };

        await appRef.set(updatedAppData);

        setLoading(false);
    };

    const handleDeleteApp = async () => {
        setLoading(true);
        const appRef = db.ref(`apps/${id}`);
        await appRef.remove();
        router.push('/admin/app-list');
        setLoading(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            <p className="text-xl font-bold text-gray-200 ml-4">Saving Changes...</p>
        </div>
    );

    return (
        <div className='pt-[85px] bg-background-color min-h-screen text-gray-200'>
            <div className='max-w-4xl mx-auto p-6'>
                <h2 className='text-3xl font-bold mb-6'>Edit App</h2>
                <div className='mb-4'>
                    <input
                        type="text"
                        name="name"
                        placeholder="App Name"
                        value={appData.name}
                        onChange={handleChange}
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <textarea
                        name="description"
                        placeholder="App Description"
                        value={appData.description}
                        onChange={handleChange}
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="text"
                        name="trailerLink"
                        placeholder="Trailer Link"
                        value={appData.trailerLink}
                        onChange={handleChange}
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <p className='text-sm text-gray-400 mt-2'>URL to the trailer video of the app.</p>
                </div>
                <div className='mb-4'>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'coverPhoto')}
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <p className='text-sm text-gray-400 mt-2'>Upload the cover photo of the app.</p>
                </div>
                <div className='mb-4'>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'appIcon')}
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <p className='text-sm text-gray-400 mt-2'>Upload the app icon.</p>
                </div>
                <div className='mb-4'>
                    {appData.images.map((image, index) => (
                        <div key={index} className='mb-2'>
                            <input
                                type="text"
                                placeholder={`Image URL ${index + 1}`}
                                value={image}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                                className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    ))}
                </div>
                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Genres</h3>
                    {appData.genres.map((genre, index) => (
                        <div key={index} className='flex items-center mb-3'>
                            <input
                                type="text"
                                value={genre}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'genres')}
                                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={() => handleArrayDelete(index, 'genres')}
                                className='p-2 bg-red-600 text-white rounded-md'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleArrayAdd('genres')}
                        className='p-2 bg-blue-600 text-white rounded-md'
                    >
                        Add Genre
                    </button>
                </div>
                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Functionalities</h3>
                    {appData.functionalities.map((func, index) => (
                        <div key={index} className='flex items-center mb-3'>
                            <input
                                type="text"
                                value={func}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'functionalities')}
                                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={() => handleArrayDelete(index, 'functionalities')}
                                className='p-2 bg-red-600 text-white rounded-md'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleArrayAdd('functionalities')}
                        className='p-2 bg-blue-600 text-white rounded-md'
                    >
                        Add Functionality
                    </button>
                </div>
                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Features</h3>
                    {appData.features.map((feature, index) => (
                        <div key={index} className='flex items-center mb-3'>
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={() => handleArrayDelete(index, 'features')}
                                className='p-2 bg-red-600 text-white rounded-md'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleArrayAdd('features')}
                        className='p-2 bg-blue-600 text-white rounded-md'
                    >
                        Add Feature
                    </button>
                </div>
                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Tech Stack</h3>
                    {appData.techStack.map((tech, index) => (
                        <div key={index} className='flex items-center mb-3'>
                            <input
                                type="text"
                                value={tech}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'techStack')}
                                className='w-full p-2 mr-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={() => handleArrayDelete(index, 'techStack')}
                                className='p-2 bg-red-600 text-white rounded-md'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleArrayAdd('techStack')}
                        className='p-2 bg-blue-600 text-white rounded-md'
                    >
                        Add Tech
                    </button>
                </div>
                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Category</h3>
                    <input
                        type="text"
                        name="category"
                        value={appData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button
                    onClick={handleSaveChanges}
                    className='p-3 bg-green-600 text-white rounded-md'
                >
                    Save Changes
                </button>
                <button
                    onClick={handleDeleteApp}
                    className='p-3 bg-red-600 text-white rounded-md ml-4'
                >
                    Delete App
                </button>
            </div>
        </div>
    );
};

export default AdminEditApp;
