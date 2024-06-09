import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type LeaderboardProps = {
  handleSkipLeaderboard: () => void;
  leaderboard: Leaderboard[] | null;
};

const Leaderboard = ({
  leaderboard,
  handleSkipLeaderboard,
}: LeaderboardProps) => {
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
        {leaderboard ? (
          leaderboard.map((user, index) => (
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
          <div className="bg-secondary shadow-md rounded-md py-3 px-6 grid grid-cols-3 justify-between items-center">
            <span>Loading...</span>
          </div>
        )}
      </div>
      <Button
        className="ml-auto block mt-6 w-28"
        onClick={handleSkipLeaderboard}
      >
        Skip
      </Button>
    </div>
  );
};
export default Leaderboard;
