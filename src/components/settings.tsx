
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Trash2, ChevronDown, GraduationCap, Crown, Star, Settings as SettingsIcon } from "lucide-react";
import { getSettings, saveSettings, clearSettings, type Settings as AppSettings, getLanguage, type Language, saveTutorialState } from "@/lib/storage";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProPromotionDialog from "@/components/ProPromotionDialog";
import RateAppDialog from "@/components/RateAppDialog";
import { cn } from "@/lib/utils";

const uiTexts = {
    title: { en: 'Settings', fr: 'Réglages', de: 'Einstellungen', it: 'Impostazioni', es: 'Ajustes' },
    sounds: { en: 'Sounds', fr: 'Sons', de: 'Töne', it: 'Suoni', es: 'Sonidos' },
    volume: { en: 'Volume', fr: 'Volume', de: 'Lautstärke', it: 'Volume', es: 'Volumen' },
    vibrations: { en: 'Vibrations', fr: 'Vibrations', de: 'Vibrationen', it: 'Vibrazioni', es: 'Vibraciones' },
    eyeCare: { en: 'Eye Care', fr: 'Protection des yeux', de: 'Augenpflege', it: 'Protezione occhi', es: 'Cuidado de Ojos' },
    about: { en: 'About the app', fr: 'À propos de l\'application', de: 'Über die App', it: 'Informazioni sull\'app', es: 'Acerca de la aplicación' },
    aboutDesc: { en: 'This application builds your language skills with quick fun quizzes.', fr: 'Cette application développe vos compétences linguistiques avec des quiz amusants et rapides.', de: 'Diese Anwendung baut Ihre Sprachkenntnisse mit schnellen, unterhaltsamen Quizfragen aus.', it: 'Questa applicazione sviluppa le tue competenze linguistiche con quiz rapidi e divertenti.', es: 'Esta aplicación desarrolla tus habilidades lingüísticas con cuestionarios rápidos y divertidos.' },
    more: { en: 'More', fr: 'Plus', de: 'Mehr', it: 'Altro', es: 'Más' },
    backToHome: { en: 'Back to Home', fr: 'Retour à l\'accueil', de: 'Zurück zur Startseite', it: 'Torna alla Home', es: 'Volver al Inicio' },
    resetSettings: { en: 'Reset Settings', fr: 'Réinitialiser les réglages', de: 'Einstellungen zurücksetzen', it: 'Ripristina Impostazioni', es: 'Restablecer Ajustes' },
    alertTitle: { en: 'Are you sure?', fr: 'Êtes-vous sûr ?', de: 'Bist du sicher?', it: 'Sei sicuro?', es: '¿Estás seguro?' },
    alertDescription: { en: 'This will reset all settings to their default values. This action cannot be undone.', fr: 'Cela réinitialisera tous les réglages à leurs valeurs par défaut. Cette action ne peut pas être annulée.', de: 'Dadurch werden alle Einstellungen auf ihre Standardwerte zurückgesetzt. Diese Aktion kann nicht rückgängig gemacht werden.', it: 'Questo ripristinerà tutte le impostazioni ai loro valori predefiniti. Questa azione non può essere annullata.', es: 'Esto restablecerá todos los ajustes a sus valores predeterminados. Esta acción no se puede deshacer.' },
    cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar' },
    reset: { en: 'Reset', fr: 'Réinitialiser', de: 'Zurücksetzen', it: 'Ripristina', es: 'Restablecer' },
};

const DEV_TOOLS_COLLAPSIBLE_STATE_KEY = 'linguaLearnDevToolsOpen';

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({ soundsEnabled: true, vibrationsEnabled: true, volume: 50, eyeCareLevel: 0 });
    const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);
    const [language, setLanguageState] = useState<Language>('en');
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const [showPromoDialog, setShowPromoDialog] = useState(false);
    const [showRateDialog, setShowRateDialog] = useState(false);
    const router = useRouter();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setSettings(getSettings());
        
        const savedDevToolsState = localStorage.getItem(DEV_TOOLS_COLLAPSIBLE_STATE_KEY);
        if (savedDevToolsState === 'true') {
            setIsDevToolsOpen(true);
        }

        const handleLanguageChange = () => {
            setLanguageState(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);

        const timer = setTimeout(() => setAnimate(true), 500);

        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
            clearTimeout(timer);
        };
    }, []);

    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    const handleSettingChange = (key: keyof AppSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveSettings(newSettings);

        if (key === 'vibrationsEnabled' && value === true) {
            if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
                window.navigator.vibrate(100);
            }
        }
    }

    const handleResetSettings = () => {
        clearSettings();
        setSettings(getSettings());
        setIsResetAlertOpen(false);
    };

    const handleRunTutorial = () => {
        saveTutorialState({ isActive: true, stage: 'initial', step: 0 });
        router.push('/');
    };
    
    const handleDevToolsOpenChange = (open: boolean) => {
        setIsDevToolsOpen(open);
        localStorage.setItem(DEV_TOOLS_COLLAPSIBLE_STATE_KEY, JSON.stringify(open));
    };
    
    return (
        <div className="w-full max-w-md">
            <ProPromotionDialog open={showPromoDialog} onOpenChange={setShowPromoDialog} />
            <RateAppDialog open={showRateDialog} onOpenChange={setShowRateDialog} />
            <Card className="shadow-2xl overflow-hidden">
                 <CardHeader className="relative flex items-center justify-center p-6">
                    {/* Placeholder to maintain height and width for centering */}
                    <div className="flex items-center gap-2 invisible">
                        <SettingsIcon className="h-8 w-8 shrink-0" />
                        <CardTitle className="whitespace-nowrap text-3xl">
                            {getUIText('title')}
                        </CardTitle>
                    </div>
                    
                    <div className={cn(
                        "absolute",
                        animate ? "animate-icon-fly-out" : ""
                    )}>
                        <SettingsIcon className="h-8 w-8 shrink-0 text-foreground" />
                    </div>
                    
                    <CardTitle className={cn(
                        "absolute whitespace-nowrap text-3xl",
                        animate ? "animate-text-slide-in" : "opacity-0"
                    )}>
                        {getUIText('title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div data-tutorial-id="settings-switches" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sounds-switch" className="text-lg">{getUIText('sounds')}</Label>
                            <Switch
                                id="sounds-switch"
                                checked={settings.soundsEnabled}
                                onCheckedChange={(checked) => handleSettingChange('soundsEnabled', !!checked)}
                            />
                        </div>
                        <Separator/>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider" className="text-lg">{getUIText('volume')}</Label>
                            <Slider
                                id="volume-slider"
                                min={0}
                                max={100}
                                step={1}
                                value={[settings.volume]}
                                onValueChange={(value) => handleSettingChange('volume', value[0])}
                                disabled={!settings.soundsEnabled}
                            />
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="vibrations-switch" className="text-lg">{getUIText('vibrations')}</Label>
                            <Switch
                                id="vibrations-switch"
                                checked={settings.vibrationsEnabled}
                                onCheckedChange={(checked) => handleSettingChange('vibrationsEnabled', !!checked)}
                            />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2" data-tutorial-id="settings-eyecare">
                        <Label htmlFor="eyecare-slider" className="text-lg">{getUIText('eyeCare')}</Label>
                        <Slider
                            id="eyecare-slider"
                            min={0}
                            max={100}
                            step={1}
                            value={[settings.eyeCareLevel]}
                            onValueChange={(value) => handleSettingChange('eyeCareLevel', value[0])}
                        />
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{getUIText('about')}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground pr-4">
                                {getUIText('aboutDesc')}
                            </p>
                            <Link href="/settings/about" passHref>
                                <Button variant="outline" size="sm">{getUIText('more')}</Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col justify-center p-6 pt-2">
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToHome')}
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsResetAlertOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> {getUIText('resetSettings')}
                        </Button>
                    </div>

                    <div className="w-full pt-4 mt-4 border-t border-dashed">
                        <Collapsible open={isDevToolsOpen} onOpenChange={handleDevToolsOpenChange} className="w-full">
                            <div data-tutorial-id="dev-tools-trigger" className="flex items-center justify-center -mb-2">
                                <Separator className="flex-grow" />
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                                        <span className="text-sm italic text-muted-foreground">Developer Tools</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDevToolsOpen ? 'rotate-180' : ''}`} />
                                    </Button>
                                </CollapsibleTrigger>
                                <Separator className="flex-grow" />
                            </div>
                            <CollapsibleContent className="pt-4">
                              <div className="flex flex-col gap-2">
                                <Button variant="secondary" size="sm" onClick={handleRunTutorial}>
                                  <GraduationCap className="mr-2 h-4 w-4" />
                                  Uruchom samouczek
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => setShowPromoDialog(true)}>
                                  <Crown className="mr-2 h-4 w-4" />
                                  Pokaż okno PRO
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => setShowRateDialog(true)}>
                                  <Star className="mr-2 h-4 w-4" />
                                  Pokaż okno oceny
                                </Button>
                              </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isResetAlertOpen} onOpenChange={setIsResetAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{getUIText('alertTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                           {getUIText('alertDescription')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{getUIText('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetSettings} className="bg-destructive hover:bg-destructive/90">
                            {getUIText('reset')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
