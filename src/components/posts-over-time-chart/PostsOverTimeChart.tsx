"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type PostsOverTimeChartProps = { data: { name: string; posts: number }[] };

export function PostsOverTimeChart({ data }: PostsOverTimeChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="posts" stroke="#ed1864" strokeWidth={2} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
