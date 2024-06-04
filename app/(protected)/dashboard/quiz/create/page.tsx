// TODO: Pastikan hanya author yang bisa edit quiz

import { Separator } from "@/components/ui/separator";
import NewQuestionCard from "../_components/new-question-card";
import { auth } from "@/app/auth";

const CreateQuiz = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <main className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Initialize your quiz!</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <NewQuestionCard session={session} />
      </div>
    </main>
  );
};
export default CreateQuiz;
