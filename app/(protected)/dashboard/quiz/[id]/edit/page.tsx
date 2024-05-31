// TODO: Pastikan hanya author yang bisa edit quiz

import { Separator } from "@/components/ui/separator";
import { Share } from "lucide-react";
import QuestionCard from "./_components/question-card";
import NewQuestionCard from "./_components/new-question-card";

const EditQuiz = ({ params }: { params: { id: string } }) => {
  return (
    <main className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Quiz Name (3 questions)</p>
        <Share />
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <NewQuestionCard />
      </div>
    </main>
  );
};
export default EditQuiz;
