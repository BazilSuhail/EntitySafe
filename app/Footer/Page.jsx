import React from 'react'
import { MdOutlineFacebook } from "react-icons/md";
import { FaTwitterSquare } from "react-icons/fa";
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";

import { IoLogoYoutube } from "react-icons/io";
const Footer = () => {
    return (
        <footer className=' bg-backrground-color pt-[35px] w-full text-white'>
            <div className='grid  grid-cols-1 md:grid-cols-3 xsx:p-[55px] mx-auto   gap-y-[25px]'>
                <div className='flex flex-col p-[28px] justify-center '>
                    <div className='font-serif xsx:text-left text-[45px]  '>EntitySafe</div>
                    <div className='ml-[15px] text-sm mb-[25px]'>Your ultimate Destination to find gadgets with Analysis,Specifications and expert Reviews</div>
                </div>

                <div className="mx-auto grid p-[7px] m-[7px]  grid-cols-2 gap-4">
                    <div>
                        <p className='text-lg font-bold'>Languages Used:</p>
                        <div className="flex text-sm flex-col ml-[7px]">
                            <p>C++</p>
                            <p>Pyhton</p>
                            <p>Javascript</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-lg  font-bold'>Technologies Used</p>
                        <div className="flex text-sm flex-col ml-[7px]">
                            <p>SFML</p>
                            <p>Tkinter</p>
                            <p>React Native</p>
                            <p>Framer-motion</p>
                        </div>
                    </div> 
                </div>

                <div className='my-auto  xsx:ml-[25px]'>
                    <p className='font-bold text-lg ml-[12px] xsx:ml-[0px]'>Get in Touch</p>

                    <div className='flex  mt-[8px] text-[35px]'>
                        <MdOutlineFacebook className='ml-[15px] hover:bg-white hover:text-black' />
                        <FaLinkedin className='ml-[15px] hover:bg-white hover:text-black' />
                        <FaTwitterSquare className='ml-[15px] hover:bg-white hover:text-black' />
                        <IoLogoYoutube className='ml-[15px] hover:bg-white hover:text-black' />

                    </div>
 
                </div>

            </div>

            <div className='col-span-3 flex flex-col '>
                <div className='bg-hightlight-progress rounded-lg w-[95%] mx-auto h-[4px] my-[15px]'></div>
                <p className='text-center text-md  text-white  mb-[25px]'>@2024 EntitySafe, All Rights Reserved  </p>
            </div>
        </footer>
    )
}

export default Footer
