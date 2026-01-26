"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowLeft, Gamepad2, Brain, Puzzle, Keyboard, EyeOff, Timer, ArrowRightLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getFavoriteGames, toggleFavoriteGame } from '@/lib/storage';
import { cn } from '@/lib/utils';

const allGames = [
    { title: 'Memory', href: '/games/memory', icon: Brain, description: 'Match pairs of words and their translations. A classic game to test and improve your vocabulary retention.' },
    { title: 'Crossword', href: '/games/crossword', icon: Puzzle, description: 'Solve the crossword puzzle where clues are in one language and answers in another. A fun vocabulary challenge.' },
    { title: 'Hangman', href: '/games/hangman', icon: Keyboard, description: 'Guess the hidden word letter by letter based on a Polish hint. A classic word-guessing game.' },
    { title: 'Odd One Out', href: '/games/odd-one-out', icon: EyeOff, description: 'From a group of words, find the one that doesn\'t belong to the category. A test of logic and vocabulary.' },
    { title: 'Translation Race', href: '/games/translation-race', icon: Timer, description: 'Translate as many words as you can in 60 seconds. A fast-paced challenge for quick thinkers.' },
    { title: 'Synonym Match', href: '/games/synonym-match', icon: ArrowRightLeft, description: 'Match words from two columns that have the same or similar meaning. A great way to expand your vocabulary.' },
]

const SCROLL_POSITION_KEY = 'gamesScrollPosition';

export default function GamesPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
            if (scrollPosition) {
                container.scrollTop = parseInt(scrollPosition, 10);
                sessionStorage.removeItem(SCROLL_POSITION_KEY);
            }
        }
        
        const loadFavorites = () => setFavorites(getFavoriteGames());
        loadFavorites();

        window.addEventListener('favorites-changed', loadFavorites);
        return () => {
            window.removeEventListener('favorites-changed', loadFavorites);
        }
    }, []);

    const handleFavoriteToggle = (href: string) => {
        setFavorites(toggleFavoriteGame(href));
    }

    const handleGameClick = () => {
        const container = scrollContainerRef.current;
        if (container) {
            sessionStorage.setItem(SCROLL_POSITION_KEY, String(container.scrollTop));
        }
    };

    const sortedGames = useMemo(() => {
        const favoriteGames = allGames.filter(game => favorites.includes(game.href));
        const otherGames = allGames.filter(game => !favorites.includes(game.href));

        // Sort favorite games based on the order in the favorites array
        favoriteGames.sort((a, b) => favorites.indexOf(a.href) - favorites.indexOf(b.href));

        return [...favoriteGames, ...otherGames];
    }, [favorites]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Gamepad2 className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Game Center</h1>
                    </div>
                </CardHeader>
                <CardContent ref={scrollContainerRef} className="px-6 pb-6 pt-0 max-h-[70vh] overflow-y-auto">
                    <p className="text-muted-foreground text-center pb-4">Choose a game to practice your language skills in a fun way!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedGames.map((game) => {
                            const Icon = game.icon;
                            const isFavorite = favorites.includes(game.href);
                            return (
                                <Card key={game.title} className="relative border-2 border-amber">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 z-10 h-8 w-8"
                                        onClick={() => handleFavoriteToggle(game.href)}
                                    >
                                        <Star className={cn(
                                            "h-5 w-5 transition-colors",
                                            isFavorite ? "text-amber fill-amber" : "text-muted-foreground/50 hover:text-muted-foreground"
                                        )} />
                                    </Button>
                                    <CardHeader className="items-center">
                                        <Icon className="h-12 w-12 text-primary" />
                                        <CardTitle className="pt-2 text-center">{game.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-center text-muted-foreground h-20">{game.description.replace(/ a /g, ' a ').replace(/ i /g, ' i ').replace(/ o /g, ' o ').replace(/ u /g, ' u ').replace(/ w /g, ' w ').replace(/ z /g, ' z ')}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={game.href} className="w-full" onClick={handleGameClick}>
                                            <Button className="w-full">Play</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> 
                            <span>Back to Home</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
