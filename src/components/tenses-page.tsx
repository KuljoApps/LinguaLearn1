"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Clock } from 'lucide-react';
import type { Tense } from '@/lib/tenses';
import type { Language } from '@/lib/storage';

interface TensesPageProps {
    title: string;
    backHref: string;
    tenses: Tense[];
    language: Language;
}

const TenseAccordion = ({ tenses }: { tenses: Tense[] }) => (
    <Accordion type="single" collapsible className="w-full">
        {tenses.map((tense) => (
            <AccordionItem value={tense.name} key={tense.name}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {tense.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <p className="text-muted-foreground">{tense.usage}</p>
                    <div>
                        <p className="font-semibold">Przykład:</p>
                        <p className="italic">"{tense.example}"</p>
                        <p className="text-sm text-muted-foreground">Tłumaczenie: "{tense.example_pl}"</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

export default function TensesPage({ title, backHref, tenses, language }: TensesPageProps) {

    const renderEnglishTenses = () => {
        const presentTenses = tenses.filter(t => t.name.startsWith('Present'));
        const pastTenses = tenses.filter(t => t.name.startsWith('Past'));
        const futureTenses = tenses.filter(t => t.name.startsWith('Future'));
        const conditionals = tenses.filter(t => t.name.endsWith('Conditional'));

        const groups = [
            { title: 'Present Tenses', tenses: presentTenses },
            { title: 'Past Tenses', tenses: pastTenses },
            { title: 'Future Tenses', tenses: futureTenses },
            { title: 'Conditionals', tenses: conditionals },
        ].filter(group => group.tenses.length > 0);

        return (
             <div className="space-y-6">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-2xl font-bold italic tracking-tight mb-2 text-primary">{group.title}</h3>
                        <div className="pl-2 border-l-2 border-primary/20">
                            <TenseAccordion tenses={group.tenses} />
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    const renderGermanTenses = () => {
        const gegenwartTenses = tenses.filter(t => t.name === 'Präsens');
        const vergangenheitTenses = tenses.filter(t => ['Perfekt', 'Präteritum', 'Plusquamperfekt'].includes(t.name));
        const zukunftTenses = tenses.filter(t => t.name.startsWith('Futur'));
        const konjunktivTenses = tenses.filter(t => t.name.startsWith('Konjunktiv'));

        const groups = [
            { title: 'Gegenwart', tenses: gegenwartTenses },
            { title: 'Vergangenheit', tenses: vergangenheitTenses },
            { title: 'Zukunft', tenses: zukunftTenses },
            { title: 'Konjunktiv', tenses: konjunktivTenses },
        ].filter(group => group.tenses.length > 0);

        return (
             <div className="space-y-6">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-2xl font-bold italic tracking-tight mb-2 text-primary">{group.title}</h3>
                        <div className="pl-2 border-l-2 border-primary/20">
                            <TenseAccordion tenses={group.tenses} />
                        </div>
                    </div>
                ))}
            </div>
        )
    };
    
    const renderSpanishTenses = () => {
        const presenteTenses = tenses.filter(t => t.name.startsWith('Presente'));
        const pasadoTenses = tenses.filter(t => t.name.startsWith('Pretérito'));
        const futuroTenses = tenses.filter(t => t.name.startsWith('Futuro'));
        const condicionalTenses = tenses.filter(t => t.name.startsWith('Condicional'));

        const groups = [
            { title: 'Presente', tenses: presenteTenses },
            { title: 'Pasado', tenses: pasadoTenses },
            { title: 'Futuro', tenses: futuroTenses },
            { title: 'Condicionales', tenses: condicionalTenses },
        ].filter(group => group.tenses.length > 0);

        return (
             <div className="space-y-6">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-2xl font-bold italic tracking-tight mb-2 text-primary">{group.title}</h3>
                        <div className="pl-2 border-l-2 border-primary/20">
                            <TenseAccordion tenses={group.tenses} />
                        </div>
                    </div>
                ))}
            </div>
        )
    };
    
    const renderItalianTenses = () => {
        const presenteTenses = tenses.filter(t => t.name.startsWith('Presente'));
        const passatoTenses = tenses.filter(t => t.name.startsWith('Passato') || t.name.startsWith('Imperfetto') || t.name.startsWith('Trapassato'));
        const futuroTenses = tenses.filter(t => t.name.startsWith('Futuro'));
        const condizionaleTenses = tenses.filter(t => t.name.startsWith('Condizionale'));

        const groups = [
            { title: 'Presente', tenses: presenteTenses },
            { title: 'Passato', tenses: passatoTenses },
            { title: 'Futuro', tenses: futuroTenses },
            { title: 'Condizionale', tenses: condizionaleTenses },
        ].filter(group => group.tenses.length > 0);

        return (
             <div className="space-y-6">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-2xl font-bold italic tracking-tight mb-2 text-primary">{group.title}</h3>
                        <div className="pl-2 border-l-2 border-primary/20">
                            <TenseAccordion tenses={group.tenses} />
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    const renderFrenchTenses = () => {
        const presentTenses = tenses.filter(t => t.name.startsWith('Présent'));
        const passeTenses = tenses.filter(t => t.name.startsWith('Passé') || t.name.startsWith('Imparfait') || t.name.startsWith('Plus-que-parfait'));
        const futurTenses = tenses.filter(t => t.name.startsWith('Futur'));
        const conditionnelTenses = tenses.filter(t => t.name.startsWith('Conditionnel'));

        const groups = [
            { title: 'Présent', tenses: presentTenses },
            { title: 'Passé', tenses: passeTenses },
            { title: 'Futur', tenses: futurTenses },
            { title: 'Conditionnel', tenses: conditionnelTenses },
        ].filter(group => group.tenses.length > 0);

        return (
             <div className="space-y-6">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-2xl font-bold italic tracking-tight mb-2 text-primary">{group.title}</h3>
                        <div className="pl-2 border-l-2 border-primary/20">
                            <TenseAccordion tenses={group.tenses} />
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    const renderContent = () => {
        switch (language) {
            case 'en':
                return renderEnglishTenses();
            case 'de':
                return renderGermanTenses();
            case 'es':
                return renderSpanishTenses();
            case 'it':
                return renderItalianTenses();
            case 'fr':
                return renderFrenchTenses();
            default:
                return <TenseAccordion tenses={tenses} />;
        }
    }

    const backButtonTexts: Record<Language, string> = {
        en: 'Back to Learning',
        de: 'Zurück zum Lernen',
        es: 'Volver a Aprendizaje',
        fr: 'Retour à l\'Apprentissage',
        it: 'Torna ad Apprendimento',
    };
    
    const backText = backButtonTexts[language];

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                    <Clock className="h-8 w-8" />
                    <CardTitle className="text-3xl">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    {renderContent()}
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {backText}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
