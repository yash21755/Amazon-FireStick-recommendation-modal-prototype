import { HeroHighlight, Highlight } from "./ui/hero-highlight.jsx";

export function HeroHighlightDemo({ children }) {
    return (
        <HeroHighlight containerClassName="min-h-screen w-full flex items-center justify-center">
            <div className="flex flex-col gap-6 text-center w-full h-full">
                {children}
            </div>
        </HeroHighlight>
    );
}