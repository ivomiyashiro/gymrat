import { IUser } from '@/interfaces';


export const loginWithCredentials = async (email: string, password: string): Promise<IUser | null> => {
  try {
    const url = `${process.env.API_BASE_URL}/auth/signin`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) throw new Error('Error while login user.');

    const { user, error: apiError }: { user: IUser, error: string } = await response.json();
    if (apiError) throw new Error(apiError);

    return user;

  } catch (error) {
    console.log(error);

    return null;
  }
};
