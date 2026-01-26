"use client";

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import { ChevronDown, Palette } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ButtonColors() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustomThemeActive, setIsCustomThemeActive] = useState(false);

    const handleToggleCustomTheme = () => {
        // This is a placeholder for future functionality.
        setIsCustomThemeActive(prev => !prev);
    };

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex items-center justify-center -mb-2">
                <Separator className="flex-grow" />
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                        <Palette className="h-4 w-4" />
                        <span className="text-sm italic text-muted-foreground">Button Design</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                </CollapsibleTrigger>
                <Separator className="flex-grow" />
            </div>
            <CollapsibleContent className="pt-4 space-y-4 text-center">
                 <p className="text-sm text-muted-foreground">Custom button themes are currently inactive.</p>
                 <Button onClick={handleToggleCustomTheme} variant={isCustomThemeActive ? "destructive" : "default"}>
                    {isCustomThemeActive ? 'Deactivate Custom Themes' : 'Activate Custom Themes'}
                 </Button>
            </CollapsibleContent>
        </Collapsible>
    );
}
