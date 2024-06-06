import { Separator } from "@/components/ui/separator";

type LeaderboardProps = {};

const Leaderboard = ({}: LeaderboardProps) => {
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
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-secondary shadow-md rounded-md py-3 px-6 grid grid-cols-3 justify-between items-center"
            >
              <span>{index + 1}</span>
              <span>John Doe</span>
              <span className="text-right">100</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Leaderboard;
