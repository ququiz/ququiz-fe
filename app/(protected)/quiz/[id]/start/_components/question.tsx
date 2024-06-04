import { Button } from "@/components/ui/button";

type QuestionProps = {
  question: any;
  handleNextQuestion: (answer: any) => void;
  index: number;
};

const Question = ({ question, handleNextQuestion, index }: QuestionProps) => {
  return (
    <main className="fixed w-full h-full top-14 p-6 right-0">
      <div className="flex items-center justify-between">
        <div className="bg-secondary shadow-md py-2 px-4 rounded-md font-semibold">
          12345678
        </div>
        <span className="font-semibold bg-secondary shadow-md py-2 px-4">
          {index + 1}/15
        </span>
      </div>
      <div className="fixed top-1/2 w-full left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto items-center justify-between">
        <h1 className="bg-secondary shadow-md rounded-md py-4 px-6 w-full text-lg">
          Question
        </h1>
        <div className="flex flex-col mx-8 space-y-4 mt-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Button
                key={i}
                className="shadow-md"
                variant={"secondary"}
                onClick={() => handleNextQuestion({})}
              >
                Option {i + 1}
              </Button>
            ))}
        </div>
      </div>
    </main>
  );
};
export default Question;
