'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/user'} className='w-full'>
        <Button className='w-full'>View User</Button>
      </Link>
    </div>
  );
}
