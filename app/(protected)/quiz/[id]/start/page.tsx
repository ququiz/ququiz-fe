import { auth } from "@/app/auth";
import QuizStart from "./_components/quiz-start";

const Start = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return <QuizStart session={session} quiz={{}} />;
};
export default Start;
