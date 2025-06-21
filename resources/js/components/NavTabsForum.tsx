import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Nav = [
  { id: 1, title: "Sujects" },
  { id: 2, title: "Utilisateurs" },
  { id: 3, title: "rapports" },
  { id: 4, title: "Paramètres" },
];

function NavTabsForum({
  childrenByTab,
}: {
  childrenByTab: Record<string, React.ReactNode>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("nav-1");

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="border-b border-gray-200 m-6">
        <div className="flex flex-col space-y-4">
          {/* Barre de recherche */}
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
              placeholder={`Rechercher ${Nav.find(n => `nav-${n.id}` === activeTab)?.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">🔍</span>
            </div>
          </div>

          {/* Onglets */}
          <TabsList className="h-auto rounded-none bg-transparent p-0 -mb-px flex space-x-8">
            {Nav.map((nv) => (
              <TabsTrigger
                key={nv.id}
                value={`nav-${nv.id}`}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize relative data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`}
              >
                {nv.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {Nav.map((nv) => (
        <TabsContent key={nv.id} value={`nav-${nv.id}`} className="p-6 space-y-4">
          {childrenByTab[`nav-${nv.id}`]}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { NavTabsForum };
