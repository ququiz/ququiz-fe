import { Button } from "@/components/ui/button";

type LeaderboardProps = {
  handleSkipLeaderboard: () => void;
};

const Leaderboard = ({ handleSkipLeaderboard }: LeaderboardProps) => {
  return (
    <div>
      Leaderboard<Button onClick={handleSkipLeaderboard}>Next</Button>
    </div>
  );
};
export default Leaderboard;
