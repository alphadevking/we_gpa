import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from 'react-icons/gr';
import { assets, topNavItems } from './mapData';
import Link from 'next/link';
import Image from 'next/image';
import SigninButton from './Buttons/signinButton';

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState<boolean>(false);

    const toggleNav = () => setShowNav(!showNav);

    return (
        <div className="md:px-32 px-5 fixed w-screen z-10 max-w-screen-2xl bg-transparent backdrop-blur pt-3 text-sm grid md:grid-flow-col items-center">
            <div className='flex justify-between items-center'>
                <Link href='/' className="flex gap-x-1 cursor-pointer select-none w-fit my-auto">
                    <Image src={assets.images.logo} className='w-12 h-12 m-auto' alt='weGPA'/>
                    <div className="font-semibold normal-case text-xl py-4">weGPA</div>
                </Link>
                <button onClick={toggleNav} className="md:hidden text-xl font-bold">
                    {showNav ? < GrClose className='' /> : <GiHamburgerMenu className=''/> }
                </button>
            </div>

            <div className={`${showNav ? "block" : "hidden"} left-0 top-full w-full bg-white/30 md:hidden`}>
                <ul className="flex flex-col items-center py-3">
                    {
                        topNavItems.map((val, i) => (
                            <li key={i} className="w-full text-center">
                                <Link href={val.href} target={val.target} className="px-4 py-3 rounded-md text-inherit font-medium cursor-pointer block tracking-wide hover:text-gray-500 duration-500">
                                    {val.title}
                                </Link>
                            </li>
                        ))
                    }
                    <div className='w-fit justify-end'>
                        <SigninButton />
                    </div>
                </ul>
            </div>

            <ul className="hidden md:flex md:py-4 md:gap-3 justify-center">
                {
                    topNavItems.map((val, i) => (
                        <li key={i}>
                            <Link href={val.href} target={val.target} className="px-4 py-3 rounded-md text-inherit font-medium cursor-pointer block w-full tracking-wide hover:text-gray-500 duration-500">
                                {val.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div className='hidden md:flex md:justify-end md:py-4 md:gap-3 text-right'>
                <SigninButton />
            </div>

        </div>
    );
};

export default Navbar;
