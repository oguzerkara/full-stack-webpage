'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  username: string | null;
  isAdmin: boolean;
}

function Profile({ username, isAdmin }: ProfileProps) {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'GET',
      });
      if (response.ok) {
        console.log('Logout successful');
        router.push('/login');
      }
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="grid place-items-center bg-white mt-20 lg:h-screen h-full lg:px-32 px-4 py-8">
      <div className="flex-row rounded py-16 px-6 lg:px-16 lg:flex-row justify-center items-start w-full gap-6 max-w-screen-2x1 shadow-md">
        <h2 className="text-center text-thd-blau py-3">Profile page</h2>
        <p className='text-center bottom-3'>Welcome to the profile page</p>
        <div className='p-4 items-center justify-center bg-light-grey-transparent2 font-normal text-thd-blau py-2 px-4 rounded text-center'>
          {username ? (
            <Link href={`/profile/${username}`}>
              {username} || {isAdmin ? 'Admin' : 'Not Admin'}
            </Link>
          ) : (
            'No data available'
          )}
        </div>
        <button
          onClick={logout}
          type="button"
          className="bg-light-grey-transparent2 font-normal text-thd-blau py-2 px-4 rounded text-center hover:text-donau-blau"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
