// "use client"
import { Layout } from '@/components/Layout'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { PiDownload, PiExport, PiHouse, PiUser, PiUserBold } from 'react-icons/pi'

export const Dashboard = () => {

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
                                <Link aria-current="page" className="font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-gray-600 to-gray-400 text-white shadow-md shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" href="/dashboard">
                                    <PiHouse className='w-5 h-5' />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        dashboard
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" href="/profile">
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
                                                Dashboard
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
                    <div className="mt-12">
                        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <PiUserBold className='w-5 h-5' />
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-600">
                                        Welcome, {session?.user.name?.split(" ")[0] || "user"}
                                    </p>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-gray-900">
                                        {time?.toLocaleTimeString() || "Loading..."}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                    <div>
                                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900 mb-1">
                                            Courses
                                        </h6>
                                        <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-gray-600">
                                            <FcApproval className='w-5 h-5' />
                                            <strong>30 saved</strong> so far
                                        </p>
                                    </div>
                                    <button
                                        aria-expanded="false"
                                        aria-haspopup="menu"
                                        id=":r5:"
                                        className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-gray-500 hover:bg-gray-500/10 active:bg-gray-500/30"
                                        type="button"
                                    >
                                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currenColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                                    <table className="w-full min-w-[300px] table-auto">
                                        <thead>
                                            <tr>
                                                <th className="border-b border-gray-50 py-3 px-6 text-center">
                                                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-800">
                                                        School Session
                                                    </p>
                                                </th>
                                                <th className="border-b border-gray-50 py-3 px-6 text-center">
                                                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-800">
                                                        Courses Registered
                                                    </p>
                                                </th>
                                                <th className="border-b border-gray-50 py-3 px-6 text-center">
                                                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-800">
                                                        Grade Point Average (GPA)
                                                    </p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-3 px-5 border-b border-gray-50">
                                                    <div className="flex items-center gap-1 w-fit mx-auto">
                                                        <p className="block antialiased font-sans text-sm leading-normal text-gray-900 font-bold">
                                                            200
                                                        </p>
                                                        <span className='text-xs py-2'>Level</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-gray-50">
                                                    <p className="block antialiased font-sans text-xs font-medium text-gray-600 w-fit mx-auto">
                                                        42
                                                    </p>
                                                </td>
                                                <td className="py-3 px-5 border-b border-gray-50">
                                                    <div className="w-10/12 mx-auto">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-gray-600 text-center">
                                                            60%
                                                        </p>
                                                        <div className="flex flex-start bg-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                            <div
                                                                className="flex justify-center items-center h-full bg-gradient-to-tr from-gray-600 to-gray-400 text-white"
                                                                style={{ width: "60%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
