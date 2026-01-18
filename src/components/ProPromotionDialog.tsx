"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, Crown, BookOpen } from "lucide-react";

interface ProPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProPromotionDialog({ open, onOpenChange }: ProPromotionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Przejdź na LinguaLearn <span className="text-deep-purple">PRO</span>!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Więcej treści, więcej korzyści, jednorazowa opłata.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-deep-purple" />
            </div>
            <div>
              <h4 className="font-semibold">Wszystkie przyszłe języki</h4>
              <p className="text-sm text-muted-foreground">Uzyskaj dostęp do wszystkich nowych języków dodawanych do aplikacji.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="h-6 w-6 text-deep-purple" />
            </div>
            <div>
              <h4 className="font-semibold">Śledzenie postępów i codzienne wyzwania</h4>
              <p className="text-sm text-muted-foreground">Monitoruj swoje wyniki dzięki zaawansowanym statystykom i realizuj codzienne misje, aby zdobywać nagrody.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-primary/10 p-3 rounded-full">
              <Crown className="h-6 w-6 text-deep-purple" />
            </div>
            <div>
              <h4 className="font-semibold">Dożywotnia licencja</h4>
              <p className="text-sm text-muted-foreground">Jedna, niska opłata za dostęp do wszystkich funkcji <span className="font-semibold text-deep-purple">PRO</span> na zawsze.</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 mt-4">
            <Button type="button" size="lg" onClick={() => onOpenChange(false)}>
              Dowiedz się więcej
            </Button>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Może później
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
