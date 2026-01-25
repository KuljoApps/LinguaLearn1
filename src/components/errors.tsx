"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ArrowLeft, Trash2, ArrowUpDown, Trophy, ShieldX } from "lucide-react";
import { getErrors, clearErrors, type ErrorRecord, type Achievement, getLanguage, type Language, getTutorialState } from "@/lib/storage";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { playSound } from '@/lib/sounds';

interface AggregatedError {
    word: string;
    correctAnswer: string;
    quiz: string;
    count: number;
    userAnswers: Set<string>;
}

type QuizFilter = 'all' | 'English - Polish' | 'Polish - English' | 'Irregular Verbs' | 'Phrasal Verbs' | 'Idioms' | 'French - Polish' | 'Polish - French' | 'Irregular Verbs (FR)' | 'Faux Amis (FR)' | 'Idioms (FR)' | 'German - Polish' | 'Polish - German' | 'Irregular Verbs (DE)' | 'Separable Verbs (DE)' | 'Idioms (DE)' | 'Italiano - Polacco' | 'Polacco - Italiano' | 'Verbi Irregolari (IT)' | 'Falsi Amici (IT)' | 'Modi di dire (IT)' | 'Español - Polaco' | 'Polaco - Español' | 'Verbos Irregulares (ES)' | 'Falsos Amigos (ES)' | 'Modismos (ES)';
type SortableKey = keyof ErrorRecord | keyof AggregatedError;

const uiTexts = {
    title: { en: 'Common Errors', fr: 'Erreurs Courantes', de: 'Häufige Fehler', it: 'Errori Comuni', es: 'Errores Comunes' },
    filterPlaceholder: { en: 'Filter by quiz', fr: 'Filtrer par quiz', de: 'Nach Quiz filtern', it: 'Filtra per quiz', es: 'Filtrar por cuestionario' },
    allQuizzes: { en: 'All Quizzes', fr: 'Tous les quiz', de: 'Alle Quizze', it: 'Tutti i quiz', es: 'Todos los cuestionarios' },
    viewFrequent: { en: 'View Most Frequent', fr: 'Voir les plus fréquents', de: 'Häufigste anzeigen', it: 'Visualizza più frequenti', es: 'Ver más frecuentes' },
    viewLatest: { en: 'View Latest', fr: 'Voir les derniers', de: 'Neueste anzeigen', it: 'Visualizza più recenti', es: 'Ver más recientes' },
    noErrors: { en: 'No errors recorded for this filter.', fr: 'Aucune erreur enregistrée pour ce filtre.', de: 'Keine Fehler für diesen Filter aufgezeichnet.', it: 'Nessun errore registrato per questo filtro.', es: 'No hay errores registrados para este filtro.' },
    count: { en: 'Count', fr: 'Total', de: 'Anzahl', it: 'Conteggio', es: 'Recuento' },
    word: { en: 'Word', fr: 'Mot', de: 'Wort', it: 'Parola', es: 'Palabra' },
    correctAnswer: { en: 'Correct Answer', fr: 'Bonne Réponse', de: 'Richtige Antwort', it: 'Risposta Corretta', es: 'Respuesta Correcta' },
    yourAnswers: { en: 'Your Answers', fr: 'Vos Réponses', de: 'Deine Antworten', it: 'Tue Risposte', es: 'Tus Respuestas' },
    yourAnswer: { en: 'Your Answer', fr: 'Votre Réponse', de: 'Deine Antwort', it: 'La Tua Risposta', es: 'Tu Respuesta' },
    quiz: { en: 'Quiz', fr: 'Quiz', de: 'Quiz', it: 'Quiz', es: 'Cuestionario' },
    date: { en: 'Date', fr: 'Date', de: 'Datum', it: 'Data', es: 'Fecha' },
    backToHome: { en: 'Back to Home', fr: 'Retour à l\'accueil', de: 'Zurück zur Startseite', it: 'Torna alla Home', es: 'Volver al Inicio' },
    clearErrors: { en: 'Clear Errors', fr: 'Effacer les Erreurs', de: 'Fehler löschen', it: 'Cancella Errori', es: 'Borrar Errores' },
    alertTitle: { en: 'Are you sure?', fr: 'Êtes-vous sûr ?', de: 'Bist du sicher?', it: 'Sei sicuro?', es: '¿Estás seguro?' },
    alertDescription: { en: 'This will permanently delete all your recorded errors. This action cannot be undone.', fr: 'Cela supprimera définitivement toutes vos erreurs enregistrées. Cette action ne peut pas être annulée.', de: 'Dadurch werden alle deine aufgezeichneten Fehler dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.', it: 'Questo eliminerà permanentemente tutti i tuoi errori registrati. Questa azione non può essere annullata.', es: 'Esto eliminará permanentemente todos tus errores registrados. Esta acción no se puede deshacer.' },
    cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar' },
    confirmClear: { en: 'Clear', fr: 'Effacer', de: 'Löschen', it: 'Cancella', es: 'Borrar' },
};

const quizOptionsByLanguage: Record<Language, { value: string; label: string }[]> = {
    en: [
        { value: 'English - Polish', label: 'English - Polish' },
        { value: 'Polish - English', label: 'Polish - English' },
        { value: 'Irregular Verbs', label: 'Irregular Verbs' },
        { value: 'Phrasal Verbs', label: 'Phrasal Verbs' },
        { value: 'Idioms', label: 'Idioms' },
    ],
    fr: [
        { value: 'French - Polish', label: 'Français - Polonais' },
        { value: 'Polish - French', label: 'Polonais - Français' },
        { value: 'Irregular Verbs (FR)', label: 'Verbes Irréguliers' },
        { value: 'Faux Amis (FR)', label: 'Faux Amis' },
        { value: 'Idioms (FR)', label: 'Idiomes' },
    ],
    de: [
        { value: 'German - Polish', label: 'Deutsch - Polnisch' },
        { value: 'Polish - German', label: 'Polnisch - Deutsch' },
        { value: 'Irregular Verbs (DE)', label: 'Unregelmäßige Verben' },
        { value: 'Separable Verbs (DE)', label: 'Trennbare Verben' },
        { value: 'Idioms (DE)', label: 'Redewendungen' },
    ],
    it: [
        { value: 'Italiano - Polacco', label: 'Italiano - Polacco' },
        { value: 'Polacco - Italiano', label: 'Polacco - Italiano' },
        { value: 'Verbi Irregolari (IT)', label: 'Verbi Irregolari' },
        { value: 'Falsi Amici (IT)', label: 'Falsi Amici' },
        { value: 'Modi di dire (IT)', label: 'Modi di dire' },
    ],
    es: [
        { value: 'Español - Polaco', label: 'Español - Polaco' },
        { value: 'Polaco - Español', label: 'Polaco - Español' },
        { value: 'Verbos Irregulares (ES)', label: 'Verbos Irregulares' },
        { value: 'Falsos Amigos (ES)', label: 'Falsos Amigos' },
        { value: 'Modismos (ES)', label: 'Modismos' },
    ],
};


export default function ErrorsPage() {
    const [errors, setErrors] = useState<ErrorRecord[]>([]);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
    const [view, setView] = useState<'latest' | 'frequent'>('latest');
    const [quizFilter, setQuizFilter] = useState<QuizFilter>('all');
    const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKey; direction: 'ascending' | 'descending' } | null>(null);
    const [language, setLanguageState] = useState<Language>('en');
    const [isTutorialActive, setIsTutorialActive] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const handleStateUpdate = () => {
            const currentLang = getLanguage();
            setLanguageState(currentLang);
            setErrors(getErrors()); // Reload errors for the current language
            setQuizFilter('all');

            const tutorialState = getTutorialState();
            const isOnErrorsStep = tutorialState?.isActive &&
                                   tutorialState.stage === 'extended' &&
                                   tutorialState.step >= 4 && tutorialState.step <= 5;
            setIsTutorialActive(isOnErrorsStep);
        };
        handleStateUpdate();

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('tutorial-state-changed', handleStateUpdate);

        return () => {
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('tutorial-state-changed', handleStateUpdate);
        };
    }, []);

    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    const showAchievementToast = (achievement: Achievement) => {
        playSound('achievement');
        toast({
            title: (
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber" />
                    <span className="font-bold">Achievement Unlocked!</span>
                </div>
            ),
            description: `You've earned: "${achievement.name}"`,
        });
    };

    const fakeErrors: ErrorRecord[] = [
        { id: 1, quiz: 'English - Polish', word: 'Accomplish', userAnswer: 'Akompaniować', correctAnswer: 'Osiągnąć' },
        { id: 2, quiz: 'Polish - English', word: 'Wytrwać', userAnswer: 'Survive', correctAnswer: 'Persevere' },
        { id: 3, quiz: 'English - Polish', word: 'Reliable', userAnswer: 'Religijny', correctAnswer: 'Niezawodny' },
        { id: 4, quiz: 'Irregular Verbs', word: 'write', userAnswer: 'writed, written', correctAnswer: 'wrote, written' },
        { id: 5, quiz: 'English - Polish', word: 'Accomplish', userAnswer: 'Kompletny', correctAnswer: 'Osiągnąć' },
    ];

    const displayErrors = isTutorialActive && errors.length === 0 ? fakeErrors : errors;

    const requestSort = (key: SortableKey) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleViewChange = () => {
        setView(view === 'latest' ? 'frequent' : 'latest');
        setSortConfig(null);
    };

    const handleFilterChange = (value: QuizFilter) => {
        setQuizFilter(value);
        setSortConfig(null);
    };

    const handleRowClick = (id: string | number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const truncateText = (text: string, length = 15) => {
        if (!text || text.length <= length) {
            return text;
        }
        return `${text.substring(0, length)}...`;
    };

    const filteredErrors = useMemo(() => {
        if (quizFilter === 'all') {
            return displayErrors;
        }
        return displayErrors.filter(error => error.quiz === quizFilter);
    }, [displayErrors, quizFilter]);

    const handleClearErrors = () => {
        const unlockedAchievements = clearErrors();
        unlockedAchievements.forEach(showAchievementToast);
        setErrors([]);
        setIsClearAlertOpen(false);
    }
    
    const sortedFrequentErrors = useMemo((): AggregatedError[] => {
        if (view !== 'frequent') return [];

        const errorCounts = new Map<string, AggregatedError>();

        for (const error of filteredErrors) {
            const key = `${error.quiz}|${error.word}|${error.correctAnswer}`;
            let entry = errorCounts.get(key);

            if (!entry) {
                entry = {
                    word: error.word,
                    correctAnswer: error.correctAnswer,
                    quiz: error.quiz,
                    count: 0,
                    userAnswers: new Set<string>(),
                };
                errorCounts.set(key, entry);
            }

            entry.count++;
            if (error.userAnswer && error.userAnswer !== 'No answer') {
                entry.userAnswers.add(error.userAnswer);
            }
        }
        
        let sortableItems = Array.from(errorCounts.values());
        
        if (sortConfig) {
            sortableItems.sort((a, b) => {
                const key = sortConfig.key as keyof AggregatedError;
                let valA = a[key];
                let valB = b[key];

                if (typeof valA === 'string' && typeof valB === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        } else {
             sortableItems.sort((a, b) => b.count - a.count);
        }

        return sortableItems;
    }, [filteredErrors, view, sortConfig]);

    const sortedLatestErrors = useMemo(() => {
        if (view !== 'latest') return [];
        let sortableItems = [...filteredErrors];

        if (sortConfig) {
            sortableItems.sort((a, b) => {
                const key = sortConfig.key as keyof ErrorRecord;
                let valA = a[key];
                let valB = b[key];

                if (typeof valA === 'string' && typeof valB === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }
                
                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredErrors, view, sortConfig]);

    const SortableHeader = ({ title, sortKey }: { title: string, sortKey: SortableKey }) => (
        <TableHead>
            <Button variant="ghost" onClick={() => requestSort(sortKey)} className="justify-start px-0 font-bold text-foreground">
                {title}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </TableHead>
    );

    const renderTable = () => {
        if (filteredErrors.length === 0) {
            return <p className="text-center text-muted-foreground pt-10">{getUIText('noErrors')}</p>;
        }

        if (view === 'frequent') {
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableHeader title={getUIText('count')} sortKey="count" />
                            <SortableHeader title={getUIText('word')} sortKey="word" />
                            <SortableHeader title={getUIText('correctAnswer')} sortKey="correctAnswer" />
                            <TableHead className="font-bold text-foreground">{getUIText('yourAnswers')}</TableHead>
                            <SortableHeader title={getUIText('quiz')} sortKey="quiz" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedFrequentErrors.map((error, index) => {
                            const isExpanded = expandedRows.has(index);
                            const userAnswersText = Array.from(error.userAnswers).join(', ');
                             const uniqueKey = `${error.quiz}|${error.word}-${error.correctAnswer}-${index}`;
                            return (
                                <TableRow key={uniqueKey} onClick={() => handleRowClick(uniqueKey)} className="cursor-pointer">
                                    <TableCell className="font-bold text-center whitespace-nowrap">{error.count}</TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">{isExpanded ? error.word : truncateText(error.word)}</TableCell>
                                    <TableCell className="text-success whitespace-nowrap">{isExpanded ? error.correctAnswer : truncateText(error.correctAnswer)}</TableCell>
                                    <TableCell className="text-destructive whitespace-nowrap">
                                        {isExpanded ? userAnswersText : truncateText(userAnswersText)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{error.quiz}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader title={getUIText('word')} sortKey="word" />
                        <SortableHeader title={getUIText('correctAnswer')} sortKey="correctAnswer" />
                        <SortableHeader title={getUIText('yourAnswer')} sortKey="userAnswer" />
                        <SortableHeader title={getUIText('quiz')} sortKey="quiz" />
                        <SortableHeader title={getUIText('date')} sortKey="id" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedLatestErrors.map((error) => {
                        const isExpanded = expandedRows.has(error.id);
                        return (
                            <TableRow key={error.id} onClick={() => handleRowClick(error.id)} className="cursor-pointer">
                                <TableCell className="font-medium whitespace-nowrap">{isExpanded ? error.word : truncateText(error.word)}</TableCell>
                                <TableCell className="text-success whitespace-nowrap">{isExpanded ? error.correctAnswer : truncateText(error.correctAnswer)}</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">{isExpanded ? error.userAnswer : truncateText(error.userAnswer)}</TableCell>
                                <TableCell className="whitespace-nowrap">{error.quiz}</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    {formatDistanceToNow(new Date(error.id), { addSuffix: true })}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    return (
        <>
            <Card className="w-full max-w-4xl shadow-2xl" data-tutorial-id="errors-card">
                <CardHeader className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-4">
                        <ShieldX className="h-8 w-8" />
                        <CardTitle className="text-3xl">{getUIText('title')}</CardTitle>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2" data-tutorial-id="errors-controls">
                         <Select value={quizFilter} onValueChange={(value) => handleFilterChange(value as QuizFilter)}>
                            <SelectTrigger>
                                <SelectValue placeholder={getUIText('filterPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{getUIText('allQuizzes')}</SelectItem>
                                {quizOptionsByLanguage[language].map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={handleViewChange}>
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            {view === 'latest' ? getUIText('viewFrequent') : getUIText('viewLatest')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-96 w-full p-0" data-tutorial-id="errors-table">
                    {renderTable()}
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <div className="inline-flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToHome')}
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={errors.length === 0 || isTutorialActive}>
                            <Trash2 className="mr-2 h-4 w-4" /> {getUIText('clearErrors')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{getUIText('alertTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {getUIText('alertDescription')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{getUIText('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearErrors} className="bg-destructive hover:bg-destructive/90">
                            {getUIText('confirmClear')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
