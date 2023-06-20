import { IUser } from '@/interfaces';

export const signupWithCredentials = async (name: string, email: string, password: string): Promise<{ user: IUser; error?: undefined;} | { user: null; error: any; }> => {
  try {
    const url = `${process.env.API_BASE_URL}/auth/signup`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password
      })
    });


    const { ok, user, msg }: {ok: boolean, user: IUser, msg: string } = await response.json();
    if (!ok) throw new Error(msg);

    return { user };

  } catch (error) {
    console.log(error);

    return { user: null, error };
  }
};
