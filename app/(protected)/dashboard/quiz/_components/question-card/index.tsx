import { Check, Edit, GripVertical, Trash2, X } from "lucide-react";
import ActionButtons from "./action-buttons";
import { auth } from "@/app/auth";

type QuestionCardProps = {
  allQuestions: Question[];
  quiz: Quiz;
  question: Question;
  index: number;
};

const QuestionCard = async ({
  quiz,
  allQuestions,
  question,
  index,
}: QuestionCardProps) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="bg-secondary space-y-4 rounded-md shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <GripVertical />
          <span>
            {index + 1}) {question.question}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">{question.weight} points</p>
          <div className="w-[1px] h-8 bg-black/50"></div>
          <ActionButtons
            quiz={quiz}
            question={question}
            allQuestions={allQuestions}
            session={session}
          />
        </div>
      </div>
      <div className="text-sm space-y-2">
        <p>Answer choices</p>
        <div className="space-y-4 ml-3">
          {question.choices?.map((choice) => (
            <div key={choice.id} className="flex items-center space-x-2">
              {choice.is_correct ? <Check /> : <X />}
              <span>{choice.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
