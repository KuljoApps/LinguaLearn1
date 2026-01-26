"use client";

import {
    BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX, MessageSquareQuote, Layers, Trophy, GraduationCap,
    LayoutGrid, Gamepad2, PencilLine, BookOpenText, Ear, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { getLanguage, setLanguage, shouldShowProPromo, shouldShowRateAppDialog, isTutorialCompleted, saveTutorialState, recordProPromoShown, recordRateAppDialogShown, getNewAchievementsCount } from '@/lib/storage';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import ProPromotionDialog from '@/components/ProPromotionDialog';
import RateAppDialog from '@/components/RateAppDialog';
import { cn } from '@/lib/utils';

export default function Home() {
    const [language, setCurrentLanguage] = useState<'en' | 'fr' | 'de' | 'it' | 'es'>('en');
    const [showPromo, setShowPromo] = useState(false);
    const [showRateDialog, setShowRateDialog] = useState(false);
    const [newAchievementsCount, setNewAchievementsCount] = useState(0);
    const [fillTheGapText, setFillTheGapText] = useState('the');
    const [showReadingDots, setShowReadingDots] = useState(false);
    const [showQuizzesSpin, setShowQuizzesSpin] = useState(false);
    const [showListeningPulse, setShowListeningPulse] = useState(false);
    const [showGamesTilt, setShowGamesTilt] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleStateUpdate = () => {
            setCurrentLanguage(getLanguage());
            updateAchievementCount();
        };

        const updateAchievementCount = () => {
            setNewAchievementsCount(getNewAchievementsCount());
        };
        
        handleStateUpdate();
        
        if (!isTutorialCompleted()) {
            saveTutorialState({ isActive: true, stage: 'initial', step: 0 });
        } else {
             if (shouldShowProPromo()) {
                setShowPromo(true);
                recordProPromoShown();
            } else if (shouldShowRateAppDialog()) {
                setShowRateDialog(true);
                recordRateAppDialogShown();
            }
        }

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('achievements-count-changed', updateAchievementCount);

        const timers: NodeJS.Timeout[] = [];
        let animationTimeoutId: NodeJS.Timeout;
        let currentIndex = 0;
        
        const animations = [
            () => {
                setShowQuizzesSpin(true);
                timers.push(setTimeout(() => setShowQuizzesSpin(false), 3000));
            },
            () => {
                setShowGamesTilt(true);
                timers.push(setTimeout(() => setShowGamesTilt(false), 3000));
            },
            () => {
                setFillTheGapText('___');
                timers.push(setTimeout(() => setFillTheGapText('the'), 3000));
            },
            () => {
                setShowReadingDots(true);
                timers.push(setTimeout(() => setShowReadingDots(false), 3000));
            },
            () => {
                setShowListeningPulse(true);
                timers.push(setTimeout(() => setShowListeningPulse(false), 3000));
            }
        ];

        const scheduleNextAnimation = () => {
            animations[currentIndex]();
            currentIndex = (currentIndex + 1) % animations.length;
            animationTimeoutId = setTimeout(scheduleNextAnimation, 3000 + 5000); // 3s anim + 5s pause
        };

        scheduleNextAnimation();

        return () => {
            clearTimeout(animationTimeoutId);
            timers.forEach(clearTimeout);
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('achievements-count-changed', updateAchievementCount);
        };
    }, [pathname]);

    const handleLanguageChange = (lang: 'en' | 'fr' | 'de' | 'it' | 'es') => {
        setLanguage(lang);
        setCurrentLanguage(lang);
    };

    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isItalian = language === 'it';
    const isSpanish = language === 'es';

    const getWelcomeMessage = () => {
        if (isFrench) return "Prêt à remettre en question tes choix de vie dans une autre langue? Allons-y!";
        if (isGerman) return "Bereit, deine Lebensentscheidungen in einer anderen Sprache zu hinterfragen? Los geht's!";
        if (isItalian) return "Pronto a mettere in discussione le tue scelte di vita in un'altra lingua? Andiamo!";
        if (isSpanish) return "¿Listo para cuestionar tus elecciones de vida en otro idioma? ¡Vamos!";
        return "Ready to question your life choices in another language? Let's go!";
    };
    
    const getLearningButtonText = () => {
        if (isFrench) return "Apprentissage";
        if (isGerman) return "Lernen";
        if (isItalian) return "Apprendimento";
        if (isSpanish) return "Aprendizaje";
        return "Learning";
    };

    const getFlag = () => {
        if (isFrench) return '🇫🇷';
        if (isGerman) return '🇩🇪';
        if (isItalian) return '🇮🇹';
        if (isSpanish) return '🇪🇸';
        return '🇬🇧';
    }
    
    const buttonBaseClasses = "flex-col gap-2";
    const squareButtonClasses = "w-full h-28";
    const rectButtonClasses = "h-12";
    const themeClasses = "text-xl font-bold text-white bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ff8c00] border border-yellow-400/50 bg-[length:300%_300%] animate-gradient-flow";
    const iconClasses = "text-white";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <ProPromotionDialog open={showPromo} onOpenChange={setShowPromo} />
            <RateAppDialog open={showRateDialog} onOpenChange={setShowRateDialog} />
            <Card className="w-full max-w-md shadow-2xl text-center">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <LinguaLearnLogo width="48" height="48" />
                        <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">
                            Lingua
                            <span className="relative inline-block">
                                Learn
                                <span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        {getWelcomeMessage()}
                    </p>
                </CardHeader>
                <CardContent data-tutorial-id="home-main-buttons" className="flex flex-col space-y-4 p-6 pt-0 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/quizzes" passHref>
                             <Button className={cn(buttonBaseClasses, squareButtonClasses, "rounded-xl", themeClasses, "font-normal")}>
                                <LayoutGrid className={cn("h-14 w-14", iconClasses, showQuizzesSpin && "animate-spin-once")} />
                                <span>Quizzes</span>
                            </Button>
                        </Link>
                         <Link href="/games" passHref>
                            <Button className={cn(buttonBaseClasses, squareButtonClasses, "rounded-xl", themeClasses, "font-normal")}>
                                <Gamepad2 className={cn("h-20 w-20", iconClasses, showGamesTilt && "animate-joystick-tilt")} />
                                <span>Games</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link href="/fill-the-gap" passHref>
                            <Button className={cn(rectButtonClasses, "w-full gap-2 items-end", "rounded-xl", themeClasses, "font-normal")}>
                                <PencilLine className={cn("mr-2 h-5 w-5", iconClasses)} />
                                <span className={cn("flex items-center", iconClasses)}>
                                    <span>Fill</span>
                                    <span className="relative inline-block h-6 w-12 text-center overflow-hidden">
                                        <span
                                            key={fillTheGapText}
                                            className="absolute inset-0 flex items-end justify-center animate-text-fall-down"
                                        >
                                            {fillTheGapText}
                                        </span>
                                    </span>
                                    <span>Gap</span>
                                </span>
                            </Button>
                        </Link>
                        <Link href="/reading" passHref>
                            <Button className={cn(rectButtonClasses, "w-full gap-2", "rounded-xl", themeClasses, "font-normal")}>
                                <BookOpenText className={cn("mr-2 h-5 w-5", iconClasses)} />
                                <span className={cn("flex items-baseline", iconClasses)}>
                                    <span>Reading</span>
                                    {showReadingDots && (
                                        <span className="flex pl-1">
                                            <span className="animate-dancing-dots" style={{ animationDelay: '0s' }}>.</span>
                                            <span className="animate-dancing-dots" style={{ animationDelay: '0.2s' }}>.</span>
                                            <span className="animate-dancing-dots" style={{ animationDelay: '0.4s' }}>.</span>
                                        </span>
                                    )}
                                </span>
                            </Button>
                        </Link>
                        <Link href="/listening" passHref>
                            <Button className={cn(rectButtonClasses, "w-full gap-2", "rounded-xl", themeClasses, "font-normal")}>
                                <Ear className={cn("mr-2 h-5 w-5", iconClasses, showListeningPulse && "animate-pulse-strong")} />
                                <span className={iconClasses}>Listening</span>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
                <div data-tutorial-id="learning-button" className="px-6 pb-2">
                    <Separator className="mb-2"/>
                    <Link href={isFrench ? "/learning/fr" : isGerman ? "/learning/de" : isItalian ? "/learning/it" : isSpanish ? "/learning/es" : "/learning/en"} passHref>
                        <Button variant="outline" className="w-full h-12 mt-2 border-2 border-primary">
                            <GraduationCap className="mr-2 h-5 w-5 text-deep-purple" />
                            {getLearningButtonText()}
                        </Button>
                    </Link>
                </div>
                <CardFooter data-tutorial-id="toolbar" className="flex justify-center gap-4 p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button data-tutorial-id="language-switcher" variant="outline" size="icon" title="Change language">
                                <span className="text-2xl">{getFlag()}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                                <span className="mr-2 text-lg">🇬🇧</span> English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                                <span className="mr-2 text-lg">🇫🇷</span> Français
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                                <span className="mr-2 text-lg">🇩🇪</span> Deutsch
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('it')}>
                                <span className="mr-2 text-lg">🇮🇹</span> Italiano
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
                                <span className="mr-2 text-lg">🇪🇸</span> Español
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/settings" passHref>
                        <Button variant="outline" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/stats" passHref>
                        <Button variant="outline" size="icon">
                            <BarChart className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/errors" passHref>
                        <Button variant="outline" size="icon">
                            <ShieldX className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/achievements" passHref>
                        <Button variant="outline" size="icon" className="relative">
                            <Trophy className="h-5 w-5" />
                            {newAchievementsCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                                    {newAchievementsCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
    