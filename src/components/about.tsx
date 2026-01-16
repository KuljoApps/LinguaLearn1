"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, FileText, Gavel } from "lucide-react";
import LinguaLearnLogo from "@/components/LinguaLearnLogo";
import { Separator } from "@/components/ui/separator";
import KuljoAppsLogo from "./KuljoAppsLogo";

export default function AboutPage() {
    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="items-center text-center">
                <LinguaLearnLogo width="48" height="48" />
                <CardTitle className="text-3xl">About LinguaLearn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
                <p className="text-muted-foreground">
                    This application is a language learning tool designed to help you expand your vocabulary through interactive quizzes.
                </p>
                <Separator />
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4">Contact the Creator</h3>
                    <div className="flex items-center gap-4">
                        <KuljoAppsLogo width={85} height={85} />
                        <div className="space-y-1 text-sm text-left">
                            <p className="font-bold">Kuljo Apps (Damian Kuliś)</p>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-deep-purple" />
                                <span>Warszawa</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4 text-deep-purple" />
                                <span>kuljo.apps@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4 text-deep-purple" />
                                <span>600 130 255</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col items-center w-full">
                    <h3 className="text-lg font-semibold mb-4">Terms and Licenses</h3>
                    <div className="grid grid-cols-2 gap-4 w-full">
                         <Link href="/settings/about/terms" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                <FileText className="mr-2 h-4 w-4 text-deep-purple" />
                                Terms
                            </Button>
                        </Link>
                        <Link href="/settings/about/licenses" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                <Gavel className="mr-2 h-4 w-4 text-deep-purple" />
                                Licenses
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center p-6">
                <Link href="/settings" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
