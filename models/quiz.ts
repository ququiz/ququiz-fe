/**
 * Domain Object
 */

type QuestionType = "MULTIPLE" | "ESSAY";

type Choice = {
  id?: string;
  text: string;
  is_correct?: boolean; // DEFAULT FALSE
};

type Question = {
  id: string;
  question: string;
  type: QuestionType;
  weight: number;
  choices?: Choice[]; // Only applicable if type is "MULTIPLE"
  essay_answer?: string; // Only applicable if type is "ESSAY"
};

/**
 * Request Object
 */

type CreateQuizRequest = {
  title: string;
  start_time: string; // DATE
  end_time: string; // DATE
  questions: Question[];
};

type UpdateQuizRequest = Partial<CreateQuizRequest>;

type AddNewParticipantRequest = {
  participant_id: number;
};

/**
 * Response Object
 */

type CreateQuizResponse = BaseResponse<{
  created_quiz: {
    id: string;
  };
}>;

type UpdateQuizResponse = Omit<BaseResponse<{}>, "data">;

type JoinQuizResponse = Omit<BaseResponse<{}>, "data">;

type DeleteQuizResponse = Omit<BaseResponse<{}>, "data">;

type AddNewParticipantResponse = Omit<BaseResponse<{}>, "data">;

type StartQuizResponse = Omit<BaseResponse<{}>, "data">;
