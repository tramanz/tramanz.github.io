import { Button } from "@mui/material";
import { FC } from "react";
import { useGenerateSchedule } from "../server/api/generateSchedule";

export const Admin: FC = () => {
  const { callback, loading } = useGenerateSchedule();
  return (
    <Button loading={loading} onClick={() => callback({ players: [] })}>
      Generate Schedule
    </Button>
  );
};
