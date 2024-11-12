// src/pages/Statistics.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { ColumnChart } from "@opd/g2plot-react";
import "../index.css";

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { candidates } = useAppSelector((state) => state.candidates);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.isAdmin) {
      navigate("/votes");
    }
  }, [user]);

  const config = {
    xField: "name",
    yField: "votes",
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
  };
  return (
    <div className="statistics">
      <h1>Statistics</h1>

      <ColumnChart
        {...config}
        height={400}
        data={candidates!.map((c) => ({ name: c.name, votes: c.votes }))}
      />
    </div>
  );
}
