"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Language } from '@/lib/storage';

const PHONETICS_WARNING_DISMISSED_KEY = 'phoneticsWarningDismissed_v1';

interface PhoneticsWarningDialogProps {
  lang: Language;
}

const uiTexts = {
  title: {
    pl: 'Sekcja w Budowie',
    en: 'Section Under Construction',
    de: 'Bereich im Aufbau',
    fr: 'Section en Construction',
    es: 'Sección en Construcción',
    it: 'Sezione in Costruzione',
  },
  description: {
    pl: 'Sekcja Fonetyki jest w trakcie rozbudowy. Odtwarzanie dźwięków jest tymczasowo niedostępne. Przepraszamy za utrudnienia!',
    en: 'The Phonetics section is under construction. Audio playback is temporarily unavailable. We apologize for the inconvenience!',
    de: 'Der Bereich Phonetik befindet sich im Aufbau. Die Audiowiedergabe ist vorübergehend nicht verfügbar. Wir entschuldigen uns für die Unannehmlichkeiten!',
    fr: 'La section Phonétique est en construction. La lecture audio est temporairement indisponible. Nous nous excusons pour la gêne occasionnée !',
    es: 'La sección de Fonética está en construcción. La reproducción de audio no está disponible temporalmente. ¡Pedimos disculpas por las molestias!',
    it: 'La sezione Fonetica è in costruzione. La riproduzione audio è temporaneamente non disponibile. Ci scusiamo per il disagio!',
  },
  checkbox: {
    pl: 'Nie pokazuj ponownie',
    en: 'Do not show again',
    de: 'Nicht wieder anzeigen',
    fr: 'Ne plus afficher',
    es: 'No volver a mostrar',
    it: 'Non mostrare più',
  },
  close: {
    pl: 'Rozumiem',
    en: 'I understand',
    de: 'Verstanden',
    fr: 'J\'ai compris',
    es: 'Entendido',
    it: 'Ho capito',
  },
};

const flagMap: Record<Language, string> = {
    en: '🇬🇧',
    de: '🇩🇪',
    fr: '🇫🇷',
    it: '🇮🇹',
    es: '🇪🇸',
};

export default function PhoneticsWarningDialog({ lang }: PhoneticsWarningDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [displayLang, setDisplayLang] = useState<'pl' | 'native'>('native');

  useEffect(() => {
    const dismissed = localStorage.getItem(PHONETICS_WARNING_DISMISSED_KEY);
    if (dismissed !== 'true') {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (doNotShowAgain) {
      localStorage.setItem(PHONETICS_WARNING_DISMISSED_KEY, 'true');
    }
    setIsOpen(false);
  };
  
  const nativeLang = lang;
  const t = (key: keyof typeof uiTexts) => {
      return uiTexts[key][displayLang === 'native' ? nativeLang : 'pl'];
  }
  
  const displayedFlag = displayLang === 'native' ? flagMap[nativeLang] : '🇵🇱';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <div className="flex justify-end -mt-2 -mr-2">
                <Button 
                    variant="ghost" 
                    className="h-auto p-1 rounded-md" 
                    onClick={() => setDisplayLang(prev => prev === 'native' ? 'pl' : 'native')}
                >
                    <div className="flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background">
                        <span className="text-xl">{displayedFlag}</span>
                    </div>
                </Button>
            </div>
            <DialogTitle className="text-2xl text-center sm:text-left max-w-[220px]">{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
        <DialogFooter className="sm:justify-between flex-col-reverse sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="do-not-show-again" checked={doNotShowAgain} onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)} />
                <Label htmlFor="do-not-show-again" className="text-sm font-normal text-muted-foreground">{t('checkbox')}</Label>
            </div>
          <Button onClick={handleClose}>{t('close')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
