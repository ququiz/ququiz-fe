const apiUrl = process.env.NEXT_PUBLIC_SCORING_API_URL;

export const getLeaderboard = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/scoring/${quizId}/leaderboard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard: " + data?.message);
    }

    return data as GetLeaderboardRes;
  } catch (error: any) {
    return { error: error.message };
  }
};
