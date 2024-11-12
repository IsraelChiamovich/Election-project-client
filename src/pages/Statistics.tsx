// src/pages/Statistics.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const { candidates } = useAppSelector((state) => state.candidates);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoggedIn: !!user?._id, isAdmin: !!user?.isAdmin });
    if (user?._id && !user?.isAdmin) navigate("/votes");
    if (!user?._id) navigate("/login");
  }, [user, navigate]);

  // הכנת הנתונים עבור הגרף
  const data = {
    labels: candidates?.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates?.map((c) => c.votes),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // הגדרות עיצוב הגרף
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Candidates Votes Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: "70px" }}>
      <h1>Statistics</h1>
      <Bar data={data} options={options} height={400} />
    </div>
  );
}
