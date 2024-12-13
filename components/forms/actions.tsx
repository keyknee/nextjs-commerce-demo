'use server';
import { joinCommunity, subscribeUserEmail } from 'lib/wix';

export async function join() {
  return await joinCommunity();
}

export async function create(email: string) {
  return await subscribeUserEmail(email);
}
