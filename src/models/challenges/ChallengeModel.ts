import { UserModel } from "../users/UserModel";

export interface ChallengeModel {
  user: UserModel;
  status?: string;
  gameId: string;
  opponentId?: string;
  winnerId?: string;
}
