// TODO: Pastikan hanya author yang bisa edit quiz

import { Separator } from "@/components/ui/separator";
import { Share, Trash2 } from "lucide-react";
import QuestionCard from "../../_components/question-card";
import NewQuestionCard from "../../_components/new-question-card";
import { auth } from "@/app/auth";
import ActionButtons from "./_components/action-buttons";

const EditQuiz = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <main className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Quiz Name (3 questions)</p>
        <div className="flex items-center space-x-4">
          <ActionButtons session={session} quiz={{ tyty: "smol" }} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <NewQuestionCard session={session} />
      </div>
    </main>
  );
};
export default EditQuiz;
