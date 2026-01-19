import { ArrowLeft, Hash, Palette, Clock, Users, BookText, PersonStanding, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeDictionaryEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="relative flex flex-row items-center justify-center p-6">
                    <div className="flex items-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Dictionary</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4" data-tutorial-id="dictionary-grid">
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Hash className="h-12 w-12 text-deep-purple" />
                        Numbers
                    </Button>
                    <div data-tutorial-id="dictionary-colors">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                            <Palette className="h-12 w-12 text-deep-purple" />
                            Colors
                        </Button>
                    </div>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Clock className="h-12 w-12 text-deep-purple" />
                        Time
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Users className="h-12 w-12 text-deep-purple" />
                        Family
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <PersonStanding className="h-16 w-16 text-deep-purple" />
                        Body Parts
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Utensils className="h-12 w-12 text-deep-purple" />
                        Food
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Home className="h-12 w-12 text-deep-purple" />
                        Home
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary" disabled>
                        <Briefcase className="h-14 w-14 text-deep-purple" />
                        Work
                    </Button>
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
