
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Trash2 } from "lucide-react";
import { getAchievements, clearStats, type AchievementStatus, getLanguage } from '@/lib/storage';
import { allAchievements, type Achievement } from '@/lib/achievements';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const englishMasteryIds = new Set(['mastery_en_pl', 'mastery_pl_en', 'mastery_irregular', 'mastery_phrasal', 'mastery_idioms']);
const frenchMasteryIds = new Set(['mastery_fr_pl', 'mastery_pl_fr', 'mastery_irregular_fr', 'mastery_phrasal_fr', 'mastery_idioms_fr']);
const germanMasteryIds = new Set(['mastery_de_pl', 'mastery_pl_de', 'mastery_irregular_de', 'mastery_phrasal_de', 'mastery_idioms_de']);
const italianMasteryIds = new Set(['mastery_it_pl', 'mastery_pl_it', 'mastery_irregular_it', 'mastery_phrasal_it', 'mastery_idioms_it']);
const spanishMasteryIds = new Set(['mastery_es_pl', 'mastery_pl_es', 'mastery_irregular_es', 'mastery_phrasal_es', 'mastery_idioms_es']);


export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<Record<string, AchievementStatus>>({});
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
    const [language, setLanguageState] = useState<'en' | 'fr' | 'de' | 'it' | 'es'>('en');

    useEffect(() => {
        const currentLang = getLanguage();
        setLanguageState(currentLang);
        setAchievements(getAchievements());
    }, []);

    const handleClearAchievements = () => {
        clearStats(); // This clears all stats, errors, achievements, and mastery data for the current language.
        setAchievements(getAchievements()); // Re-fetch to update the UI to an empty state.
        setIsClearAlertOpen(false);
    };

    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isItalian = language === 'it';
    const isSpanish = language === 'es';

    const displayedAchievements = allAchievements.filter(achievement => {
        if (achievement.id.startsWith('mastery_')) {
            if (isFrench) return frenchMasteryIds.has(achievement.id);
            if (isGerman) return germanMasteryIds.has(achievement.id);
            if (isItalian) return italianMasteryIds.has(achievement.id);
            if (isSpanish) return spanishMasteryIds.has(achievement.id);
            return englishMasteryIds.has(achievement.id);
        }
        return true; // It's a generic achievement, show it always.
    });

    const getUIText = (key: string) => {
        const texts = {
            title: { en: 'Achievements', fr: 'Succès', de: 'Erfolge', it: 'Obiettivi', es: 'Logros' },
            unlocked: { en: 'Unlocked', fr: 'Débloqué le', de: 'Freigeschaltet am', it: 'Sbloccato il', es: 'Desbloqueado el' },
            back: { en: 'Back to Home', fr: "Retour à l'accueil", de: 'Zurück zur Startseite', it: 'Torna alla Home', es: 'Volver al Inicio' },
            reset: { en: 'Reset Achievements', fr: 'Réinitialiser les succès', de: 'Erfolge zurücksetzen', it: 'Resetta Obiettivi', es: 'Reiniciar Logros' },
            alertTitle: { en: 'Are you sure?', fr: 'Êtes-vous sûr ?', de: 'Bist du sicher?', it: 'Sei sicuro?', es: '¿Estás seguro?' },
            alertDesc: { en: 'This will permanently delete all your achievements and related progress data (including stats and errors) for the current language. This action cannot be undone.', fr: 'Cela supprimera définitivement tous vos succès et les données de progression associées (y compris les statistiques et les erreurs) pour la langue actuelle. Cette action ne peut pas être annulée.', de: 'Dadurch werden alle deine Erfolge und zugehörigen Fortschrittsdaten (einschließlich Statistiken und Fehler) für die aktuelle Sprache dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.', it: 'Questo eliminerà permanentemente tutti i tuoi obiettivi e i dati di progresso correlati (incluse statistiche ed errori) per la lingua corrente. Questa azione non può essere annullata.', es: 'Esto eliminará permanentemente todos tus logros y datos de progreso relacionados (incluidas estadísticas y errores) para el idioma actual. Esta acción no se puede deshacer.' },
            cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar' },
            confirmReset: { en: 'Reset', fr: 'Réinitialiser', de: 'Zurücksetzen', it: 'Resetta', es: 'Reiniciar' },
        };
        return texts[key][language];
    }

    return (
        <>
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">{getUIText('title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto p-6">
                     <TooltipProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {displayedAchievements.map((achievement: Achievement) => {
                                const status = achievements[achievement.id] || { progress: 0, unlockedAt: null };
                                const isUnlocked = !!status.unlockedAt;
                                const progressPercentage = isUnlocked ? 100 : (status.progress / achievement.goal) * 100;
                                const Icon = achievement.icon;
                                
                                const achievementName = (isFrench && achievement.name_fr) ? achievement.name_fr : (isGerman && achievement.name_de) ? achievement.name_de : (isItalian && achievement.name_it) ? achievement.name_it : (isSpanish && achievement.name_es) ? achievement.name_es : achievement.name;
                                const achievementDescription = (isFrench && achievement.description_fr) ? achievement.description_fr : (isGerman && achievement.description_de) ? achievement.description_de : (isItalian && achievement.description_it) ? achievement.description_it : (isSpanish && achievement.description_es) ? achievement.description_es : achievement.description;


                                return (
                                    <Tooltip key={achievement.id}>
                                        <TooltipTrigger asChild>
                                            <Card className={cn(
                                                "flex flex-col items-center justify-center p-4 text-center transition-all",
                                                !isUnlocked && "bg-muted/50 opacity-60"
                                            )}>
                                                <div className="relative">
                                                    <Icon className={cn("h-12 w-12 mb-2", isUnlocked ? "text-amber" : "text-muted-foreground")} />
                                                     {isUnlocked && (
                                                        <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-success bg-background rounded-full" />
                                                    )}
                                                </div>
                                                <h3 className="font-semibold">{achievementName}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{achievementDescription}</p>
                                                
                                                {!isUnlocked && achievement.goal > 1 && (
                                                    <div className="w-full mt-2">
                                                        <Progress value={progressPercentage} className="h-2" />
                                                        <p className="text-xs font-mono mt-1">{Math.floor(status.progress)} / {achievement.goal}</p>
                                                    </div>
                                                )}
                                            </Card>
                                        </TooltipTrigger>
                                        {isUnlocked && status.unlockedAt && (
                                            <TooltipContent>
                                                <p>{getUIText('unlocked')}: {format(new Date(status.unlockedAt), "PPP")}</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </TooltipProvider>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                     <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('back')}
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            onClick={() => setIsClearAlertOpen(true)}
                            disabled={Object.keys(achievements).length === 0}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> {getUIText('reset')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{getUIText('alertTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                           {getUIText('alertDesc')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{getUIText('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAchievements} className="bg-destructive hover:bg-destructive/90">
                           {getUIText('confirmReset')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
