"use client";

import {
    BookCopy,
    ArrowLeft,
    GraduationCap,
    Clock,
    FilePenLine,
    MessageSquareText,
    BookText,
    Landmark,
    AudioLines,
    Languages,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function FakeLearningPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="learning-card">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-center gap-4">
                        <GraduationCap className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            Learning
                        </h1>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col space-y-4 px-6 pt-2 pb-2">
                    <div data-tutorial-id="learning-question-base">
                        <Button className="w-full h-12 text-lg pointer-events-none">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Question Base
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-4" data-tutorial-id="learning-main-modules">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                            <Clock className="mr-2 h-5 w-5 text-deep-purple" />
                            Tenses
                        </Button>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                            <FilePenLine className="mr-2 h-5 w-5 text-deep-purple" />
                            General Grammar
                        </Button>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                            <MessageSquareText className="mr-2 h-5 w-5 text-deep-purple" />
                            Expressions & Phrases
                        </Button>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                            <BookText className="mr-2 h-5 w-5 text-deep-purple" />
                            Dictionary
                        </Button>
                    </div>
                    
                    <div className="py-0" data-tutorial-id="learning-extras">
                        <Collapsible open={true} className="w-full">
                            <div className="flex items-center justify-center -mb-2">
                                <Separator className="flex-grow" />
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3 pointer-events-none" data-tutorial-id="extras-trigger">
                                        <span className="text-sm italic text-muted-foreground">
                                            Extras
                                        </span>
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 rotate-180" />
                                    </Button>
                                </CollapsibleTrigger>
                                <Separator className="flex-grow" />
                            </div>

                            <CollapsibleContent>
                                <div className="grid grid-cols-2 gap-2 pt-4">
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                                        <Landmark className="mr-1 h-5 w-5 text-deep-purple" />
                                        Culture
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                                        <AudioLines className="mr-1 h-5 w-5 text-deep-purple" />
                                        Phonetics
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary pointer-events-none">
                                        <Languages className="mr-2 h-5 w-5 text-deep-purple" />
                                        Tongue Twisters
                                    </Button>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center p-6 pt-2">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
