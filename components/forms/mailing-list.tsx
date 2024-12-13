'use client';
import { BrandAccentedHeadings } from 'components/typography';
import Form from 'next/form';
import { useState } from 'react';
import { create } from './actions';

export default function MailingListForm() {
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    try {
      const { subscription } = await create(email);

      if (subscription) {
        setIsSubmitted(true);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Form
      action={handleSubmit}
      className="flex w-full flex-col items-center justify-center bg-textured-gold px-6 py-12"
    >
      {isSubmitted ? (
        <>
          <BrandAccentedHeadings
            headingCopy="You're In!"
            headingLevel={2}
            variant="AccentFirstAndLast"
          />
          <p className="my-4 font-decorative-serif text-2xl">
            Thank you for joining our mailing list! You'll be the first to know when the site
            launches.
          </p>
        </>
      ) : (
        <>
          <BrandAccentedHeadings
            headingCopy="Hate to be a Tease..."
            headingLevel={2}
            variant="AccentFirstAndLast"
          />
          <div className="my-2 text-center font-decorative-serif text-3xl max-md:text-2xl">
            <p>We Promise to Only Send Fine Things</p>
          </div>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-6 px-4 md:px-[20%]">
            <label htmlFor="email" className="hidden">
              Email Address
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email address here"
              required
              autoComplete="email"
              className="w-full max-w-sm rounded-lg bg-slate-100/80 px-4 py-2 text-lg shadow-sm placeholder:text-slate-900/80 dark:bg-slate-950/80 dark:placeholder:text-theme-primary/80"
            />
            <button
              className="min-w-max rounded-lg border-2 border-slate-400 bg-slate-100/80 px-3 py-2 text-lg text-slate-900 shadow-sm dark:bg-slate-950/80 dark:text-theme-primary"
              type="submit"
            >
              Join Now
            </button>
          </div>
        </>
      )}
    </Form>
  );
}
