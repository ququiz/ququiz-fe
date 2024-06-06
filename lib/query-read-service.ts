const apiUrl = process.env.NEXT_PUBLIC_QUERY_API_URL;

export const getQuizzes = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes: " + data.message);
    }

    return data as GetQuizResponse;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getQuizQuestion = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch quiz question: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getQuizDetail = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch quiz request: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserAnswer = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz/${quizId}/result`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch user answer: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};
