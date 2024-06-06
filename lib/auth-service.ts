const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const getUserById = async (userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/user/${userId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch user: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};
