"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Volume2 } from 'lucide-react';
import type { PhoneticsPageData } from '@/lib/phonetics';
import { getSettings } from '@/lib/storage';

interface PhoneticsCategoryPageProps {
  data: PhoneticsPageData;
  children: React.ReactNode;
}

export default function PhoneticsCategoryPage({ data, children }: PhoneticsCategoryPageProps) {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, [activeAudio]);

  const handlePlaySound = (audioId: string) => {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
    }

    const settings = getSettings();
    if (!settings.soundsEnabled) return;

    const audioUrl = `/audio/phonetics/${data.lang}/${data.category}/${audioId}.mp3`;
    const newAudio = new Audio(audioUrl);
    
    newAudio.volume = settings.volume / 100;

    newAudio.play().catch(error => {
      console.error(`Error playing audio for "${audioId}":`, error);
    });

    setActiveAudio(newAudio);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4">
                {children}
                <CardTitle className="text-3xl">{data.title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-96 w-full pr-4">
                <Accordion type="single" collapsible className="w-full">
                    {data.phrases.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                                {item.phrase}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground font-mono text-sm">{item.phonetic}</p>
                                        <p className="text-sm">{item.translation}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handlePlaySound(item.audioId)}>
                                        <Volume2 className="h-6 w-6 text-deep-purple" />
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
          <Link href={`/learning/${data.lang}/phonetics`} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {data.ui.backButton}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
