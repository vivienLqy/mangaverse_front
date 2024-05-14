import React, { useState } from 'react';
import Logo from "../../assets/Logo.svg";
import { NavLink } from 'react-router-dom';

const NavAdmin = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='flex w-1/6 bg-nav justify-center'>
            <div className="flex flex-col">
                <div className=' mt-10'>
                    <NavLink to="/">
                        <img className="m-auto" src={Logo} alt="logo" />
                    </NavLink>
                </div>
                <div>
                    <ul>
                        <li className='p-2'>
                            <p className="text-center text-gray-400 text-2xl">DASHBOARD</p>
                        </li>
                        <li className='bg-lavande p-2'>
                            <div onClick={toggleDropdown} className="flex items-center flex-col text-white cursor-pointer relative">
                                <div className='flex flex-row'>
                                    <NavLink to="/dashboard" className="flex items-center flex-row text-white text-2xl">
                                        <p>Produits</p>
                                        <span className={`ml-1 transform ${showDropdown ? '0' : 'rotate-90'} transition duration-300 ease-in-out`}>&#9660;</span>
                                    </NavLink>
                                </div>
                                {showDropdown && (
                                    <ul className="text-white absolute top-full left-50 mt-2 text-center text-sm">
                                        <li className='hover:underline'>
                                            <NavLink to="/produits" className="flex items-center flex-col text-white">
                                                <p>Categories</p>
                                            </NavLink>
                                        </li>
                                        <li className='hover:underline'>
                                            <NavLink to="/produits" className="flex items-center flex-col text-white">
                                                <p>Types</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavAdmin;
