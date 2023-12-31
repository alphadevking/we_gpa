"use client"
import { Layout } from '@/components/Layout'
import { assets } from '@/components/mapData';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PiCaretDoubleRightBold } from "react-icons/pi";

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="icon" href="/logo.png" sizes="any" /> 
      </Head>
      <Layout navbar footer className="mx-l md:ml-24 lg:ml-32 p-5">
        <div className="md:flex md:mr-0 mr-10">
          <div className="md:flex items-center">
            <div className="">
              <h1 className="lg:text-5xl font-medium leading-tight text-3xl tracking-tight">
                Welcome to the
                <span className='font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'> Ultimate </span>
                GPA and CGPA Calculator
                <p className="mt-4 text-sm font-normal tracking-normal">
                  The one-stop solution tailored for college students who seek clarity and efficiency in managing their academic progress!
                </p>
                <Link href={'/auth/login'} className="mt-3 flex w-fit items-center gap-3 hover:gap-4 py-4 px-6 bg-gray-900 text-white rounded-lg transition-all duration-500 transform hover:scale-105 cursor-pointer hover:shadow-lg">
                  <button className="text-lg text-md outline-none border-none">Start Now</button>
                  <PiCaretDoubleRightBold className="h-5 w-5" />
                </Link>
              </h1>
            </div>
          </div>

          <div className="w-2/5 pr-24 md:flex justify-center items-center hidden">
            <Image
              className="rounded-lg w-full"
              src={assets.images.editorKeys}
              alt="editorKeys"
            />
          </div>
        </div>
      </Layout>
    </main>
  )
}
