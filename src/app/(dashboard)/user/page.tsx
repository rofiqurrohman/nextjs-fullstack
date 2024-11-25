'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';

function User() {
  const { data: dataProfile, isLoading: isLoadingProfile } = trpc.profile.getProfile.useQuery();
  // const { data: dataUser, isLoading: isLoadingUser } = trpc.user.useQuery();

  return (
    <div>
      <h1>Profile</h1>
      {isLoadingProfile && <p>Loading...</p>}
      {dataProfile && <pre>{JSON.stringify(dataProfile, null, 2)}</pre>}
    </div>
  );
}

export default User;
