"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Map, Users, Wallet, Landmark } from 'lucide-react';
import Link from 'next/link';

export interface AboutCountryData {
  countryName: { pl: string; native: string; };
  countryCode: string;
  nativeLangCode: 'en' | 'de' | 'fr' | 'it' | 'es';
  flag: { pl: string; native: string; };
  backLink: string;
  ui: {
    title: { pl: string; native: string; };
    description: { pl: string; native: string; };
    factsTitle: { pl: string; native: string; };
    capital: { pl: string; native: string; };
    population: { pl: string; native: string; };
    area: { pl: string; native: string; };
    currency: { pl: string; native: string; };
    funFactsTitle: { pl: string; native: string; };
    funFacts: { pl: string[]; native: string[]; };
    backButton: { pl: string; native: string; };
  };
  stats: {
    capital: { pl: string; native: string; };
    population: string;
    area: string;
    currency: { pl: string; native: string; };
  };
}

interface AboutCountryPageProps {
  data: AboutCountryData;
}

export default function AboutCountryPage({ data }: AboutCountryPageProps) {
  const [displayLang, setDisplayLang] = useState<'pl' | 'native'>('native');

  const t = (key: keyof AboutCountryData['ui']) => {
    return data.ui[key][displayLang];
  };

  const getStat = (key: keyof AboutCountryData['stats']) => {
    const stat = data.stats[key];
    if (typeof stat === 'object' && stat !== null && !Array.isArray(stat)) {
      return stat[displayLang];
    }
    return stat;
  };

  const getFunFacts = () => {
    return data.ui.funFacts[displayLang];
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="relative text-center">
          <CardTitle className="text-3xl">{t('title')}</CardTitle>
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <span className="text-2xl">{displayLang === 'native' ? data.flag.native : data.flag.pl}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setDisplayLang('native')}>
                  <span className="mr-2 text-lg">{data.flag.native}</span> {data.countryName.native}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDisplayLang('pl')}>
                  <span className="mr-2 text-lg">{data.flag.pl}</span> {data.countryName.pl}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={`https://picsum.photos/seed/${data.countryCode}/300/300`}
                alt={`Map of ${data.countryName.native}`}
                width={250}
                height={250}
                className="rounded-full border-4 border-primary/20 object-cover shadow-lg"
                data-ai-hint={`map ${data.countryName.native.toLowerCase()}`}
              />
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              {t('description')}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-center text-lg font-semibold">{t('factsTitle')}</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium"><Landmark className="mr-2 inline h-4 w-4 text-deep-purple" />{t('capital')}</TableCell>
                  <TableCell className="text-right">{getStat('capital')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><Users className="mr-2 inline h-4 w-4 text-deep-purple" />{t('population')}</TableCell>
                  <TableCell className="text-right">{getStat('population')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><Map className="mr-2 inline h-4 w-4 text-deep-purple" />{t('area')}</TableCell>
                  <TableCell className="text-right">{getStat('area')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><Wallet className="mr-2 inline h-4 w-4 text-deep-purple" />{t('currency')}</TableCell>
                  <TableCell className="text-right">{getStat('currency')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2">
            <h3 className="text-center text-lg font-semibold">{t('funFactsTitle')}</h3>
            <ul className="list-inside list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {getFunFacts().map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-4">
          <Link href={data.backLink} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('backButton')}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}