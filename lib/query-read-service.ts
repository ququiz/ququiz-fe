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
      throw new Error("Failed to fetch quizzes: " + data?.message);
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
      throw new Error("Failed to fetch quiz question: " + data?.message);
    }

    return data as GetQuestionRes;
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
      throw new Error("Failed to fetch quiz request: " + data?.message);
    }

    return data as GetQuizDetailRes;
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
      throw new Error("Failed to fetch user answer: " + data?.message);
    }

    return data as GetUserAnswerRes;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCreatedQuizzes = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz/mine`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch created quizzes: " + data?.message);
    }

    return data as GetQuizResponse;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const answerQuestion = async (
  questionId: string,
  quizId: string,
  values: any,
  accessToken: string
) => {
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/quiz/${quizId}/questions/${questionId}/answer`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to answer question: " + data?.message);
    }

    return data as AnswerQuestionRes;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getQuizHistory = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/quiz/history`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch quiz history: " + data?.message);
    }

    return data as GetQuizResponse;
  } catch (error: any) {
    return { error: error.message };
  }
};
