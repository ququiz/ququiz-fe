import QuizCard from "@/components/quiz-card";

const UserQuizzesList = () => {
  return (
    <main>
      <h2 className="font-medium text-3xl">Your Quizzes</h2>
      <div className="grid mt-8 grid-cols-4 gap-4">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <QuizCard href={`/dashboard/quiz/${i}/edit`} key={i} />
          ))}
      </div>
    </main>
  );
};
export default UserQuizzesList;
