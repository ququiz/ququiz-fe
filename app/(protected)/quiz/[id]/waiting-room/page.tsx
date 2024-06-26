import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { getQuizDetail } from "@/lib/query-read-service";
import Link from "next/link";
import Timer from "../../../../../components/timer";
import StartButton from "./_components/start-button";

const WaitingRoom = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quizDetail = await getQuizDetail(params.id, session.accessToken);
  if ("error" in quizDetail) {
    throw new Error(quizDetail.error);
  }

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex text-center gap-y-5 flex-col items-center">
        <div>
          <h1 className="text-5xl mb-4 font-semibold">Waiting Room</h1>
          <h2 className="text-3xl font-semibold">{quizDetail.quiz.name}</h2>
          <p className="font-medium">By {quizDetail.quiz.creator_name}</p>
          <p>{quizDetail.quiz.participants?.length || "No"} participants</p>
          <Timer target={quizDetail.quiz.start_time} />
        </div>
        <StartButton session={session} quiz={quizDetail.quiz} />
      </div>
    </main>
  );
};
export default WaitingRoom;
