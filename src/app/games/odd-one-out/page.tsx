"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language } from '@/lib/storage';
import { allOddOneOutQuestions, type OddOneOutSet } from '@/lib/games/odd-one-out';

const uiTexts = {
    title: { en: 'Odd One Out', fr: 'L\'intrus', de: 'Der Ausreißer', it: 'L\'intruso', es: 'El Intruso' },
    description: { 
        en: 'Find the word that doesn\'t belong to the group.',
        fr: 'Trouvez le mot qui n\'appartient pas au groupe.',
        de: 'Finde das Wort, das nicht zur Gruppe gehört.',
        it: 'Trova la parola che non appartiene al gruppo.',
        es: 'Encuentra la palabra que no pertenece al grupo.'
    },
    category: { en: 'Category', fr: 'Catégorie', de: 'Kategorie', it: 'Categoria', es: 'Categoría' },
    correct: { en: 'Correct!', fr: 'Correct !', de: 'Richtig!', it: 'Corretto!', es: '¡Correcto!' },
    incorrect: { en: 'Not quite! The correct one was \'{correctAnswer}\'.', fr: 'Pas tout à fait ! Le bon était \'{correctAnswer}\'.', de: 'Nicht ganz! Das Richtige war \'{correctAnswer}\'.', it: 'Non proprio! Quello giusto era \'{correctAnswer}\'.', es: '¡No del todo! El correcto era \'{correctAnswer}\'.' },
    next: { en: 'Next', fr: 'Suivant', de: 'Nächste', it: 'Prossimo', es: 'Siguiente' },
    backToGames: { en: 'Back to Game Center', fr: 'Retour au Centre de jeux', de: 'Zurück zur Spielzentrale', it: 'Torna al Centro Giochi', es: 'Volver al Centro de Juegos' }
};

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const OddOneOutPage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [currentSet, setCurrentSet] = useState<OddOneOutSet | null>(null);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selected, setSelected] = useState<string|null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean|null>(null);

    const getUIText = (key: keyof typeof uiTexts, replacements: Record<string, string> = {}) => {
        let text = uiTexts[key][language] || uiTexts[key]['en'];
        for (const placeholder in replacements) {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return text;
    };
    
    const setupNewGame = useCallback((lang: Language) => {
        const wordSets = allOddOneOutQuestions[lang];
        const newSet = wordSets[Math.floor(Math.random() * wordSets.length)];
        setCurrentSet(newSet);
        setShuffledWords(shuffle(newSet.words));
        setSelected(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        setupNewGame(currentLang);
        
        window.addEventListener('language-changed', () => {
            const newLang = getLanguage();
            setLanguage(newLang);
            setupNewGame(newLang);
        });
    }, [setupNewGame]);
    
    const handleSelect = (word: string) => {
        if (selected || !currentSet) return;
        setSelected(word);
        setIsCorrect(word === currentSet.correct);
    };

  if (!currentSet) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center p-6">
          <div className="flex items-center justify-center gap-4">
            <EyeOff className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
          </div>
          <p className="text-muted-foreground pt-2">{getUIText('description')}</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            <p className="text-center text-lg">{getUIText('category')}: <span className="font-bold">{currentSet.category[language]}</span></p>

            <div className="grid grid-cols-2 gap-4">
                {shuffledWords.map(word => (
                    <Button 
                        key={word}
                        variant="outline"
                        className={cn("h-24 text-2xl", 
                            selected === word && isCorrect && 'bg-success text-success-foreground',
                            selected === word && !isCorrect && 'bg-destructive text-destructive-foreground',
                            selected && selected !== word && word !== currentSet.correct && 'opacity-50'
                        )}
                        onClick={() => handleSelect(word)}
                        disabled={!!selected}
                    >
                        {word}
                    </Button>
                ))}
            </div>

             <div className="text-center font-semibold h-6">
                {isCorrect === true && <p className="text-success">{getUIText('correct')}</p>}
                {isCorrect === false && <p className="text-destructive">{getUIText('incorrect', { correctAnswer: currentSet.correct })}</p>}
            </div>

             <div className="flex justify-center">
                 <Button onClick={() => setupNewGame(language)} variant="secondary">{getUIText('next')}</Button>
            </div>
            
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
          <Link href="/games" passHref>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>{getUIText('backToGames')}</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default OddOneOutPage;
