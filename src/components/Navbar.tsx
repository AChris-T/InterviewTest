import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ng from '../../public/images/ng.png';

export default function Navbar() {
  return (
    <div className="h-[80px] flex justify-between px-8 items-center w-full box">
      <div className="flex items-center  gap-4">
        <Image
          src={
            'https://thetravelhunters.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-thehunters.png.e207952a.png&w=1080&q=80'
          }
          alt=""
          width={250}
          height={50}
          className="object-cover"
        />
        <div className="w-[2px] h-10 bg-gray-400 hidden lg:flex"></div>
        <div className="mt-2 hidden lg:flex items-center gap-4">
          <Link href={'/'} className="text-lg hover:text-[#6e9e76]">
            Hotels
          </Link>
          <Link href={'/'} className="text-lg text-gray-200">
            Tour Packages
          </Link>
          <Link href={'/'} className="text-lg hover:text-[#6e9e76]">
            More
          </Link>
        </div>
      </div>
      <div className=" gap-4 items-center hidden lg:flex">
        <div className="flex items-center gap-2">
          <Image src={ng} alt="" width={50} height={50} />
          <h3 className="text-sm">Naira</h3>
        </div>
        <h3 className="text-green-100 font-semibold text-lg">
          List my Property
        </h3>
        <Link href={'/'}>Sign in</Link>
        <Link
          href={'/'}
          className="bg-green-200 hover:bg-green-300 text-white rounded-lg px-6 py-3"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
