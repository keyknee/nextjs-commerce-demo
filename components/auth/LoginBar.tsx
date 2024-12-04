'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { Member } from 'lib/wix/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default function LoginBar() {
  const [member, setMember] = useState<Member | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const path = usePathname();

  const fetchMember = async () => {
    try {
      const response = await fetch('/api/member');
      const data = await response.json();
      if (data.member) {
        setIsLoggedIn(true);
        setMember(data.member);
      }
    } catch (error) {
      console.error('error fetching member', error);
    }
  };
  async function handleLogin() {
    const res = await fetch(`/api/login?originalUri=${window.location.href}`);
    if (res.ok) {
      const { authUrl } = await res.json();
      window.location.href = authUrl;
    }
  }

  function handleMenuButtonClick() {
    setAccountMenuOpen((prev) => !prev);
  }

  async function handleLogout() {
    const res = await fetch(`/api/logout?originalUri=${window.location.href}`);
    if (res.ok) {
      const { logoutUrl } = await res.json();
      window.location.href = logoutUrl;
    }
  }
  useEffect(() => {
    fetchMember();
  }, []);
  useEffect(() => {
    console.log(member);
  }, [member]);

  useEffect(() => {
    if (accountMenuOpen) setAccountMenuOpen(false);
    fetchMember();
  }, [path]);

  return (
    <div className="relative bg-inherit">
      <button
        onClick={handleMenuButtonClick}
        style={
          {
            '--image-url': `url(${member?.profile?.photo?.url || ''})`
          } as CustomStyle
        }
        className={`align-center flex h-8 w-8 items-center rounded-full ${member?.profile?.photo?.url ? `bg-[image:var(--image-url)]` : 'bg-slate-100 dark:bg-slate-800'} group bg-cover bg-no-repeat shadow-sm shadow-black hover:scale-105`}
      >
        {!member?.profile?.photo?.url ? (
          <UserCircleIcon className="text-theme-secondary group-hover:text-theme-primary" />
        ) : null}
      </button>
      <div
        className={`${accountMenuOpen ? '' : 'hidden'} bg-nav absolute right-0 top-[56px] flex w-[200px] flex-col gap-y-4 rounded-md p-4`}
      >
        <div>
          <h4 className="font-decorative-serif text-lg text-theme-secondary">
            {isLoggedIn ? member?.profile?.nickname || 'Member' : 'Visitor'}
          </h4>
          {member && <span className="text-sm">@{member.profile.slug}</span>}
        </div>
        {member && <Link href={'/member/settings'}>Account Settings</Link>}
        <button onClick={isLoggedIn ? handleLogout : handleLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
}
