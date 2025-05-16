import { Head, usePage } from "@inertiajs/react";
import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { Tutos, BreadcrumbItem } from "@/types";
import { BookOpen, Calendar, FileText, Video, Building, User, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Cours",
    href: "/prof/cours",
  },
];

interface PageProps {
  [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
  tutos: Tutos;
}

export default function ShowTutoPage() {
  const { tutos } = usePage<CustomPageProps>().props;

  return (
    <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
      <Head title={tutos?.titre} />

      <div className="max-w-full  px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                <BookOpen className="w-7 h-7" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {tutos?.titre}
                </span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                  <User className="w-4 h-4" />
                  {tutos.professeur?.name || "Auteur inconnu"}
                </span>
                <span className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(tutos?.created_at), "PPP", { locale: fr })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tutos.departement && (
                <Badge className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                  <Building className="w-4 h-4" />
                  {tutos.departement.name}
                </Badge>
              )}
              {tutos.classes && (
                <Badge className="flex items-center gap-1 bg-secondary/10 text-secondary hover:bg-secondary/20">
                  {tutos.classes.niveau}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Video Section */}
        {tutos.video && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
              <Video className="w-5 h-5" />
              Vidéo explicative
            </h3>
            <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
              <video
                src={`/storage/${tutos.video}`}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Contenu du cours
          </h3>
          <div
            className="prose dark:prose-invert max-w-none bg-background rounded-xl p-6 border shadow-sm
                      prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:text-blue-700
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded prose-code:text-sm
                      prose-img:rounded-lg prose-img:border prose-img:shadow"
            dangerouslySetInnerHTML={{ __html: tutos.contenue }}
          />
        </div>

        {/* Files Section */}
        {tutos.fichier && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Fichiers attachés
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <a
                  href={`/storage/${tutos.fichier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-5 h-5" />
                  <span>Consulter le fichier</span>
                  <Download className="w-4 h-4 ml-auto" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppSidebarLayoutProf>
  );
}
