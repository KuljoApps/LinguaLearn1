'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, MessagesSquare, CheckCircle, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { allGapSentenceQuestions, type Gap, type GapSentenceSet } from '@/lib/fill-the-gap/gap-sentences';
import { getLanguage, type Language, getGapSentencesProgress, addCompletedGapSentenceSet } from '@/lib/storage';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Confetti from '@/components/Confetti';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';
import { Separator } from '@/components/ui/separator';

type SelectedAnswers = Record<number, { sentence1?: string; sentence2?: string; sentence3?: string }>;
type AnswerStates = Record<number, { sentence1?: 'correct' | 'incorrect'; sentence2?: 'correct' | 'incorrect'; sentence3?: 'correct' | 'incorrect' }>;

const uiTexts = {
    title: { en: 'Gap in the Sentences', fr: 'Trou dans les Phrases', de: 'Lücke in den Sätzen', it: 'Spazio nelle Frasi', es: 'Hueco en las Oraciones' },
    description: { en: 'Complete the sentences by choosing the correct word from the list.', fr: 'Complétez les phrases en choisissant le mot correct dans la liste.', de: 'Vervollständige die Sätze, indem du das richtige Wort aus der Liste auswählst.', it: 'Completa le frasi scegliendo la parola corretta dall\'elenco.', es: 'Completa las oraciones eligiendo la palabra correcta de la lista.' },
    check: { en: 'Check Answers', fr: 'Vérifier', de: 'Antworten prüfen', it: 'Controlla', es: 'Comprobar' },
    reset: { en: 'Try Again', fr: 'Réessayer', de: 'Erneut versuchen', it: 'Riprova', es: 'Intentar de Nuevo' },
    back: { en: 'Back to Fill the Gap', fr: 'Retour à Fill the Gap', de: 'Zurück zu Lückentext', it: 'Torna a Riempi gli spazi', es: 'Volver a Rellenar Huecos' },
    incorrectToast: { en: 'Incorrect', fr: 'Incorrect', de: 'Falsch', it: 'Sbagliato', es: 'Incorrecto' },
    incorrectDesc: { en: 'One or more answers are wrong. Try again!', fr: 'Une ou plusieurs réponses sont fausses. Réessayez !', de: 'Eine oder mehrere Antworten sind falsch. Versuche es erneut!', it: 'Una o più risposte sono sbagliate. Riprova!', es: 'Una o más respuestas son incorrectas. ¡Inténtalo de nuevo!' },
    selectPlaceholder: { en: 'Select word...', fr: 'Choisir un mot...', de: 'Wort auswählen...', it: 'Seleziona parola...', es: 'Seleccionar palabra...' },
    congratulations: { en: 'Congratulations!', fr: 'Félicitations !', de: 'Glückwunsch!', it: 'Congratulazioni!', es: '¡Felicidades!' },
};

const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

function SentenceExercise({
    sentenceSet,
    onComplete,
    isCompleted,
    language,
}: {
    sentenceSet: GapSentenceSet;
    onComplete: () => void;
    isCompleted: boolean;
    language: Language;
}) {
    const { toast } = useToast();
    const [selectedAnswers, setSelectedAnswers] = useState<{ sentence1?: string; sentence2?: string, sentence3?: string }>({});
    const [answerStates, setAnswerStates] = useState<{ sentence1?: 'correct' | 'incorrect' | null; sentence2?: 'correct' | 'incorrect' | null, sentence3?: 'correct' | 'incorrect' | null }>({ sentence1: null, sentence2: null, sentence3: null });
    const [showConfetti, setShowConfetti] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState({
        s1: [] as string[],
        s2: [] as string[],
        s3: [] as string[],
    });

    useEffect(() => {
        setShuffledOptions({
            s1: shuffle(sentenceSet.sentence1.options),
            s2: shuffle(sentenceSet.sentence2.options),
            s3: shuffle(sentenceSet.sentence3.options),
        });
    }, [sentenceSet]);


    const handleSelectChange = (sentenceKey: 'sentence1' | 'sentence2' | 'sentence3', value: string) => {
        if (answerStates.sentence1) return; // Don't allow changes after checking
        setSelectedAnswers(prev => ({ ...prev, [sentenceKey]: value }));
    };

    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    const handleCheckAnswers = () => {
        if (!selectedAnswers.sentence1 || !selectedAnswers.sentence2 || !selectedAnswers.sentence3) return;

        const isCorrect1 = selectedAnswers.sentence1 === sentenceSet.sentence1.correctAnswer;
        const isCorrect2 = selectedAnswers.sentence2 === sentenceSet.sentence2.correctAnswer;
        const isCorrect3 = selectedAnswers.sentence3 === sentenceSet.sentence3.correctAnswer;

        setAnswerStates({
            sentence1: isCorrect1 ? 'correct' : 'incorrect',
            sentence2: isCorrect2 ? 'correct' : 'incorrect',
            sentence3: isCorrect3 ? 'correct' : 'incorrect',
        });

        if (isCorrect1 && isCorrect2 && isCorrect3) {
            playSound('correct');
            vibrate('correct');
            setShowConfetti(true);
            onComplete();
        } else {
            toast({ variant: 'destructive', title: getUIText('incorrectToast'), description: getUIText('incorrectDesc'), duration: 2000 });
            playSound('incorrect');
            vibrate('incorrect');
        }
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setAnswerStates({ sentence1: null, sentence2: null, sentence3: null });
        setShuffledOptions({
            s1: shuffle(sentenceSet.sentence1.options),
            s2: shuffle(sentenceSet.sentence2.options),
            s3: shuffle(sentenceSet.sentence3.options),
        });
    };

    const renderSentence = (sentence: Gap, key: 'sentence1' | 'sentence2' | 'sentence3') => {
        const options = key === 'sentence1' ? shuffledOptions.s1 : key === 'sentence2' ? shuffledOptions.s2 : shuffledOptions.s3;

        return (
            <div className="flex items-start gap-4" key={key}>
                <div className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mt-1">
                    {key === 'sentence1' ? 1 : key === 'sentence2' ? 2 : 3}
                </div>
                <p className="text-base leading-loose">
                    <span>{sentence.text[0]}</span>{' '}
                    <Select
                        onValueChange={(value) => handleSelectChange(key, value)}
                        value={selectedAnswers[key] || ''}
                        disabled={!!answerStates.sentence1}
                    >
                        <SelectTrigger className={cn(
                            "h-8 pt-0 font-semibold text-base w-auto inline-flex items-baseline justify-start [&>svg]:hidden px-2 border-amber",
                            answerStates[key] === 'correct' && 'border-success text-success ring-2 ring-success/50',
                            answerStates[key] === 'incorrect' && 'border-destructive text-destructive ring-2 ring-destructive/50'
                        )}>
                            <SelectValue placeholder={getUIText('selectPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(opt => <SelectItem key={opt} value={opt} className="text-lg">{opt}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {' '}<span>{sentence.text[1]}</span>
                </p>
            </div>
        );
    };
    
    const allCorrectAfterCheck = answerStates.sentence1 === 'correct' && answerStates.sentence2 === 'correct' && answerStates.sentence3 === 'correct';

    return (
        <div className="space-y-4">
            {showConfetti && <Confetti onConfettiComplete={() => setShowConfetti(false)} />}
            
            <div className="space-y-4">
                {renderSentence(sentenceSet.sentence1, 'sentence1')}
                {renderSentence(sentenceSet.sentence2, 'sentence2')}
                {renderSentence(sentenceSet.sentence3, 'sentence3')}
            </div>

            <div className="flex justify-center pt-2">
                {!answerStates.sentence1 ? (
                    <Button
                        size="sm"
                        onClick={handleCheckAnswers}
                        disabled={!selectedAnswers.sentence1 || !selectedAnswers.sentence2 || !selectedAnswers.sentence3}
                    >
                        {getUIText('check')}
                    </Button>
                ) : allCorrectAfterCheck ? (
                    <Button size="sm" disabled className="bg-success text-success-foreground hover:bg-success/90">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {getUIText('congratulations')}
                    </Button>
                ) : (
                    <Button variant="destructive" size="sm" onClick={handleReset}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {getUIText('reset')}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default function GapSentencesPage() {
    const [language, setLanguageState] = useState<Language>('en');
    const [questions, setQuestions] = useState<GapSentenceSet[]>([]);
    const [completedSets, setCompletedSets] = useState<Set<number>>(new Set());

    useEffect(() => {
        const handleStateUpdate = () => {
            const lang = getLanguage();
            setLanguageState(lang);
            setQuestions(allGapSentenceQuestions[lang] || []);
            setCompletedSets(getGapSentencesProgress());
        };
        handleStateUpdate();

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('storage', handleStateUpdate); 

        return () => {
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('storage', handleStateUpdate);
        };
    }, []);
    
    const handleSetComplete = useCallback((setId: number) => {
        addCompletedGapSentenceSet(setId);
        setCompletedSets(prev => new Set(prev).add(setId));
    }, []);
    
    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessagesSquare className="h-8 w-8" />
                        <CardTitle className="text-3xl">{getUIText('title')}</CardTitle>
                    </div>
                    <p className="pt-3 text-muted-foreground">{getUIText('description')}</p>
                </CardHeader>
                <CardContent className="pl-6 pr-2 pt-0 pb-4">
                    <ScrollArea className="h-[63vh] pr-4">
                       <Accordion type="multiple" className="w-full">
                            {questions.map((q, index) => (
                                <AccordionItem value={`item-${q.id}`} key={q.id}>
                                    <AccordionTrigger className="text-lg hover:no-underline">
                                        <div className="flex items-center gap-4 w-full pr-4">
                                            <span className="text-muted-foreground font-mono w-6 text-right">{index + 1}.</span>
                                            <span className="font-semibold flex-1 text-left">{q.title}</span>
                                            {completedSets.has(q.id) && <CheckCircle className="h-5 w-5 text-success" />}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <SentenceExercise 
                                            sentenceSet={q}
                                            onComplete={() => handleSetComplete(q.id)}
                                            isCompleted={completedSets.has(q.id)}
                                            language={language}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/fill-the-gap" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('back')}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
