import { ArrowLeft, AudioLines, CaseUpper, HelpCircle, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakePhoneticsEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <AudioLines className="h-8 w-8" />
                        <CardTitle className="text-3xl">Phonetics</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    <div data-tutorial-id="phonetics-alphabet">
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary" disabled>
                            <CaseUpper className="h-12 w-12 text-deep-purple" />
                            Alphabet
                        </Button>
                    </div>
                    <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <MessageSquareText className="h-12 w-12 text-deep-purple" />
                        Basic Expressions
                    </Button>
                    <div className="col-span-1 sm:col-span-2" data-tutorial-id="phonetics-difficult">
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary" disabled>
                            <HelpCircle className="h-12 w-12 text-deep-purple" />
                            Difficult Pronunciation
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
