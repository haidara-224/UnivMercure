import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenIcon,

  Building2Icon,

  CalendarIcon,
} from "lucide-react";

const Nav = [
  {
    id: 1,
    title: "Par Classe",
    icon: Building2Icon,
    description: "Créer un examen pour toute une classe",
  },
  {
    id: 2,
    title: "Étudiants Spécifiques",
    icon: BookOpenIcon,
    description: "Sélectionner des étudiants individuellement",
  },
];

function NavTabsExamens({
  childrenByTab,
}: {
  childrenByTab: Record<string, React.ReactNode>;
}) {
  return (
    <Tabs defaultValue="nav-1">
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
        {Nav.map((nv) => (
          <TabsTrigger
            key={nv.id}
            value={`nav-${nv.id}`}
            className="relative flex-col items-center px-4 py-2 text-sm font-medium text-gray-700 data-[state=active]:text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-primary"
          >
            <nv.icon className="mb-1 opacity-70" size={20} />
            {nv.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {Nav.map((nv) => (
        <TabsContent key={nv.id} value={`nav-${nv.id}`} className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            {nv.description}
          </div>
          {childrenByTab[`nav-${nv.id}`]}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { NavTabsExamens };
