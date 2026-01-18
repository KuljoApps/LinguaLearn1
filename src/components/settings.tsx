"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getSettings, saveSettings, clearSettings, type Settings as AppSettings, getLanguage, type Language } from "@/lib/storage";
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


export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>(getSettings);
    const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);
    const [language, setLanguageState] = useState<Language>('en');

     useEffect(() => {
        const handleLanguageChange = () => {
            setLanguageState(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
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
                // A short vibration to confirm the setting is on.
                window.navigator.vibrate(100);
            }
        }
    }

    const handleResetSettings = () => {
        clearSettings();
        setSettings(getSettings());
        setIsResetAlertOpen(false);
    };

    return (
        <>
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="settings-card">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">{getUIText('title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4" data-tutorial-id="settings-switches">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sounds-switch" className="text-lg">{getUIText('sounds')}</Label>
                            <Switch
                                id="sounds-switch"
                                checked={settings.soundsEnabled}
                                onCheckedChange={(checked) => handleSettingChange('soundsEnabled', checked)}
                                suppressHydrationWarning
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider">{getUIText('volume')}</Label>
                            <Slider
                                id="volume-slider"
                                min={0}
                                max={100}
                                step={1}
                                value={[settings.volume]}
                                onValueChange={(value) => handleSettingChange('volume', value[0])}
                                disabled={!settings.soundsEnabled}
                                suppressHydrationWarning
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="vibrations-switch" className="text-lg">{getUIText('vibrations')}</Label>
                            <Switch
                                id="vibrations-switch"
                                checked={settings.vibrationsEnabled}
                                onCheckedChange={(checked) => handleSettingChange('vibrationsEnabled', checked)}
                                suppressHydrationWarning
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
                            suppressHydrationWarning
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
                                <Button variant="outline" size="sm" data-tutorial-id="settings-about">{getUIText('more')}</Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToHome')}
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsResetAlertOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> {getUIText('resetSettings')}
                        </Button>
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
        </>
    );
}
