"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { VscHome, VscSignOut } from "react-icons/vsc";
import Link from "next/link";
import { PiUserCircleGear } from "react-icons/pi";

const SigninButton = () => {
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    if (session && session.user) {
        return (
            <div className="select-none relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)} className="flex w-fit gap-2 items-center justify-center px-3 py-2 hover:bg-white/20 rounded-lg duration-500"
                >
                    <Image
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                        className="rounded-full"
                        width={40}
                        height={40}
                    />
                    <p className="block text-sm">{session.user.name}</p>
                </button>

                {
                    dropdownOpen && (
                        <div className="absolute origin-top top-[70%] md:right-0 mt-5 grid gap-1 w-full py-2 bg-white rounded-md shadow-xl z-20 animate-fade-in-down text-xs duration-500">
                            <Link className="p-3 text-gray-800 hover:bg-gray-100 rounded-md font-bold" href={'/dashboard'}>
                                <div className="flex items-center gap-2 justify-center">
                                    <VscHome className='text-xl' />
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            <Link className="p-3 text-gray-800 hover:bg-gray-100 rounded-md font-bold" href={'/profile'}>
                                <div className="flex items-center gap-2 justify-center">
                                    <PiUserCircleGear className='text-xl' />
                                    <span>Profile</span>
                                </div>
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="p-3 text-gray-800 hover:bg-gray-100 rounded-md font-bold">
                                <div className="flex items-center gap-2 justify-center">
                                    <VscSignOut className='text-xl'/>
                                    <span>Sign Out</span>
                                </div>
                            </button>
                        </div>
                    )
                }
            </div>
        );
    } else {
        return (
            <button
                onClick={() => signIn()}
                type="button"
                className="flex gap-1 w-fit bg-white hover:bg-white/90 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 duration-500">
                <FcGoogle className='text-xl' />
                <span className="">Sign in with Google</span>
            </button>
        );
    }
};

export default SigninButton;