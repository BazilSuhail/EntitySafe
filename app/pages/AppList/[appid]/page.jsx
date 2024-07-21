'use client';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import style from "../Applist.module.css"
import 'firebase/compat/database';
import 'firebase/compat/storage'; // Import Firebase Storage module
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const storage = firebase.storage(); // Initialize Firebase Storage
const MediaCarousel = ({ videoUrl, imageUrls, appDetailsName }) => {
  const [activeMedia, setActiveMedia] = useState(videoUrl);

  const handleMediaClick = (mediaUrl) => {
    setActiveMedia(mediaUrl);
  };

  return (
    <div className='w-[100%] flex flex-col'>
      <div className='w-full h-[280px] md:h-[300px] lg:h-[400px]'>
        {activeMedia.includes('youtube.com') ? (
          <iframe
            width="100%"
            height="100%"
            src={activeMedia}
            title="YouTube video player"
            className='rounded-md'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className='relative w-full h-full'>
            <Image
              src={activeMedia}
              alt={`${appDetailsName} main media`}
              layout="fill"
              objectFit="cover"
              quality={85}
              className='rounded-md'
            />
          </div>
        )}
      </div>


      <div className='h-[2px] w-[70%] mx-auto bg-gray-200 rounded-xl my-[25px]'></div>

      <div className={style.customScrollbar}>
        <div className=' my-2 mr-[-15px] relative'>
          <iframe
            width="180"
            height="100"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`ml-[25px] rounded-md border-2 border-background-color ${activeMedia === videoUrl ? 'border-blue-500' : 'border-background-color'}`}
          ></iframe>
          <div
            onClick={() => handleMediaClick(videoUrl)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 1,
            }}
          ></div>
        </div>
        {imageUrls.map((image, index) => (
          <div key={index} className='thumbnail m-2 cursor-pointer' onClick={() => handleMediaClick(image)}>
            <div className='relative w-[180px] h-[100px]'>
              <Image
                src={image}
                alt={`${appDetailsName} image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={85}
                className={`ml-[25px] rounded-md border-2 border-background-color ${activeMedia === image ? 'border-blue-500' : 'border-background-color'}`}

              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};


const AppDetails = ({ params }) => {
  const [appDetails, setAppDetails] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const snapshot = await db.ref(`apps/${params.appid}`).once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAppDetails(data);
          // Convert GitHub URLs to raw URLs
          const rawImageUrls = data.images.map(imageUrl => {
            // Check if the URL is a GitHub URL
            if (imageUrl.includes('github.com')) {
              return imageUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
            }
            return imageUrl;
          });
          fetchImages(rawImageUrls);
        } else {
          console.log(`App with ID ${params.appid} does not exist`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching app details:', error);
        setLoading(false);
      }
    };

    const fetchImages = async (imageUrls) => {
      try {
        const fetchedImageUrls = await Promise.all(
          imageUrls.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          })
        );
        setImageUrls(fetchedImageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <p className='pt-[85px]'>Loading...</p>;
  }

  if (!appDetails) {
    return <p className='pt-[85px]'>App details not found.</p>;
  }

  return (
    <div className='pt-[85px] bg-backrground-color flex flex-col'>

      <div className='w-[95vw] lg:w-[80vw] mx-[15px] xl:mx-auto grid grid-cols-1  lg:grid-cols-11'>

        <div className='col-span-8 lg:h-screen overflow-y-auto w-[100%] justify-start flex-col'>
          <div className='text-white font-medium mb-[15px] text-[35px]'>{appDetails.name}</div>
          {/*
          <div className='w-[100%] h-[450px] relative'>
            <Image
              src={appDetails.coverPhoto}
              alt={appDetails.name}
              layout="fill"
              objectFit="cover" // Adjust this based on how you want the image to fit
              quality={85}
            />
          </div>          
          */}
          <MediaCarousel
            videoUrl={appDetails.trailerLink.replace("watch?v=", "embed/")}
            imageUrls={imageUrls}
            appDetailsName={appDetails.name}
          />
          <p className='text-sm md:text-[16px] mt-[15px]  text-gray-300'>{appDetails.description}</p>
          <div className='bg-search-color mt-[25px] rounded-lg px-[20px] py-[12px] inline-block'>
            <div className='text-gray-300 '>Genres</div>
            <div className='flex ml-[-6px]'>
              {appDetails.genres.map((genre, index) => (
                <p className='ml-[6px]' key={index}>
                  <span className='underline'>{genre}</span>
                  {index < appDetails.genres.length - 1 && <span className='px-[2px]'>,</span>}
                </p>
              ))}
            </div>
          </div>
          <div className='bg-search-color sm:ml-[15px] mt-[15px] sm:mt-[25px] rounded-lg pl-[15px] pr-[85px] md:pr-[45px] py-[12px] inline-block'>
            <div className='text-gray-300 '>Category</div>
            <div className='ml-[6px] font-bold'># {appDetails.category}</div>
          </div>
          <h1 className='text-gray-200 text-[30px] my-[15px] font-medium'>Features</h1>
          {appDetails.functionalities.map((functionality, index) => (
            <div className='flex   '>
              <p className='w-[10px] mt-[7px] h-[10px] mr-[8px] p-[4px] bg-white rounded-full'></p>

              <p key={index}>{functionality}</p>
            </div>
          ))}
          <h1 className='text-gray-200 text-[30px] my-[15px] font-medium'>Functionalities</h1>
          {appDetails.titles.map((titles, index) => (
            <div className='flex   '>
              <p className='w-[10px] mt-[7px] h-[10px] mr-[8px] p-[4px] bg-white rounded-full'></p>
              <p key={index}>{titles}</p>
            </div>
          ))}
        </div>

        <div className='lg:h-screen col-span-3'>
          sd
        </div>
      </div>

      <h1>{appDetails.name}</h1>

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
      <h2>Functionalities</h2>
      <ul>
        {appDetails.functionalities.map((functionality, index) => (
          <li key={index}>{functionality}</li>
        ))}
      </ul>
      <h2>Category</h2>
      <p>{appDetails.category}</p>
      <button onClick={handleInstallApp}>Install App</button>
    </div>
  );
};
export default AppDetails;
