import { Button } from "@/components/ui/button";

type QuestionProps = {
  question: Question;
  handleNextQuestion: (answer: any) => void;
  index: number;
  quiz: Quiz;
  loading: boolean;
};

const Question = ({
  quiz,
  question,
  handleNextQuestion,
  index,
  loading,
}: QuestionProps) => {
  return (
    <main className="fixed w-full h-full top-14 p-6 right-0">
      <div className="flex items-center justify-between">
        <div className="bg-secondary shadow-md py-2 px-4 rounded-md font-semibold">
          {quiz.id}
        </div>
        <span className="font-semibold bg-secondary shadow-md py-2 px-4">
          {index + 1}/{quiz.questions.length}
        </span>
      </div>
      <div className="fixed top-1/2 w-full left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto items-center justify-between">
        <div className="bg-secondary flex justify-between shadow-md rounded-md py-4 space-x-4 px-6 w-full text-lg">
          <h1 className="flex-grow text-lg font-medium">{question.question}</h1>
          <p className="text-xs flex-shrink-0">{question.weight} points</p>
        </div>
        <div className="flex flex-col mx-8 space-y-4 mt-6">
          {question.choices!.map((c, i) => (
            <Button
              disabled={loading}
              key={c.id}
              className="shadow-md"
              variant={"secondary"}
              onClick={() => handleNextQuestion(c.id)}
            >
              {c.text}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Question;
