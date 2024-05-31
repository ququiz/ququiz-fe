import QuizCard from "@/components/quiz-card";

const QuizHistory = () => {
  return (
    <main>
      <h2 className="font-medium text-3xl">Quiz History</h2>
      <div className="grid mt-8 grid-cols-4 gap-4">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <QuizCard href={`/quiz/${i}/result`} key={i} />
          ))}
      </div>
    </main>
  );
};
export default QuizHistory;
