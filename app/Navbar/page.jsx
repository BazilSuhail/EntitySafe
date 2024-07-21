'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import useRouter from next/navigation
import { IoMenu, IoClose, IoSearchOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { CgHomeAlt } from "react-icons/cg";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const router = usePathname();
    const text = "Entity  App  Vault";

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to determine if link is active
    const isActive = (href) => {
        return router === href;
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-navbar-color fixed w-full z-50 backdrop-blur-[5px]">

            {/* Full navbar for larger screens */}
            <div className="w-full z-50 md:flex hidden bg-navbar-color backdrop-blur-[10px] items-center h-[70px] fixed bottom-0 md:top-0 md:bottom-auto">

                <div className="w-[35px] h-[35px] mr-[30px] bg-gray-500 ml-[15px]"></div>

                <div className="w-[2px] rounded-xl h-[50px] mr-[15px] text bg-gray-700 "></div>

                <div className="flex text-[22px] ">
                    {/*text.split("").map((letter, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0, rotate: -185 }}
                            animate={{ x: 0, rotate: 0, opacity: 1 }}
                            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: index * 0.1 }}
                            className="inline-block font-extrabold"
                        >
                            {letter}
                        </motion.div>
                    ))*/}
                </div>
                
                <Link href={"/"} ><CgHomeAlt className='text-[28px] text-gray-400 '/></Link>
                <Link href={"/pages/DisplayApp"} className="ml-[25px]  font-medium text-slate-300">Discover</Link>
                <Link href={"/pages/AppList"} className="ml-[18px]  font-medium text-slate-300">Applist</Link>
                <Link href={"/AdminApp"} className="ml-[18px]  font-medium text-slate-300">Admin</Link>
               
                <div className="ml-[18px]  font-medium text-slate-300">Discover</div>

                <div className='w-[250px] ml-auto mr-[15px] bg-search-color rounded-3xl border-gray-500 flex items-center border-[1px] px-[6px] py-[4px]'>
                    <IoSearchOutline size={25} className="text-white mr-[15px]" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-[15px] outline-none focus:outline-none focus:border-none"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>

            </div>

            {/* Hamburger menu button */}
            <div className="relative md:hidden">
                <div className="flex  items-center h-[70px] justify-between px-4 py-3 z-50 relative">
                    <div className="flex items-center">
                        <div className="w-[35px] h-[35px] bg-gray-500 mr-[12px]"></div>
                        {text.split("").map((letter, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -50, opacity: 0, rotate: -185 }}
                                animate={{ x: 0, rotate: 0, opacity: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 200, delay: index * 0.1 }}
                                className="inline-block text-lg font-extrabold"
                            >
                                {letter}
                            </motion.div>
                        ))}
                    </div>
                    <div className="md:hidden">
                        {isMenuOpen ? (
                            <IoClose size={25} onClick={handleMenuToggle} className="cursor-pointer text-gray-300" />
                        ) : (
                            <IoMenu size={25} onClick={handleMenuToggle} className="cursor-pointer text-gray-300" />
                        )}
                    </div>
                </div>

                {/* Full navbar for smaller screens */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ y: -100, height: 0 }}
                            animate={{ y: 0, height: "100vh", transition: { duration: 0.5 } }}
                            exit={{ y: -100, height: 0, transition: { duration: 0.5, delay: 0.5 } }}
                            className="fixed inset-0 bg-navbar-color flex flex-col h-screen px-4 py-3 z-40"
                        >
                            <div className='my-[25px]'></div>
                            {/* Menu items */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                                exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                                className="flex flex-col mt-10"
                            >
                                <Link href={"/pages/AppList"} className="font-medium w-[85%] rounded-lg bg-gray-700 mx-auto py-[5px] pl-[15px] text-[18px] text-slate-300 mb-[15px] cursor-pointer">Support</Link>
                                <div className="font-medium w-[85%] rounded-lg bg-gray-700 mx-auto py-[5px] pl-[15px] text-[18px] text-slate-300 mb-[15px] cursor-pointer">Discover</div>
                            </motion.div>

                            {/* Search input */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                                exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                                className="flex mx-auto w-[90%] items-center bg-search-color my-[15px] rounded-3xl border border-gray-500 p-[10px]"
                            >
                                <IoSearchOutline size={25} className="text-white mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-transparent text-[15px] outline-none focus:outline-none focus:border-none"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>




        </nav>
    );
};

export default Navbar;