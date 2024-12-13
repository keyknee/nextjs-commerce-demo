import {
  getCurrentMemberExtended,
  getMemberPlans,
  updateMemberProfile,
  updateMemberSlug
} from 'lib/wix';
import Form from 'next/form';
type FormField = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  autoComplete?: string;
};

type FormDetailsObject = Record<string, FormField>;

export default async function MemberSettings() {
  const member = await getCurrentMemberExtended();
  const { memberships = [] } = (await getMemberPlans()) || {};

  const formDetailsObject: FormDetailsObject = {
    _id: {
      type: 'hidden',
      value: member?._id ?? ''
    },
    nickname: {
      label: 'Display Name',
      placeholder: member?.profile?.nickname || 'Display Name',
      type: 'text'
    },
    slug: {
      label: 'Username',
      placeholder: member?.profile?.slug || 'Username',
      type: 'text'
    },
    loginEmail: {
      label: 'Email Address',
      type: 'email',
      placeholder: member?.loginEmail || 'Email Address',
      autoComplete: 'email'
    }
  };
  async function updateMemberDetails(formData: FormData) {
    'use server';
    // Safely retrieve and cast FormData entries
    const _id = formData.get('_id') as string | null | undefined;
    const nickname = formData.get('nickname') as string | null;
    const slug = formData.get('slug') as string | null;
    const loginEmail = formData.get('loginEmail') as string | null;
    const updateObject: { profile: { nickname?: string }; loginEmail?: string } = {
      profile: {}
    };

    if (nickname || loginEmail) {
      if (nickname) {
        updateObject.profile.nickname = nickname;
      }

      if (loginEmail) {
        updateObject.loginEmail = loginEmail;
      }
    }
    const updatedSlug = slug ? await updateMemberSlug(slug as string) : undefined;
    const updatedProfile =
      nickname || loginEmail ? await updateMemberProfile(_id as string, updateObject) : undefined;
    Promise.all([updatedSlug, updatedProfile]);
  }

  return (
    <div className="mx-auto my-20 max-w-screen-md bg-black/30 px-32 py-20">
      {member && (
        <>
          <div>
            <h2>Profile</h2>
            <Form action={updateMemberDetails} className="relative flex flex-col gap-y-4 p-4">
              {Object.entries(formDetailsObject).map(([k, v], i) => (
                <>
                  {v.type === 'hidden' ? (
                    <input key={`${k}_${i}`} name={k} id={k} type="hidden" value={`${v.value}`} />
                  ) : (
                    <label key={`${k}_${i}`} htmlFor={k} className="flex flex-col">
                      {`${v.label}:`}
                      <input
                        className="rounded-md bg-slate-400/30 p-2 placeholder:text-slate-600 dark:bg-slate-800/30 dark:placeholder:text-slate-400"
                        name={k}
                        id={k}
                        type={v.type || 'text'}
                        placeholder={v.placeholder}
                        autoComplete={v.autoComplete || 'off'}
                      />
                    </label>
                  )}
                </>
              ))}
              <button>Save Changes</button>
            </Form>
          </div>
          {/* <div>
            <h2>My Groups</h2>
            <ul className="p-4">
              {memberships &&
                memberships?.map(
                  (group: { groupDetails: { title: string; description: string } }) => (
                    <li className="flex justify-between">
                      <div>
                        <h3>{group.groupDetails.title}</h3>
                        <p>{group.groupDetails.description}</p>
                      </div>
                      <img src="" />
                    </li>
                  )
                )}
            </ul>
          </div>
          <button className="block">Reset Password</button>
          <button className="block">Delete Account</button> */}
        </>
      )}
    </div>
  );
}
