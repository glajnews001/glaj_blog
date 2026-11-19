"use client";

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartPoint } from "@/models/page.model";

export function DashboardCharts({ data }: { data: ChartPoint[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="h-[300px] rounded bg-white/5 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#8884d8" />
            <Bar dataKey="readers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[300px] rounded bg-white/5 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="posts" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="readers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
