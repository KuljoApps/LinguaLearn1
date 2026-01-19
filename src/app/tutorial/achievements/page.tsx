import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Trash2, Trophy, Sparkles, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeAchievementsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Trophy className="h-8 w-8" />
                        <CardTitle className="text-3xl">Osiągnięcia</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto p-6">
                     <TooltipProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-tutorial-id="achievements-grid">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="flex flex-col items-center justify-center p-4 text-center transition-all bg-muted/50 opacity-60">
                                        <div className="relative">
                                            <Sparkles className="h-12 w-12 mb-2 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-semibold">Nowicjusz</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Odpowiedz poprawnie na 50 pytań.</p>
                                        <div className="w-full mt-2">
                                            <Progress value={25} className="h-2" />
                                            <p className="text-xs font-mono mt-1">25 / 50</p>
                                        </div>
                                    </Card>
                                </TooltipTrigger>
                            </Tooltip>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="flex flex-col items-center justify-center p-4 text-center transition-all">
                                        <div className="relative">
                                            <Star className="h-12 w-12 mb-2 text-amber" />
                                            <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-success bg-background rounded-full" />
                                        </div>
                                        <h3 className="font-semibold">Uczeń</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Odpowiedz poprawnie na 250 pytań.</p>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Odblokowano: 24 lip 2024</p>
                                </TooltipContent>
                            </Tooltip>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="flex flex-col items-center justify-center p-4 text-center transition-all bg-muted/50 opacity-60">
                                        <div className="relative">
                                            <Crown className="h-12 w-12 mb-2 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-semibold">Mistrz</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Odpowiedz poprawnie na 1000 pytań.</p>
                                        <div className="w-full mt-2">
                                            <Progress value={27} className="h-2" />
                                            <p className="text-xs font-mono mt-1">273 / 1000</p>
                                        </div>
                                    </Card>
                                </TooltipTrigger>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                     <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" disabled>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do strony głównej
                        </Button>
                        <Button variant="destructive" disabled>
                            <Trash2 className="mr-2 h-4 w-4" /> Resetuj osiągnięcia
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
