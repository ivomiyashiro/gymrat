export const getUserByToken = async (token: string) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/auth/renew`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Cookie: `token=${ token }`
      }
    });

    if (!response.ok) throw new Error('Error while fetching product.');

    const { user, error: apiError } = await response.json();
    if (apiError) throw new Error(apiError);

    return { user };
  } catch (error) {
    console.log(error);

    return { user: null };
  }
};
