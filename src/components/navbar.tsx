'use client';
import Link from 'next/link';
import React from 'react';
import Account from '@/components/account';
import ModeToggle from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-between h-14 px-4 md:px-6 lg:px-8 border-b'>
      <Link href={'/'} className='font-bold italic'>
        Next Js
      </Link>
      <div className='flex items-center gap-5'>
        <ModeToggle />
        <Account />
      </div>
    </div>
  );
};

export default Navbar;
