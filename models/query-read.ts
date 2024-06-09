/**
 * Domain Object
 */

type Participant = {
  id: string;
  user_id: string;
  final_score: number;
  status: "IN_PROGRESS" | "NOT_STARTED" | "DONE";
};

type Quiz = {
  id: string;
  name: string;
  creator_id: string;
  creator_name: string;
  passcode: string;
  start_time: string; // ISO 8601 date string
  end_time: string; // ISO 8601 date string
  questions: Question[];
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE"; // Assuming "DONE" might be a possible status based on context
  participants: Participant[];
};

type QuestionAndUserAnswer = {
  question: string;
  type: QuestionType;
  choices: Choice[];
  weight: number;
  userChoice: string;
  userAnswer: string;
};

/**
 * Request Object
 */

type AnswerQuestionReq = {
  choiceID?: string;
  essayAnswer?: string;
};

/**
 * Response Object
 */

type GetQuizResponse = Quiz[] | null;

type GetQuestionRes = {
  id: string;
  question: string;
  type: string;
  choices: Choice[];
  weight: number;
}[];

type GetUserAnswerRes = {
  user_answers: QuestionAndUserAnswer[];
};

type GetQuizDetailRes = {
  quiz: Quiz;
};

type AnswerQuestionRes = {
  message: string;
  isCorrect: boolean;
};
