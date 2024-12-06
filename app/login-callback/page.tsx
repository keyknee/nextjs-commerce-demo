'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    async function setToken() {
      const data = await fetch(`/api/verifyLogin?code=${code}&state=${state}`).then((response) =>
        response.json()
      );
      const { originalUri } = data;
      router.push(`${originalUri}`);
    }

    // Parse the fragment identifier from the URL
    const hash = window.location.hash.substring(1); // Remove the `#`
    const params = new URLSearchParams(hash);

    const code = params.get('code');
    const state = params.get('state');

    if (code && state) {
      // Redirect to server-side route with code and state as query parameters
      setToken();
    } else {
      console.error('Missing code or state in the URL fragment.');
      router.push('/error'); // Redirect to an error page if needed
    }
  }, [router]);

  return <p>Processing login, please wait...</p>;
}
