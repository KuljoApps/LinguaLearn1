"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Landmark, MapPin, Calendar, Palette, Users } from 'lucide-react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MonumentsPageData } from '@/lib/monuments';
import type { Language } from '@/lib/storage';

export default function MonumentsPage({ data }: { data: MonumentsPageData }) {
  const [displayLang, setDisplayLang] = React.useState<'pl' | 'native'>('native');
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const t = (key: keyof MonumentsPageData['ui']) => {
    const texts = data.ui[key];
    return texts[displayLang];
  };

  const getNativeLangName = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'de': return 'Deutsch';
      case 'fr': return 'Français';
      case 'it': return 'Italiano';
      case 'es': return 'Español';
      default: return 'Language';
    }
  };

  const renderFactRow = (
    icon: React.ReactElement<{ className?: string }>,
    label: string,
    value: string
  ) => (
    <TableRow>
      <TableCell className="font-medium py-2 pr-2 pl-0">
        <div className="flex items-center">
          {React.cloneElement(icon, {
            className: "h-4 w-4 text-deep-purple mr-2 shrink-0",
          })}
          <span>{label}</span>
        </div>
      </TableCell>
      <TableCell className="text-right py-2 pr-0.5 pl-0">
        {value}
      </TableCell>
    </TableRow>
  );

  const flagMap: Record<Language, string> = {
    en: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    de: '🇩🇪',
    fr: '🇫🇷',
    it: '🇮🇹',
    es: '🇪🇸',
  };

  const displayedFlag = displayLang === 'native' ? flagMap[data.lang] : '🇵🇱';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-4">
            <Landmark className="h-8 w-8" />
            <CardTitle className="text-3xl">{t('title')}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-1 rounded-md">
                <div className="flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background">
                  <span className="text-xl">{displayedFlag}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDisplayLang('native')}>
                <span className="mr-2 text-lg">{flagMap[data.lang]}</span>
                {getNativeLangName(data.lang)}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDisplayLang('pl')}>
                <span className="mr-2 text-lg">🇵🇱</span>
                Polski
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full px-3"
        >
          <CarouselContent className="-ml-1">
            {data.monuments.map((monument, index) => (
              <CarouselItem key={index} className="pl-1">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0 h-8 w-8" />
                        <div className="text-center text-sm text-muted-foreground">
                          {current} / {count}
                        </div>
                        <CarouselNext className="relative translate-x-0 translate-y-0 right-0 top-0 h-8 w-8" />
                      </div>
                      <CardTitle className="text-center">{monument.name[displayLang]}</CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 pt-2 pb-3 flex flex-col">
                      <ScrollArea className="flex-grow w-full pr-1 mb-3">
                        <p className="text-sm text-muted-foreground text-justify">
                          {monument.description[displayLang].replace(
                            / ([a-zA-Z])\s/g,
                            ' $1\u00A0'
                          )}
                        </p>
                      </ScrollArea>

                      <div className="mt-0">
                        <Table>
                          <TableBody>
                            {renderFactRow(<MapPin />, t('location'), monument.facts.location[displayLang])}
                            {renderFactRow(<Calendar />, t('year'), monument.facts.year[displayLang])}
                            {renderFactRow(<Palette />, t('style'), monument.facts.style[displayLang])}
                            {renderFactRow(<Users />, t('annualVisitors'), monument.facts.annualVisitors[displayLang])}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <CardFooter className="flex justify-center p-4 pt-3">
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
