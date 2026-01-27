"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Brain, Award, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language } from '@/lib/storage';
import { allMemoryQuestions, type MemoryPair } from '@/lib/games/memory';

type CardInfo = {
  id: number;
  value: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
};

const uiTexts = {
    title: { en: 'Memory Game', fr: 'Jeu de Mémoire', de: 'Memory-Spiel', it: 'Gioco di Memoria', es: 'Juego de Memoria' },
    moves: { en: 'Moves', fr: 'Coups', de: 'Züge', it: 'Mosse', es: 'Movimientos' },
    winTitle: { en: 'You won!', fr: 'Vous avez gagné !', de: 'Du hast gewonnen!', it: 'Hai vinto!', es: '¡Has ganado!' },
    winDescription: { 
        en: 'Congratulations! You matched all the pairs in {moves} moves.', 
        fr: 'Félicitations ! Vous avez trouvé toutes les paires en {moves} coups.', 
        de: 'Herzlichen Glückwunsch! Du hast alle Paare in {moves} Zügen gefunden.', 
        it: 'Congratulazioni! Hai trovato tutte le coppie in {moves} mosse.', 
        es: '¡Felicidades! Has encontrado todos los pares en {moves} movimientos.' 
    },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    backToGames: { en: 'Back to Game Center', fr: 'Retour au Centre de jeux', de: 'Zurück zur Spielzentrale', it: 'Torna al Centro Giochi', es: 'Volver al Centro de Juegos' }
};

const MemoryGamePage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardInfo[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const getUIText = (key: keyof typeof uiTexts, replacements: Record<string, string | number> = {}) => {
      let text = uiTexts[key][language] || uiTexts[key]['en'];
      for (const placeholder in replacements) {
          text = text.replace(`{${placeholder}}`, String(replacements[placeholder]));
      }
      return text;
  };

  const initializeGame = () => {
    const currentLang = getLanguage();
    setLanguage(currentLang);
    const wordSet = allMemoryQuestions[currentLang];

    // Shuffle and pick 6 pairs
    const gamePairs = [...wordSet].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const gameCards = gamePairs.flatMap((word, index) => [
      { id: index * 2, value: word.native, pairId: index, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, value: word.pl, pairId: index, isFlipped: false, isMatched: false },
    ]);

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setIsGameWon(false);
  };

  useEffect(() => {
    initializeGame();
    window.addEventListener('language-changed', initializeGame);
    return () => {
      window.removeEventListener('language-changed', initializeGame);
    }
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.pairId === second.pairId) {
        // Match
        setCards(prevCards =>
          prevCards.map(card =>
            card.pairId === first.pairId ? { ...card, isMatched: true, isFlipped: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              flippedCards.some(fc => fc.id === card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (clickedCard: CardInfo) => {
    if (flippedCards.length === 2 || clickedCard.isFlipped) {
      return;
    }

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, { ...clickedCard, isFlipped: true }]);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center p-6 pb-2">
          <div className="flex items-center justify-center gap-4">
            <Brain className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-muted-foreground text-center pb-6">{getUIText('moves')}: {moves}</p>
          {isGameWon ? (
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto text-amber" />
              <h2 className="text-2xl font-bold">{getUIText('winTitle')}</h2>
              <p>{getUIText('winDescription', { moves })}</p>
              <Button onClick={initializeGame}>{getUIText('playAgain')}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {cards.map(card => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={cn(
                    "h-24 sm:h-32 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300",
                    card.isFlipped
                      ? 'bg-card border-2 border-primary'
                      : 'border-2 border-amber qr-pattern-bg shadow-[0_0_20px_#ff8c00]',
                    card.isMatched && 'bg-success/20 border-success cursor-default',
                  )}
                >
                  {card.isFlipped ? (
                    <span className="text-lg sm:text-xl font-bold p-2 text-center">{card.value}</span>
                  ) : (
                    <HelpCircle className="h-12 w-12 text-amber" />
                  )}
                </div>
              ))}
            </div>
          )}
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

export default MemoryGamePage;
