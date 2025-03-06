import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Vous pouvez importer une icône ou un composant d’icône
import { Users2 } from "lucide-react";

interface ChartDonutProps {
  maleCount: number;
  femaleCount: number;
}

export function ChartDonut({ maleCount, femaleCount }: ChartDonutProps) {
  const total = maleCount + femaleCount;
  const malePercentage = total ? (maleCount / total) * 100 : 0;
  const femalePercentage = total ? (femaleCount / total) * 100 : 0;

  // Données pour le PieChart
  const data = [
    { name: "Garçons", value: maleCount },
    { name: "Filles", value: femaleCount },
  ];

  // Couleurs pour chaque tranche
  const COLORS = ["#3B82F6", "#FBBF24"]; // bleu et jaune par ex.

  return (
    <Card className="dark:bg-cyan-700/50 w-full lg:w-[30%]">
      <CardHeader>
        <CardTitle>Etudiants</CardTitle>
      </CardHeader>
      <CardContent className="relative flex justify-center">
        {/* Conteneur responsive pour éviter les débordements */}
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                // Pour faire un donut
                innerRadius="60%"
                outerRadius="90%"
                // Désactive le label automatique sur chaque portion
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} (${((value / total) * 100).toFixed(1)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center pointer-events-none">
          <Users2 className="h-8 w-8 text-gray-600" />
          <div className="text-sm font-semibold mt-1">
            {total} <span className="text-xs text-gray-500">total</span>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-around p-2 text-sm">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-blue-600">{maleCount}</span>
          <span className="text-gray-500 text-xs">
          Garçons ({malePercentage.toFixed(1)}%)
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-yellow-600">{femaleCount}</span>
          <span className="text-gray-500 text-xs">
            Filles ({femalePercentage.toFixed(1)}%)
          </span>
        </div>
      </div>
    </Card>
  );
}
