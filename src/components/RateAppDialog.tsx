"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RateAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RateAppDialog({ open, onOpenChange }: RateAppDialogProps) {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleRate = () => {
    // Logic to open app store link would go here.
    // For now, it just closes the dialog.
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="items-center text-center space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Podoba Ci się aplikacja?
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Twoja opinia jest dla nas bardzo ważna. Pomaga nam ulepszać aplikację i&nbsp;docierać do nowych użytkowników. Poświęć chwilę, aby nas ocenić.
          </DialogDescription>
        </DialogHeader>

        <div 
          className="flex justify-center gap-2 py-4"
          onMouseLeave={() => setHoveredStars(0)}
        >
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <Star
              key={starIndex}
              className={cn(
                "h-10 w-10 cursor-pointer transition-colors",
                hoveredStars >= starIndex 
                  ? "text-amber fill-amber" 
                  : "text-muted-foreground/30"
              )}
              onMouseEnter={() => setHoveredStars(starIndex)}
              onClick={handleRate}
            />
          ))}
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 pt-2">
            <Button type="button" size="lg" onClick={handleRate}>
              Oceń w&nbsp;sklepie
            </Button>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Może później
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
