"use client"

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
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { getTutorialState } from "@/lib/storage";
import { cn } from "@/lib/utils";

const EXTRAS_COLLAPSIBLE_STATE_KEY = "linguaLearnExtrasOpen";

export default function LearningEnPage() {
    const [isExtrasOpen, setIsExtrasOpen] = useState(false);
    const [isExtrasTutorialActive, setIsExtrasTutorialActive] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem(EXTRAS_COLLAPSIBLE_STATE_KEY);
        if (savedState === "true") {
            setIsExtrasOpen(true);
        }

        const handleTutorialUpdate = () => {
            const tutorialState = getTutorialState();
            const isOnExtrasStep =
                tutorialState?.isActive &&
                tutorialState.stage === "extended" &&
                tutorialState.step === 9; // Index for "learning-extras"
            setIsExtrasTutorialActive(!!isOnExtrasStep);
        };

        handleTutorialUpdate();
        window.addEventListener("tutorial-state-changed", handleTutorialUpdate);

        return () => {
            window.removeEventListener("tutorial-state-changed", handleTutorialUpdate);
        };
    }, []);

    const handleExtrasOpenChange = (open: boolean) => {
        setIsExtrasOpen(open);
        localStorage.setItem(EXTRAS_COLLAPSIBLE_STATE_KEY, JSON.stringify(open));
    };

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
                    <Link href="/learning/en/questions" data-tutorial-id="learning-question-base">
                        {/* TUTORIAL FOCUS SIZE: This button's dimensions (h-12) define the focus area for the 'Question Base' step. */}
                        <Button className="w-full h-12 text-lg">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Question Base
                        </Button>
                    </Link>

                    <Link href="/learning/en/tenses" data-tutorial-id="learning-main-modules">
                        {/* TUTORIAL FOCUS SIZE: This button's dimensions (h-12) define the focus area for the 'Main Modules' step. */}
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Clock className="mr-2 h-5 w-5 text-deep-purple" />
                            Tenses
                        </Button>
                    </Link>

                    <Link href="/learning/en/grammar">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <FilePenLine className="mr-2 h-5 w-5 text-deep-purple" />
                            General Grammar
                        </Button>
                    </Link>

                    <Link href="/learning/en/phrases">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <MessageSquareText className="mr-2 h-5 w-5 text-deep-purple" />
                            Expressions & Phrases
                        </Button>
                    </Link>

                    <Link href="/learning/en/dictionary">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookText className="mr-2 h-5 w-5 text-deep-purple" />
                            Dictionary
                        </Button>
                    </Link>
                    
                    {/* TUTORIAL FOCUS SIZE: This div's padding (py-0 or py-6) defines the focus area for the 'Extras' step. */}
                    <div className={cn({ 'py-6': isExtrasTutorialActive, 'py-0': !isExtrasTutorialActive })} data-tutorial-id="learning-extras">
                        <Collapsible
                            open={isExtrasOpen}
                            onOpenChange={handleExtrasOpenChange}
                            className="w-full"
                        >
                            <div className="flex items-center justify-center -mb-2">
                                <Separator className="flex-grow" />
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3" data-tutorial-id="extras-trigger">
                                        <span className="text-sm italic text-muted-foreground">
                                            Extras
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                isExtrasOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </Button>
                                </CollapsibleTrigger>
                                <Separator className="flex-grow" />
                            </div>

                            <CollapsibleContent className="pt-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <Link href="/learning/en/culture">
                                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                            <Landmark className="mr-1 h-5 w-5 text-deep-purple" />
                                            Culture
                                        </Button>
                                    </Link>

                                    <Link href="/learning/en/phonetics">
                                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                            <AudioLines className="mr-1 h-5 w-5 text-deep-purple" />
                                            Phonetics
                                        </Button>
                                    </Link>
                                </div>

                                <div className="mt-4">
                                    <Link href="/learning/en/tongue-twisters">
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 text-lg border-2 border-primary"
                                        >
                                            <Languages className="mr-2 h-5 w-5 text-deep-purple" />
                                            Tongue Twisters
                                        </Button>
                                    </Link>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center p-6 pt-2">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
