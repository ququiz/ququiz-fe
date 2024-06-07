/**
 * Domain Object
 */

type Leaderboard = {
  username: string;
  position: number;
  score: number;
};

/**
 * Request Object
 */

/**
 * Response Object
 */

type GetLeaderboardRes = {
  leaderboard: Leaderboard[] | null;
};
