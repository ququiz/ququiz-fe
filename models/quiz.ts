/**
 * Domain Object
 */

type QuestionType = "MULTIPLE" | "ESSAY";

type Choice = {
  text: string;
  is_correct?: boolean; // DEFAULT FALSE
};

type Question = {
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

/**
 * Response Object
 */
