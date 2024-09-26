'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';

function User() {
  const { data: dataProfile, isLoading: isLoadingProfile } = trpc.profile.useQuery();
  const { data: dataUser, isLoading: isLoadingUser } = trpc.user.useQuery();

  return (
    <div>
      <h1>Profile</h1>
      {isLoadingProfile && <p>Loading...</p>}
      {dataProfile && <pre>{JSON.stringify(dataProfile, null, 2)}</pre>}
      <hr></hr>
      <h1>User</h1>
      {isLoadingUser && <p>Loading...</p>}
      {dataUser && <pre>{JSON.stringify(dataUser, null, 2)}</pre>}
    </div>
  );
}

export default User;
