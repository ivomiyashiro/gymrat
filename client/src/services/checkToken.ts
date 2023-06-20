export const checkToken = async (token: string) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/auth/renew`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Cookie: `token=${ token }`
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Error while checking token.');

    const { user, error: apiError } = await response.json();
    if (apiError) throw new Error(apiError);

    return user;
    
  } catch (error) {
    console.log(error);

    return null;
  }
};
