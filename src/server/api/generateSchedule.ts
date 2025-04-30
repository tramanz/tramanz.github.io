import { APIResponse, useAPI } from "./api";

export const useGenerateSchedule = (): APIResponse<
  { players: string[] },
  { tournamentId: string }
> => {
  const api = useAPI<{ players: string[] }, { tournamentId: string }>(
    "generate-schedule"
  );
  return api;
};
