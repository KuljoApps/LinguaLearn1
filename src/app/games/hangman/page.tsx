'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language } from '@/lib/storage';
import { allHangmanQuestions, type HangmanQuestion } from '@/lib/games/hangman';


const alphabets: Record<Language, string[]> = {
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜẞ'.split(''),
  fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÇÉÈÊËÎÏÔŒÙÛÜŸ'.split(''),
  es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''),
  it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

const uiTexts = {
    title: { en: 'Hangman', fr: 'Le Pendu', de: 'Galgenmännchen', it: 'L\'impiccato', es: 'El Ahorcado' },
    description: {
        en: 'Guess the word based on the hint.',
        fr: 'Devinez le mot en vous basant sur l\'indice.',
        de: 'Errate das Wort anhand des Hinweises.',
        it: 'Indovina la parola basandoti sull\'indizio.',
        es: 'Adivina la palabra basándote en la pista.',
    },
    hint: { en: 'Hint', fr: 'Indice', de: 'Hinweis', it: 'Indizio', es: 'Pista' },
    win: { en: 'Congratulations! You won!', fr: 'Félicitations ! Vous avez gagné !', de: 'Herzlichen Glückwunsch! Du hast gewonnen!', it: 'Congratulazioni! Hai vinto!', es: '¡Felicidades! ¡Has ganado!' },
    lose: { en: 'Game Over! The word was:', fr: 'Partie terminée ! Le mot était :', de: 'Spiel vorbei! Das Wort war:', it: 'Partita finita! La parola era:', es: '¡Juego terminado! La palabra era:' },
    wrongGuesses: { en: 'Wrong guesses', fr: 'Mauvaises suppositions', de: 'Falsche Versuche', it: 'Tentativi sbagliati', es: 'Intentos fallidos' },
    newGame: { en: 'New Game', fr: 'Nouveau Jeu', de: 'Neues Spiel', it: 'Nuova Partita', es: 'Nuevo Juego' },
    back: { en: 'Back to Game Center', fr: 'Retour aux Jeux', de: 'Zurück zur Spielzentrale', it: 'Torna ai Giochi', es: 'Volver a Juegos' },
};

const HangmanPage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [currentWord, setCurrentWord] = useState<HangmanQuestion | null>(null);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);

    const setupNewGame = useCallback((lang: Language) => {
        const wordSet = allHangmanQuestions[lang];
        const newWord = wordSet[Math.floor(Math.random() * wordSet.length)];
        setCurrentWord(newWord);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setIsGameWon(false);
        setIsGameLost(false);
    }, []);
  
    useEffect(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        setupNewGame(currentLang);

        const handleLanguageChange = () => {
            const newLang = getLanguage();
            setLanguage(newLang);
            setupNewGame(newLang);
        };
        
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, [setupNewGame]);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter) || isGameWon || isGameLost || !currentWord) return;

        const normalizedLetter = letter.toUpperCase();
        setGuessedLetters([...guessedLetters, normalizedLetter]);

        if (currentWord.word.toUpperCase().includes(normalizedLetter)) {
            const wordGuessed = currentWord.word.toUpperCase().split('').every(l => [...guessedLetters, normalizedLetter, ' '].includes(l));
            if (wordGuessed) {
                setIsGameWon(true);
            }
        } else {
            setWrongGuesses(prev => {
                const newCount = prev + 1;
                if (newCount >= 6) {
                    setIsGameLost(true);
                }
                return newCount;
            });
        }
    };
    
    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    const wordDisplay = useMemo(() => {
        if (!currentWord) return '';
        return currentWord.word
            .toUpperCase()
            .split('')
            .map(letter => (guessedLetters.includes(letter) || letter === ' ' ? letter : '_'))
            .join(' ');
    }, [currentWord, guessedLetters]);

    const alphabet = useMemo(() => alphabets[language] || alphabets.en, [language]);

    if (!currentWord) return null; // Or a loading state

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Keyboard className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                    </div>
                    <p className="text-muted-foreground pt-2">{getUIText('description')}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-center">
                    <div>
                        <p className="text-base font-semibold">{getUIText('hint')}:</p>
                        <p className="text-lg text-muted-foreground italic">"{currentWord.hint}"</p>
                    </div>

                    <p className="text-4xl font-bold tracking-widest text-center py-4">{wordDisplay}</p>

                    <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        {alphabet.map(letter => (
                            <Button 
                                key={letter}
                                variant="outline"
                                size="icon"
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.includes(letter.toUpperCase()) || isGameWon || isGameLost}
                                className={cn(
                                    guessedLetters.includes(letter.toUpperCase()) && !currentWord.word.toUpperCase().includes(letter.toUpperCase()) && 'bg-destructive text-destructive-foreground',
                                    guessedLetters.includes(letter.toUpperCase()) && currentWord.word.toUpperCase().includes(letter.toUpperCase()) && 'bg-success text-success-foreground'
                                )}
                            >
                                {letter}
                            </Button>
                        ))}
                    </div>

                    <div className="text-center font-semibold h-6">
                        {isGameWon && <p className="text-success">{getUIText('win')}</p>}
                        {isGameLost && <p className="text-destructive">{getUIText('lose')} {currentWord.word}</p>}
                        {!isGameWon && !isGameLost && <p>{getUIText('wrongGuesses')}: {wrongGuesses} / 6</p>}
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={() => setupNewGame(language)}>{getUIText('newGame')}</Button>
                    </div>
                
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

export default HangmanPage;
