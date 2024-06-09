import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Edit, GripVertical, Trash2, X } from "lucide-react";

type QuestionCardProps = {
  isCorrect: boolean;
  ans: QuestionAndUserAnswer;
  index: number;
};

const QuestionCard = ({ isCorrect, ans, index }: QuestionCardProps) => {
  return (
    <div
      className={cn(
        "bg-secondary space-y-4 rounded-md shadow-md p-6",
        { "bg-green-200": isCorrect },
        { "bg-red-200": !isCorrect }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>
            {index + 1}) {ans.question}
          </span>
        </div>
      </div>
      <div className="text-sm space-y-2">
        <p>Answer choices</p>
        <div className="space-y-4 ml-3">
          {ans.choices.map((choice) => (
            <div key={choice.id} className="flex items-center space-x-2">
              {choice.is_correct ? <Check /> : <X />}
              <span>{choice.text}</span>
              {choice.id === ans.user_choice && !isCorrect && (
                <>
                  <ArrowLeft />
                  <span>Your answer</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
