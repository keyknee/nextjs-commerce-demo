'use server';
import { subscribeUserEmail } from 'lib/wix';
export async function create(email: string) {
  return await subscribeUserEmail(email);
}
