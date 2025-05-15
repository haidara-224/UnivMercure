import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heater, TurtleIcon } from "lucide-react";

const Nav = [
  {
    id: 1,
    title: "Tuto",

    icon: TurtleIcon,

  },
  {
    id: 2,
    title: "Progression",

    icon: Heater,

  },
];

function NavTabs({
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
              className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <nv.icon
                className="mb-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              {nv.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Nav.map((nv) => (
          <TabsContent key={nv.id} value={`nav-${nv.id}`} className="p-4">
            {childrenByTab[`nav-${nv.id}`]}
          </TabsContent>
        ))}
      </Tabs>
    );
  }


export { NavTabs };
