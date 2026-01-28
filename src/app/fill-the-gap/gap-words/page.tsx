'use client';

import { useState, useEffect, useMemo, type SetStateAction, type Dispatch } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Pencil, LayoutGrid, List, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language, getGapWordsProgress, addCompletedGapWord } from '@/lib/storage';
import { allGapWordQuestions, type GapWordQuestion, type GapWordCategory } from '@/lib/fill-the-gap/gap-words';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Confetti from '@/components/Confetti';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';

const VIEW_MODE_KEY = 'gapWordsViewMode';
const CATEGORY_INDEX_KEY = 'gapWordsCategoryIndex_';

const uiTexts = {
    title: { en: 'Gap in the Words', fr: 'Trou dans les Mots', de: 'Lücke in den Wörtern', it: 'Spazio nelle Parole', es: 'Hueco en las Palabras' },
    description: {
        en: 'Complete the words by typing in the missing letters.',
        fr: 'Complétez les mots en tapant les lettres manquantes.',
        de: 'Vervollständige die Wörter, indem du die fehlenden Buchstaben eingibst.',
        it: 'Completa le parole digitando le lettere mancanti.',
        es: 'Completa las palabras escribiendo las letras que faltan.'
    },
    back: { en: 'Back to Fill the Gap', fr: 'Retour à Fill the Gap', de: 'Zurück zu Lückentext', it: 'Torna a Riempi gli spazi', es: 'Volver a Rellenar Huecos' },
    view: { en: 'View', fr: 'Vue', de: 'Ansicht', it: 'Vista', es: 'Vista' },
    backToWords: { en: 'Back to Word List', fr: 'Retour à la liste', de: 'Zurück zur Wortliste', it: 'Torna all\'elenco', es: 'Volver a la lista' },
    hint: { en: 'Hint', fr: 'Indice', de: 'Hinweis', it: 'Suggerimento', es: 'Pista' },
};


function GapWordExercise({ question, onComplete, language }: { question: GapWordQuestion, onComplete: () => void, language: Language }) {
    const [inputValue, setInputValue] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const completedSet = getGapWordsProgress();
        if (completedSet.has(question.fullWord)) {
            setIsCompleted(true);
            setInputValue(question.missingLetters);
        } else {
            setIsCompleted(false);
            setInputValue('');
        }
    }, [question]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isCompleted) {
            setInputValue(value);
        }

        if (value.toLowerCase() === question.missingLetters.toLowerCase()) {
            handleCorrect();
        }
    };
    
    const handleCorrect = () => {
        if (isCompleted) return;
        setIsCompleted(true);
        addCompletedGapWord(question.fullWord);
        playSound('correct');
        vibrate('correct');
        setShowConfetti(true);
    };

    const onConfettiCompleteHandler = () => {
        setShowConfetti(false);
        onComplete();
    };

    const { wordWithGap, missingLetters, fullWord, hint } = question;
    const parts = wordWithGap.replace(/_+/, '_').split('_');
    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            {showConfetti && <Confetti onConfettiComplete={onConfettiCompleteHandler} />}
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <FileText className="h-8 w-8" />
                        <CardTitle className="text-3xl">Complete the Word</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                    <div className={cn(
                        "flex flex-col items-center gap-4 p-6 rounded-lg text-center",
                        isCompleted ? "bg-success/10" : "bg-card border"
                    )}>
                        <div className="flex-grow flex items-center gap-2 text-3xl sm:text-4xl font-mono tracking-wider flex-wrap justify-center">
                            <span>{parts[0]}</span>
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={isCompleted}
                                autoFocus
                                className={cn(
                                    "w-24 h-12 text-center text-3xl sm:text-4xl font-mono",
                                    isCompleted && "border-success bg-success/20 text-success-foreground cursor-default",
                                    !isCompleted && inputValue.toLowerCase() === missingLetters.toLowerCase() ? "border-success" : ""
                                )}
                                style={{ width: `${missingLetters.length * 1.5 + 2}rem`, maxWidth: '100%' }}
                            />
                            <span>{parts[1]}</span>
                        </div>
                        {isCompleted && (
                            <div className="flex items-center gap-2 text-2xl font-semibold text-success animate-in fade-in zoom-in-50">
                                <CheckCircle className="h-6 w-6" />
                                <span>{fullWord}</span>
                            </div>
                        )}
                    </div>
                     <div className="flex items-center gap-3 p-3 rounded-md bg-amber/10 border border-amber/20 text-amber">
                        <Lightbulb className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{getUIText('hint')}: <span className="font-semibold italic">{hint}</span></p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" onClick={onComplete}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToWords')}
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

function WordListPage({ onSelectQuestion }: { onSelectQuestion: Dispatch<SetStateAction<GapWordQuestion | null>> }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [categories, setCategories] = useState<GapWordCategory[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
    const [view, setView] = useState<'list' | 'grid'>('list');

    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'list' | 'grid' | null;
        if (savedView) setView(savedView);
        
        const handleStateUpdate = () => {
            const lang = getLanguage();
            setLanguageState(lang);
            const loadedCategories = allGapWordQuestions[lang] || [];
            setCategories(loadedCategories);
            setCompletedWords(getGapWordsProgress());
            const savedCategoryIndex = localStorage.getItem(`${CATEGORY_INDEX_KEY}${lang}`);
            setCurrentCategoryIndex(savedCategoryIndex ? parseInt(savedCategoryIndex, 10) : 0);
        };
        handleStateUpdate();

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('storage', handleStateUpdate); 

        return () => {
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('storage', handleStateUpdate);
        };
    }, []);

    const handleViewToggle = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };

    const handleNextCategory = () => {
        const newIndex = (currentCategoryIndex + 1) % categories.length;
        setCurrentCategoryIndex(newIndex);
        localStorage.setItem(`${CATEGORY_INDEX_KEY}${language}`, String(newIndex));
    };

    const handlePrevCategory = () => {
        const newIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        setCurrentCategoryIndex(newIndex);
        localStorage.setItem(`${CATEGORY_INDEX_KEY}${language}`, String(newIndex));
    };

    const currentCategory = categories[currentCategoryIndex];

    const { uncompleted, completed } = useMemo(() => {
        if (!currentCategory) return { uncompleted: [], completed: [] };
        
        const uncompletedList: GapWordQuestion[] = [];
        const completedList: GapWordQuestion[] = [];
        currentCategory.words.forEach(q => {
            if (completedWords.has(q.fullWord)) {
                completedList.push(q);
            } else {
                uncompletedList.push(q);
            }
        });
        return { uncompleted: uncompletedList, completed: completedList };
    }, [currentCategory, completedWords]);
    
    const renderWordItem = (question: GapWordQuestion, index: number, isCompleted: boolean) => (
        <div onClick={() => onSelectQuestion(question)} key={question.fullWord} className="cursor-pointer">
            <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                isCompleted ? "bg-success/10 text-muted-foreground" : "bg-card hover:bg-muted/50"
            )}>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono w-6 text-right">{index + 1}.</span>
                    <span className={cn("font-semibold text-lg", !isCompleted && "font-mono tracking-wider")}>
                         {isCompleted ? question.fullWord : question.wordWithGap.replace(/_+/g, '___')}
                    </span>
                </div>
                {isCompleted ? <CheckCircle className="h-5 w-5 text-success" /> : <Pencil className="h-5 w-5 text-muted-foreground/50" />}
            </div>
        </div>
    );
    
    if (!currentCategory) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <FileText className="h-8 w-8" />
                        <CardTitle className="text-3xl">{getUIText('title')}</CardTitle>
                    </div>
                    <p className="text-muted-foreground pt-2">{getUIText('description')}</p>
                </CardHeader>
                <CardContent className="pl-6 pr-2 pt-2 pb-4">
                     <div className="flex items-center justify-between p-2 mb-4 rounded-lg bg-muted/50 border">
                        <Button variant="ghost" size="icon" onClick={handlePrevCategory}>
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="text-center">
                          <h3 className="font-semibold">{currentCategory.title}</h3>
                          <p className="text-sm text-muted-foreground">{currentCategoryIndex + 1} / {categories.length}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleNextCategory}>
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>

                    <ScrollArea className="h-[64vh] pr-4">
                        {view === 'list' ? (
                            <div className="space-y-1">
                                {uncompleted.map((q, i) => renderWordItem(q, i, false))}
                                {completed.length > 0 && uncompleted.length > 0 && (
                                    <div className="py-4">
                                        <h3 className="text-sm font-semibold text-muted-foreground text-center uppercase tracking-wider">Completed</h3>
                                        <Separator className="mt-2" />
                                    </div>
                                )}
                                {completed.map((q, i) => renderWordItem(q, uncompleted.length + i, true))}
                            </div>
                        ) : (
                             <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                {currentCategory.words.map((question, index) => {
                                    const isCompleted = completedWords.has(question.fullWord);
                                    return (
                                        <div onClick={() => onSelectQuestion(question)} key={question.fullWord} className="cursor-pointer">
                                            <div className={cn(
                                                "flex items-center justify-center aspect-square rounded-lg transition-colors border-2",
                                                isCompleted 
                                                    ? "bg-success/20 text-foreground border-success/30 hover:bg-success/30" 
                                                    : "bg-card hover:bg-muted/50 border-primary"
                                            )}>
                                                <span className="font-bold text-xl">{index + 1}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/fill-the-gap" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('back')}
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleViewToggle}>
                            {view === 'list' ? <LayoutGrid className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                            {getUIText('view')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}

export default function GapWordsContainerPage() {
    const [selectedQuestion, setSelectedQuestion] = useState<GapWordQuestion | null>(null);
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
      const handleLangChange = () => setLanguageState(getLanguage());
      handleLangChange();
      window.addEventListener('language-changed', handleLangChange);
      return () => window.removeEventListener('language-changed', handleLangChange);
    }, []);

    const handleComplete = () => {
        setSelectedQuestion(null);
    };

    if (selectedQuestion) {
        return <GapWordExercise question={selectedQuestion} onComplete={handleComplete} language={language}/>;
    }

    return <WordListPage onSelectQuestion={setSelectedQuestion} />;
}
