import { cn } from "@/lib/utils";
import { Check, Edit, GripVertical, Trash2, X } from "lucide-react";

type QuestionCardProps = {
  isCorrect: boolean;
};

const QuestionCard = ({ isCorrect = true }: QuestionCardProps) => {
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
          <span>1) Question</span>
        </div>
      </div>
      <div className="text-sm space-y-2">
        <p>Answer choices</p>
        <div className="space-y-4 ml-3">
          <div className="flex items-center space-x-2">
            <Check />
            <span>Answer choice 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <X />
            <span>Answer choice 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <X />
            <span>Answer choice 3</span>
          </div>
          <div className="flex items-center space-x-2">
            <X />
            <span>Answer choice 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
