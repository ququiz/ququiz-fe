const apiUrl = process.env.NEXT_PUBLIC_QUIZ_API_URL;

export const createQuiz = async (
  values: CreateQuizRequest,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/quiz/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to create quiz: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateQuiz = async (
  values: UpdateQuizRequest,
  quizId: string,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/quiz/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to update quiz: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const joinQuiz = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/quiz/${quizId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to join quiz: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteQuiz = async (quizId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/quiz/${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to delete quiz: " + data.message);
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};
