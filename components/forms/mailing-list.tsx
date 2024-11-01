// import { createContact } from 'lib/wix';
import { subscribeUserEmail } from 'lib/wix';
import Form from 'next/form';

export default function MailingListForm() {
  async function create(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    // const response = await getContact(email).then((res) => console.log(res));
    // const formResponse = await createContact({ emails: { items: [{ email }] } }).then((res) =>
    //   console.log(res)
    // );
    const response = await subscribeUserEmail(email).then((res) => console.log(res));
  }
  return (
    <Form
      action={create}
      className="flex w-full flex-col items-center justify-center bg-gradient-theme-secondary px-6 py-12"
    >
      <h2 className="text-shadow-sm font-decorative-serif text-5xl">
        Be A<span className="text-6xl font-semibold uppercase tracking-tighter">{' Total '}</span>
        <span className="relative -bottom-3 -left-2.5 font-decorative-script text-6xl font-semibold text-theme-primary">
          {'Tease '}
        </span>
        <span className="font-semibold">{'XXX '}</span>
        VIP Vixen
      </h2>
      <div className="my-2 text-center text-xl">
        <p>Join our mailing list and get access to special deals exclusive to our subscribers.</p>
        <p>
          You've come to the right place for a <span className="hashtag">GirlsNight</span>{' '}
          <span className="hashtag">{'Pole'}</span>
        </p>
      </div>
      <div className="mt-12 flex w-full gap-6 px-[20%]">
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
          className="w-full rounded-lg bg-slate-100/80 px-4 py-2 text-lg shadow-sm placeholder:text-slate-900/80 dark:bg-slate-950/80 dark:placeholder:text-theme-primary/80"
        />
        <button
          className="min-w-max rounded-lg border-2 border-slate-400 bg-slate-100/80 px-3 py-2 text-lg text-slate-900 shadow-sm dark:bg-slate-950/80 dark:text-theme-primary"
          type="submit"
        >
          Join Now
        </button>
      </div>
    </Form>
  );
}
