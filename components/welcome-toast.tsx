'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to the Total Tease Experience', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            Want 101+ ways to make money with your clothes on?{' '}
            <a
              href="/products/sex-talk-101-ways-to-make-money-with-no-contact-sex-work"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Don't miss out on the launch price for the book that explains how!
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
