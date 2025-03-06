import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DepartementData {
  id: number;
  name: string;
  nombre_etudiant: number;
}

interface Props {
  data: DepartementData[];

}

const EtudiantsParDepartement: React.FC<Props> = ({ data }) => {
  return (
    <Card className="w-full lg:w-[65%] bg-white p-6 rounded-xl shadow-lg mt-5 lg:mt-0">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Nombre d'étudiants par département</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => `${value} étudiants`} />
            <Bar dataKey="nombre_etudiant" fill="#4f46e5" cursor={'transparent'} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EtudiantsParDepartement;
