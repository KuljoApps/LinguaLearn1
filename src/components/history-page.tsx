"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ScrollText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { HistoryPageData } from '@/lib/history';

export default function HistoryPage({ data }: { data: HistoryPageData }) {
  const t = (key: keyof HistoryPageData['ui']) => {
    return data.ui[key]['native'];
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-center p-4 pb-2">
          <div className="flex items-center gap-4">
            <ScrollText className="h-8 w-8" />
            <CardTitle className="text-3xl">{t('title')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <ScrollArea className="h-[70vh] w-full pr-4">
            <Accordion type="single" collapsible className="w-full">
              {data.events.map((event, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                    <div className="flex items-center gap-4 w-full">
                        <span className="font-bold text-primary tabular-nums w-24 text-right">{event.date}</span>
                        <span className="flex-1">{event.name.native}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pl-4 ml-28 border-l-2 border-primary/20">
                    <p className="text-muted-foreground text-justify">{event.description.native}</p>
                    <hr className="my-2 border-border" />
                    <p className="text-sm text-justify">{event.description.pl}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center p-4">
          <Link href={`/learning/${data.lang}/culture`} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backButton')}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
