import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const scrollToSection = (id: string) => {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const navItems = [
  { id: "top", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "crafts", label: "Our Creations" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("top")}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Mystical Makers
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("newsletter")}
            variant="hero"
            size="sm"
          >
            Stay Updated
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <SheetClose asChild key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="font-display text-lg text-foreground hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-secondary text-left"
                  >
                    {item.label}
                  </button>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button
                  onClick={() => scrollToSection("newsletter")}
                  variant="hero"
                  className="mt-2"
                >
                  Stay Updated
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
