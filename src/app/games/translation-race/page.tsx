'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getLanguage, type Language } from '@/lib/storage';
import { allTranslationRaceWords, type TranslationPair } from '@/lib/games/translation-race';

const GAME_DURATION = 60; // seconds

const uiTexts = {
    title: { en: 'Translation Race', fr: 'Course de Traduction', de: 'Übersetzungsrennen', it: 'Gara di Traduzione', es: 'Carrera de Traducción' },
    description: {
        en: 'Translate as many words as you can in 60 seconds.',
        fr: 'Traduisez autant de mots que possible en 60 secondes.',
        de: 'Übersetze so viele Wörter wie möglich in 60 Sekunden.',
        it: 'Traduci quante più parole possibili in 60 secondi.',
        es: 'Traduce tantas palabras como puedas en 60 segundos.'
    },
    startGame: { en: 'Start Game', fr: 'Démarrer le jeu', de: 'Spiel starten', it: 'Inizia il gioco', es: 'Empezar juego' },
    timesUp: { en: 'Time\'s up!', fr: 'Le temps est écoulé !', de: 'Die Zeit ist um!', it: 'Tempo scaduto!', es: '¡Se acabó el tiempo!' },
    finalScore: { en: 'Your final score is:', fr: 'Votre score final est :', de: 'Dein Endergebnis ist:', it: 'Il tuo punteggio finale è:', es: 'Tu puntuación final es:' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    timeLeft: { en: 'Time Left', fr: 'Temps restant', de: 'Verbleibende Zeit', it: 'Tempo rimasto', es: 'Tiempo restante' },
    score: { en: 'Score', fr: 'Score', de: 'Punkte', it: 'Punteggio', es: 'Puntuación' },
    translateWord: { en: 'Translate the word:', fr: 'Traduisez le mot :', de: 'Übersetze das Wort:', it: 'Traduci la parola:', es: 'Traduce la palabra:' },
    placeholder: { en: 'Type translation in Polish...', fr: 'Tapez la traduction en polonais...', de: 'Gib die polnische Übersetzung ein...', it: 'Scrivi la traduzione in polacco...', es: 'Escribe la traducción en polaco...' },
    back: { en: 'Back to Game Center', fr: 'Retour aux Jeux', de: 'Zurück zur Spielzentrale', it: 'Torna ai Giochi', es: 'Volver a Juegos' }
};

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const TranslationRacePage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [wordSet, setWordSet] = useState<TranslationPair[]>(allTranslationRaceWords.en);
    const [currentWord, setCurrentWord] = useState<TranslationPair | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

    const getNextWord = useCallback(() => {
        const availableWords = wordSet.filter(w => !usedWords.has(w.native));
        if (availableWords.length === 0) {
            // All words used, reset the used words set
            setUsedWords(new Set([wordSet[0].native]));
            return wordSet[0];
        }
        const nextWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        setUsedWords(prev => new Set(prev).add(nextWord.native));
        return nextWord;
    }, [wordSet, usedWords]);

    const setupNewGame = useCallback(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        const newWordSet = shuffle(allTranslationRaceWords[currentLang]);
        setWordSet(newWordSet);
        
        setUsedWords(new Set());
        const firstWord = newWordSet[0];
        setUsedWords(new Set([firstWord.native]));

        setCurrentWord(firstWord);
        setTimeLeft(GAME_DURATION);
        setScore(0);
        setIsActive(true);
        setInputValue('');
    }, []);

    useEffect(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        setWordSet(allTranslationRaceWords[currentLang]);
        
        const handleLanguageChange = () => {
            const newLang = getLanguage();
            setLanguage(newLang);
            setWordSet(allTranslationRaceWords[newLang]);
            setIsActive(false);
            setTimeLeft(GAME_DURATION);
        };
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearTimeout(timer);
    }, [isActive, timeLeft]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentWord) return;
        const value = e.target.value;
        setInputValue(value);
        if (value.toLowerCase().trim() === currentWord.pl.toLowerCase()) {
            setScore(score + 1);
            setInputValue('');
            setCurrentWord(getNextWord());
        }
    }

    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Timer className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                    </div>
                    <p className="text-muted-foreground pt-2">{getUIText('description')}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    {!isActive && timeLeft > 0 && <div className="text-center"><Button size="lg" onClick={setupNewGame}>{getUIText('startGame')}</Button></div>}
                    
                    {!isActive && timeLeft === 0 && (
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold">{getUIText('timesUp')}</h2>
                            <p className="text-xl">{getUIText('finalScore')} <span className="font-bold text-primary">{score}</span></p>
                            <Button onClick={setupNewGame}>{getUIText('playAgain')}</Button>
                        </div>
                    )}
                    
                    {isActive && currentWord && (
                         <div className="space-y-6 text-center">
                            <div className="flex justify-around text-2xl font-bold">
                                <div>{getUIText('timeLeft')}: <span className="text-primary">{timeLeft}s</span></div>
                                <div>{getUIText('score')}: <span className="text-primary">{score}</span></div>
                            </div>
                            <div>
                                <p className="text-muted-foreground">{getUIText('translateWord')}</p>
                                <p className="text-4xl font-bold tracking-wider">{currentWord.native}</p>
                            </div>
                            <div className="flex justify-center">
                                <Input 
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder={getUIText('placeholder')}
                                    className="text-lg text-center max-w-sm"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/games" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>{getUIText('back')}</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
};

export default TranslationRacePage;
