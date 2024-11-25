'use client';

import { CircleUserRound } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';
import { useRouter } from 'next/navigation';
// import { signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { clearToken } from '@/lib/auth';

const Account = () => {
  const { data: user, isLoading } = trpc.profile.getProfile.useQuery();
  // const user = data?.user;
  // console.log('user >>>>> ', user);

  const router = useRouter();

  const handleLogout = () => {
    clearToken();

    // Redirect ke halaman login
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <Button variant={'outline'} disabled size={'icon'} className='rounded-full'>
        <CircleUserRound size={16} />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button onClick={() => router.push('/login')} variant={'outline'}>
        Login
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} size={'icon'} className='rounded-full'>
          {user?.image ? (
            <Image
              src={user.image}
              width={32}
              height={32}
              alt={user.name ?? 'user'}
              className='h-full w-full rounded-full'
            />
          ) : (
            <CircleUserRound size={16} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* <p>{user?.name ?? 'user'}</p> */}
        <p>{user?.email ?? 'email'}</p>
        <span>{user?.role ?? 'role'}</span>
        <Button
          onClick={handleLogout}
          className='w-full'
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Account;
