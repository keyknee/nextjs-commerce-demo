'use client';

import type { Member } from 'lib/wix/types';
import Form from 'next/form';
import { useEffect, useState } from 'react';
import { join } from './actions';

export function JoinCommunity() {
  const [member, setMember] = useState<Member | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestJoin, setRequestJoin] = useState<boolean>(false);
  const [banner, setBannerDetails] = useState(undefined);

  async function handleLogin() {
    const res = await fetch(`/api/login?originalUri=${window.location.href}`);
    if (res.ok) {
      const { authUrl } = await res.json();
      window.location.href = authUrl;
    }
  }

  async function handleJoinClick() {
    setRequestJoin(true);
    if (isLoggedIn) {
      return await join();
    } else {
      await handleLogin();
    }
  }

  const fetchMember = async () => {
    try {
      const response = await fetch('/api/member?extended=true');
      const data = await response.json();
      if (data.member) {
        setIsLoggedIn(true);
        setMember(data.member);
      }
    } catch (error) {
      console.error('error fetching member', error);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <div className="bg-community relative flex h-[360px] w-full flex-col items-center justify-end bg-cover py-[4vw] lg:justify-start">
      {member?.activityStatus === 'ACTIVE' ? (
        <>
          <h2 className="text-shadow-sm relative z-[1] font-decorative-serif text-4xl uppercase max-md:text-2xl">
            You've Joined the Community!
            <span className="block text-center text-2xl max-md:text-xl">
              Your World of{' '}
              <span className="text-3xl text-theme-secondary max-md:text-2xl">Refined</span>{' '}
              <span className="relative -left-2.5 top-2 font-decorative-script text-4xl font-semibold capitalize text-theme-primary max-md:text-2xl">
                Pleasure
              </span>{' '}
              Awaits
            </span>
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-shadow-sm relative z-[1] font-decorative-serif text-3xl uppercase max-md:text-2xl">
            Enter a World of{' '}
            <span className="text-4xl font-semibold text-theme-secondary max-md:text-3xl">
              Refined
            </span>{' '}
            <span className="relative -left-2.5 top-2 font-decorative-script text-4xl font-semibold capitalize text-theme-primary max-md:text-2xl">
              Pleasure
            </span>{' '}
            <span className="block text-center text-2xl max-md:text-xl">
              Join the Exclusive Community
            </span>
          </h2>

          <Form action={handleJoinClick} className="relative z-[1] justify-self-end">
            <button className="mt-3 font-semibold uppercase drop-shadow-sm before:absolute before:-inset-1 before:-z-[1] before:block before:-skew-y-3 before:bg-theme-primary before:p-2 before:drop-shadow-md hover:text-theme-secondary">
              Join Now
            </button>
          </Form>
        </>
      )}
      <div className="bg-gradient-theme-secondary-75 absolute left-0 top-0 h-full w-full" />
    </div>
  );
}
