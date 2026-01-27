"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, GraduationCap,
    LayoutGrid, Gamepad2, PencilLine, BookOpenText, Ear,
    Settings, BarChart, ShieldX, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { getLanguage, setLanguage, type Language } from '@/lib/storage';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/sounds';

const themes = [
    { name: 'Default Amber', gradient: 'from-yellow-500 via-amber-500 to-orange-500', shadow: '#ff8c00', mainColor: 'hsl(34 97% 61%)' },
    { name: 'Mystic Green', gradient: 'from-green-500 via-emerald-500 to-teal-500', shadow: '#10b981', mainColor: 'hsl(142 76% 36%)' },
    { name: 'Ocean Blue', gradient: 'from-blue-500 via-cyan-500 to-sky-500', shadow: '#06b6d4', mainColor: 'hsl(222.2 47.4% 11.2%)' },
    { name: 'Royal Purple', gradient: 'from-purple-500 via-violet-500 to-indigo-500', shadow: '#8b5cf6', mainColor: 'hsl(265 82% 59%)' },
    { name: 'Fiery Red', gradient: 'from-red-500 via-rose-500 to-pink-500', shadow: '#ec4899', mainColor: 'hsl(0 84.2% 60.2%)' },
    { name: 'Slate Gray', gradient: 'from-slate-600 via-gray-500 to-zinc-400', shadow: '#71717a', mainColor: 'hsl(240 3.8% 46.1%)' },
    { name: 'Sunny Yellow', gradient: 'from-yellow-300 via-amber-400 to-orange-400', shadow: '#facc15', mainColor: 'hsl(48 95% 54%)' },
    { name: 'Lime Green', gradient: 'from-lime-400 via-green-500 to-emerald-500', shadow: '#84cc16', mainColor: 'hsl(84 70% 52%)' },
    { name: 'Sky Blue', gradient: 'from-sky-400 via-cyan-300 to-blue-300', shadow: '#38bdf8', mainColor: 'hsl(204 92% 53%)' },
    { name: 'Deep Indigo', gradient: 'from-indigo-600 via-purple-600 to-violet-600', shadow: '#4f46e5', mainColor: 'hsl(244 80% 63%)' },
    { name: 'Hot Pink', gradient: 'from-fuchsia-500 via-pink-600 to-rose-500', shadow: '#d946ef', mainColor: 'hsl(289 83% 60%)' },
    { name: 'Charcoal', gradient: 'from-gray-800 via-zinc-700 to-stone-600', shadow: '#334155', mainColor: 'hsl(222 12% 25%)' },
    { name: 'Forest', gradient: 'from-green-700 via-teal-800 to-emerald-900', shadow: '#047857', mainColor: 'hsl(160 84% 39%)' },
    { name: 'Ocean', gradient: 'from-blue-700 via-cyan-800 to-sky-900', shadow: '#0369a1', mainColor: 'hsl(204 92% 53%)' },
    { name: 'Sunset', gradient: 'from-orange-500 via-red-600 to-rose-700', shadow: '#f97316', mainColor: 'hsl(24 95% 53%)' },
    { name: 'Galaxy', gradient: 'from-slate-900 via-purple-900 to-indigo-900', shadow: '#4338ca', mainColor: 'hsl(244 80% 63%)' },
];

const fakeUiTexts: Record<string, Record<Language, string>> = {
    welcome: {
        en: "This is a fake Home Screen. We are just testing something!",
        fr: "Ceci est un faux écran d'accueil. Nous testons juste quelque chose!",
        de: "Dies ist ein gefälschter Startbildschirm. Wir testen nur etwas!",
        it: "Questa è una finta schermata Home. Stiamo solo testando qualcosa!",
        es: "Esta es una pantalla de inicio falsa. ¡Solo estamos probando algo!"
    },
    quizzes: { en: 'Quizzes', fr: 'Quiz', de: 'Quizze', it: 'Quiz', es: 'Cuestionarios' },
    games: { en: 'Games', fr: 'Jeux', de: 'Spiele', it: 'Giochi', es: 'Juegos' },
    fill: { en: 'Fill', fr: 'Remplis', de: 'Fülle', it: 'Colma', es: 'Rellena' },
    gap: { en: 'Gap', fr: 'Vide', de: 'Lücke', it: 'Vuoto', es: 'Hueco' },
    reading: { en: 'Reading', fr: 'Lecture', de: 'Lesen', it: 'Lettura', es: 'Lectura' },
    listening: { en: 'Listening', fr: 'Écoute', de: 'Hören', it: 'Ascolto', es: 'Escucha' },
    learning: { en: 'Learning', fr: 'Apprentissage', de: 'Lernen', it: 'Apprendimento', es: 'Aprendizaje' },
};

export default function ButtonColorsPage() {
    const router = useRouter();
    const [language, setLanguageState] = useState<Language>('en');
    const [activeTheme, setActiveTheme] = useState(themes[0]);

    const handleThemeChange = (theme: typeof themes[0]) => {
        setActiveTheme(theme);
        playSound('correct');
    };

    const getUIText = (key: keyof typeof fakeUiTexts) => {
        return fakeUiTexts[key]?.[language] || fakeUiTexts[key]?.['en'];
    };

    const getFlag = (lang: Language) => {
        if (lang === 'fr') return '🇫🇷';
        if (lang === 'de') return '🇩🇪';
        if (lang === 'it') return '🇮🇹';
        if (lang === 'es') return '🇪🇸';
        return '🇬🇧';
    };

    const buttonBaseClasses = "flex-col gap-2 pointer-events-none font-normal";
    const squareButtonClasses = "w-full h-28";
    const themeClasses = `text-xl font-bold text-white bg-gradient-to-r ${activeTheme.gradient} transition-all bg-[length:300%_300%]`;
    const iconClasses = "text-white";
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
            <Card className="w-full max-w-4xl shadow-2xl">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                    <div className="scale-90 md:scale-100 origin-top border bg-background rounded-lg p-4">
                        <Card className="w-full max-w-md shadow-2xl text-center mx-auto pointer-events-none">
                             <CardHeader>
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <LinguaLearnLogo width="48" height="48" />
                                    <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">
                                        Lingua
                                        <span className="relative inline-block">
                                            Learn
                                            <span className="absolute -right-3 -bottom-4 text-xl font-semibold tracking-normal text-deep-purple">
                                                PRO
                                            </span>
                                        </span>
                                    </h1>
                                </div>
                                <p className="text-muted-foreground">
                                    {getUIText('welcome')}
                                </p>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-4 p-6 pt-0 pb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Button className={cn(buttonBaseClasses, squareButtonClasses, "rounded-xl", themeClasses)} style={{ boxShadow: `0 0 20px ${activeTheme.shadow}` }}>
                                        <LayoutGrid className={cn("h-12 w-12", iconClasses)} />
                                        <span>{getUIText('quizzes')}</span>
                                    </Button>
                                    <Button className={cn(buttonBaseClasses, squareButtonClasses, "rounded-xl", themeClasses, "!gap-0")} style={{ boxShadow: `0 0 20px ${activeTheme.shadow}` }}>
                                        <Gamepad2 className={cn("h-14 w-14", iconClasses)} />
                                        <span className="mt-1 mb-0.5">{getUIText('games')}</span>
                                    </Button>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button className={cn("h-12 w-full grid grid-cols-[1fr_auto_1fr] items-center rounded-xl", themeClasses)} style={{ boxShadow: `0 0 20px ${activeTheme.shadow}` }}>
                                        <div className="flex justify-end">
                                            <PencilLine className={cn("h-5 w-5 mr-2", iconClasses)} />
                                        </div>
                                        <span className={cn("col-start-2 flex items-center", iconClasses)}>
                                            {getUIText('fill')} ___ {getUIText('gap')}
                                        </span>
                                        <div />
                                    </Button>
                                    <Button className={cn("h-12 w-full grid grid-cols-[1fr_auto_1fr] items-center rounded-xl", themeClasses)} style={{ boxShadow: `0 0 20px ${activeTheme.shadow}` }}>
                                        <div className="flex justify-end">
                                            <BookOpenText className={cn("h-5 w-5 mr-2", iconClasses)} />
                                        </div>
                                        <span className={cn("col-start-2", iconClasses)}>{getUIText('reading')}</span>
                                        <div />
                                    </Button>
                                    <Button className={cn("h-12 w-full grid grid-cols-[1fr_auto_1fr] items-center rounded-xl", themeClasses)} style={{ boxShadow: `0 0 20px ${activeTheme.shadow}` }}>
                                        <div className="flex justify-end">
                                            <Ear className={cn("h-5 w-5 mr-2", iconClasses)} />
                                        </div>
                                        <span className={cn("col-start-2", iconClasses)}>{getUIText('listening')}</span>
                                        <div />
                                    </Button>
                                </div>
                            </CardContent>
                            <div className="px-6 pb-2">
                                <Separator className="mb-4"/>
                                <Button
                                    variant="outline"
                                    className={cn("w-full h-12 text-xl border-2 rounded-xl qr-pattern-bg")}
                                    style={{
                                        borderColor: activeTheme.mainColor,
                                        '--amber': activeTheme.mainColor, 
                                        color: activeTheme.mainColor,
                                        boxShadow: `0 0 20px ${activeTheme.shadow}`,
                                    } as React.CSSProperties}
                                >
                                    <GraduationCap className="mr-2 h-6 w-6" />
                                    <span className="font-bold">{getUIText('learning')}</span>
                                </Button>
                            </div>
                            <CardFooter className="flex justify-center gap-4 p-4 pointer-events-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" title="Change language">
                                            <span className="text-2xl">{getFlag(language)}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center">
                                        {(['en', 'fr', 'de', 'it', 'es'] as Language[]).map(lang => (
                                            <DropdownMenuItem key={lang} onClick={() => setLanguageState(lang)}>
                                                <span className="mr-2 text-lg">{getFlag(lang)}</span> {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><BarChart className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><ShieldX className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><Trophy className="h-4 w-4" /></Button>
                            </CardFooter>
                        </Card>
                    </div>
                    
                    <div className="p-4 w-full">
                        <h3 className="text-center font-semibold mb-4 text-xl">Color Palette</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 justify-items-center">
                            {themes.map(theme => (
                                <button
                                    key={theme.name}
                                    title={theme.name}
                                    onClick={() => handleThemeChange(theme)}
                                    className={cn(
                                        "w-12 h-12 rounded-full transition-all bg-gradient-to-r cursor-pointer",
                                        theme.gradient,
                                        activeTheme.name === theme.name && "ring-2 ring-ring ring-offset-2 ring-offset-background"
                                    )}
                                    aria-label={`Select theme ${theme.name}`}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
