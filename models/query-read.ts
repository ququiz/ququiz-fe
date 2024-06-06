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
  passcode: string;
  start_time: string; // ISO 8601 date string
  end_time: string; // ISO 8601 date string
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE"; // Assuming "DONE" might be a possible status based on context
  participants: Participant[];
};

/**
 * Request Object
 */

/**
 * Response Object
 */

type GetQuizResponse = Quiz[];
