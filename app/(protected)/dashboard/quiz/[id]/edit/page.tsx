import { Separator } from "@/components/ui/separator";
import QuestionCard from "../../_components/question-card";
import NewQuestionCard from "../../_components/new-question-card";
import { auth } from "@/app/auth";
import ActionButtons from "./_components/action-buttons";
import { getQuizDetail } from "@/lib/query-read-service";
import { notFound } from "next/navigation";

const EditQuiz = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quiz = await getQuizDetail(params.id, session.accessToken);
  if ("error" in quiz) {
    throw new Error(quiz.error);
  }

  if (quiz.quiz.creator_id !== session.user.id) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">
          {quiz.quiz.name} ({quiz.quiz.questions.length} questions)
        </p>
        <div className="flex items-center space-x-4">
          <ActionButtons session={session} quiz={quiz.quiz} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        {quiz.quiz.questions.map((q) => (
          <QuestionCard key={q.question} />
        ))}
        <NewQuestionCard quiz={quiz.quiz} session={session} />
      </div>
    </main>
  );
};
export default EditQuiz;
