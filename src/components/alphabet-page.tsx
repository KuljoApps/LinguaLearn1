"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Volume2 } from 'lucide-react';
import type { AlphabetData } from '@/lib/alphabet';

interface AlphabetPageProps {
  data: AlphabetData;
}

export default function AlphabetPage({ data }: AlphabetPageProps) {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup function to pause audio when the component unmounts
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, [activeAudio]);

  const handlePlaySound = (letter: string) => {
    // If there's an audio playing, stop it.
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
    }

    const audioUrl = `/audio/phonetics/${data.lang}/${letter.toLowerCase()}.mp3`;
    const newAudio = new Audio(audioUrl);
    
    newAudio.play().catch(error => {
      console.error(`Error playing audio for letter "${letter}":`, error);
      // Optionally, you can add a toast notification here to inform the user
      // that the audio file is missing.
    });

    setActiveAudio(newAudio);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{data.ui.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full pr-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {data.alphabet.map((item) => (
                <Button
                  key={`${item.letter}-${item.phonetic}`}
                  variant="outline"
                  className="h-28 flex flex-col p-2 text-lg border-2 border-primary"
                  onClick={() => handlePlaySound(item.letter)}
                >
                  <div className="flex-grow flex items-center justify-center">
                    <span className="text-5xl font-bold">{item.letter}</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground">{item.phonetic}</span>
                      <Volume2 className="h-5 w-5 mt-1" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
          <Link href={`/learning/${data.lang}/phonetics`} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> {data.ui.backButton}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
