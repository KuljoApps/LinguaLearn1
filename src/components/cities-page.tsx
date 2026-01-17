"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Building2, Users, Map, Sparkles, Calendar } from 'lucide-react';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import type { CitiesPageData } from '@/lib/cities';
import type { Language } from '@/lib/storage';

export default function CitiesPage({ data }: { data: CitiesPageData }) {
  const [displayLang, setDisplayLang] = React.useState<'pl' | 'native'>('native');
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const t = (key: keyof CitiesPageData['ui']) => {
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
  }

  const renderFactRow = (icon: React.ReactNode, label: string, value: string) => (
    <TableRow>
      <TableCell className="font-medium p-2">
        <div className="flex items-center">
          {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 text-deep-purple mr-2 shrink-0" })}
          <span>{label}</span>
        </div>
      </TableCell>
      <TableCell className="text-right p-2">{value}</TableCell>
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
        <CardHeader className="flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-4">
                <Building2 className="h-8 w-8" />
                <CardTitle className="text-3xl">{t('title')}</CardTitle>
            </div>
            <div>
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
                        <span className="mr-2 text-lg">{flagMap[data.lang]}</span> {getNativeLangName(data.lang)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDisplayLang('pl')}>
                        <span className="mr-2 text-lg">🇵🇱</span> Polski
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent className="px-0 sm:px-4 pb-0">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-lg mx-auto"
          >
            <CarouselContent>
              {data.cities.map((city, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0 h-8 w-8" />
                            <div className="text-center text-sm text-muted-foreground">
                                {current} / {count}
                            </div>
                            <CarouselNext className="relative translate-x-0 translate-y-0 right-0 top-0 h-8 w-8" />
                        </div>
                        <CardTitle className="text-center">{city.name[displayLang]}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-4 pt-0 pb-4 px-0">
                        <ScrollArea className="h-40 w-full">
                           <p className="text-sm text-muted-foreground text-justify px-4 pr-6">
                            {city.description[displayLang].replace(/ ([a-zA-Z])\s/g, ' $1\u00A0')}
                          </p>
                        </ScrollArea>
                        <div className="w-full px-4">
                          <Table>
                            <TableBody>
                              {renderFactRow(<Users />, t('population'), city.facts.population)}
                              {renderFactRow(<Map />, t('area'), city.facts.area[displayLang])}
                              {renderFactRow(<Sparkles />, t('landmark'), city.facts.landmark[displayLang])}
                              {renderFactRow(<Calendar />, t('founded'), city.facts.founded[displayLang])}
                              {renderFactRow(<Sparkles />, t('nickname'), city.facts.nickname[displayLang])}
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
        </CardContent>
        <CardFooter className="flex justify-center p-4 pt-2">
          <Link href={`/learning/${data.lang}/culture`} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('backButton')}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
