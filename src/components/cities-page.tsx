"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Building2, Users, Map, Landmark } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CitiesPageData, CityData } from '@/lib/cities';

export default function CitiesPage({ data }: { data: CitiesPageData }) {
  const [displayLang, setDisplayLang] = React.useState<'pl' | 'native'>('native');

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
          {icon}
          <span className="ml-2">{label}</span>
        </div>
      </TableCell>
      <TableCell className="text-right p-2">{value}</TableCell>
    </TableRow>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Building2 className="h-8 w-8" />
                    <CardTitle className="text-3xl">{t('title')}</CardTitle>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto p-1 rounded-md">
                        <div className="flex items-center gap-2">
                            <span className="text-sm underline text-primary/80">{t('language')}</span>
                            <div className="flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background">
                                <span className="text-xl">{displayLang === 'native' ? {en: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹', es: '🇪🇸'}[data.lang] : '🇵🇱'}</span>
                            </div>
                        </div>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setDisplayLang('native')}>
                        <span className="mr-2 text-lg">{{en: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹', es: '🇪🇸'}[data.lang]}</span> {getNativeLangName(data.lang)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDisplayLang('pl')}>
                        <span className="mr-2 text-lg">🇵🇱</span> Polski
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-xl mx-auto"
          >
            <CarouselContent>
              {data.cities.map((city, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="p-1">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-center">{city.name[displayLang]}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-4 p-4 pt-0">
                        <Image
                          src={`https://picsum.photos/seed/${city.imageHint.replace(/\s/g, '')}/600/400`}
                          alt={`Image of ${city.name.native}`}
                          width={600}
                          height={400}
                          className="rounded-lg object-cover aspect-[3/2] w-full"
                          data-ai-hint={city.imageHint}
                        />
                        <p className="text-sm text-muted-foreground text-justify h-24 overflow-y-auto">
                          {city.description[displayLang]}
                        </p>
                        <Table>
                          <TableBody>
                            {renderFactRow(<Users className="h-4 w-4 text-deep-purple"/>, t('population'), city.facts.population)}
                            {renderFactRow(<Map className="h-4 w-4 text-deep-purple"/>, t('area'), city.facts.area[displayLang])}
                            {renderFactRow(<Landmark className="h-4 w-4 text-deep-purple"/>, t('landmark'), city.facts.landmark[displayLang])}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
        <CardFooter className="flex justify-center p-4">
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
