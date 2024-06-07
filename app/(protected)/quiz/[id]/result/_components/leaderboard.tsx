import { auth } from "@/app/auth";
import { Separator } from "@/components/ui/separator";
import { getLeaderboard } from "@/lib/scoring-service";

type LeaderboardProps = {
  quizId: string;
};

const Leaderboard = async ({ quizId }: LeaderboardProps) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const leaderboard = await getLeaderboard(quizId, session.accessToken);
  if ("error" in leaderboard) {
    throw new Error(leaderboard.error);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl text-center">Leaderboard</h2>
      <Separator className="my-2" />
      <div className="space-y-3">
        <div className="py-3 font-medium px-6 grid grid-cols-3 justify-between items-center">
          <span>Rank</span>
          <span>Name</span>
          <span className="text-right">Score</span>
        </div>
        {leaderboard.leaderboard ? (
          leaderboard.leaderboard.map((user, index) => (
            <div
              key={index}
              className="bg-secondary shadow-md rounded-md py-3 px-6 grid grid-cols-3 justify-between items-center"
            >
              <span>{index + 1}</span>
              <span>{user.username}</span>
              <span className="text-right">{user.score}</span>
            </div>
          ))
        ) : (
          <div className="text-center !my-12">
            No one is here yet, be the first one in the leaderboard!
          </div>
        )}
      </div>
    </div>
  );
};
export default Leaderboard;
