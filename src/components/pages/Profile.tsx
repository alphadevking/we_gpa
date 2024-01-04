// "use client"
import { Layout } from '@/components/Layout'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { PiDownload, PiExport, PiHouse, PiUser, PiUserBold } from 'react-icons/pi'
import { RiRadioButtonLine } from "react-icons/ri";

export const Profile = () => {

    const { data: session } = useSession();
    // console.log(session)
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update time every second

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <Layout navbar footer>
            <div className="">
                <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 top-20 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 min-h-screen">
                    <div className="m-4">
                        <ul className="mb-4 flex flex-col gap-1">
                            <li>
                                <Link className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" href="/dashboard">
                                    <PiHouse className='w-5 h-5' />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        dashboard
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link aria-current="page" className="font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-gray-600 to-gray-400 text-white shadow-md shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" href="/profile">
                                    <PiUser className='w-5 h-5' />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        profile
                                    </p>
                                </Link>
                            </li>
                        </ul>
                        <ul className="mb-4 flex flex-col gap-1">
                            <li className="mx-3.5 mt-4 mb-2">
                                <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                                    Other Actions
                                </p>
                            </li>
                            <li>
                                <Link className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" href="">
                                    <PiDownload className='w-5 h-5' />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Save to Google Drive
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" href="">
                                    <PiExport className='w-5 h-5' />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Export PDF
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 xl:ml-80">
                    <nav className="block w-full max-w-full bg-transparent shadow-none rounded-xl transition-all px-0 py-1">
                        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                            <div className="capitalize">
                                <nav aria-label="breadcrumb" className="w-max">
                                    <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                        <li className="flex items-center antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-gray-500">
                                            <Link href="/">
                                                <PiHouse className='w-5 h-5' />
                                            </Link>
                                            <span className="text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                                                /
                                            </span>
                                        </li>
                                        <li className="flex items-center antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                                                Profile
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-auto md:mr-4 md:w-56">
                                    <div className="relative w-full min-w-[200px] h-10">
                                        <input
                                            className="peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-200 focus:border-gray-500"
                                            placeholder=" "
                                        />
                                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] before:border-gray-200 peer-focus:before:border-gray-500 after:border-gray-200 peer-focus:after:border-gray-500">
                                            Search...
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="grid my-5 w-full">
                        
                        <div className="grid gap-5 md:flex flex-row rounded-lg bg-transparent p-5">
                            
                            <Image
                                className="w-20 h-20 rounded-sm object-cover"
                                src={session?.user.image || ""}
                                alt="User"
                                width={720}
                                height={720}
                            />
                            
                            <div className="grid md:flex flex-col my-auto">
                                
                                <div className="flex h-8 gap-0.5 flex-row">
                                    
                                    <h2 className="text-lg font-semibold">{session?.user.name}</h2>
                                    
                                    <FcApproval className='w-5 h-5 font-bold mt-1' />
                                </div>
                                
                                <div className="my-2 flex flex-row space-x-2">
                                    
                                    <div className="text-xs text-gray-400/80 hover:text-gray-400">
                                        {session?.user.email || ""}
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}
