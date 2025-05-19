import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {  ExamensByEtudiant } from "@/types";

interface SubjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examen: ExamensByEtudiant | null;
}

function SubjectModalEtudiant({ examen, onOpenChange, open }: SubjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader>
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            {examen?.titre}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-4">
          <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
            <div
              className="prose dark:prose-invert max-w-none bg-background rounded-xl p-6 border shadow-sm
                        prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:text-blue-700
                        prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded prose-code:text-sm
                        prose-img:rounded-lg prose-img:border prose-img:shadow"
              dangerouslySetInnerHTML={{ __html: examen?.sujet_explication || "" }}
            />
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { SubjectModalEtudiant };
