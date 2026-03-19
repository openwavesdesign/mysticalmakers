import { useState } from "react";
import { Sparkles, Heart, Palette, Gift, Star, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import heroCrafts from "@/assets/hero-crafts.jpg";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? `HTTP ${response.status}`);
      }
      toast({
        title: "Almost there!",
        description: "Check your email and click the confirmation link to complete your subscription.",
      });
      setEmail("");
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 paper-texture pointer-events-none" />
        <div className="section-container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">Made with love by our family</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-balance">
                Creative Crafts Made by Kids, with <span className="text-primary">Love</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Fun, colorful, and handmade crafts from Mystical Makers. Each piece is made with imagination, creativity, and lots of heart!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => scrollToSection("about")}>
                  <Palette className="w-5 h-5" />
                  Meet Our Creators
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection("newsletter")}>
                  <Mail className="w-5 h-5" />
                  Stay Updated
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 via-secondary/30 to-lavender/30 rounded-3xl blur-2xl" />
              <img src={heroCrafts} alt="Colorful handmade crafts by the Allen family kids" className="relative rounded-3xl shadow-craft-hover w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-4 -right-4 bg-accent rounded-2xl p-4 shadow-playful animate-bounce-soft">
                <Star className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="bg-secondary/30 relative">
        <div className="absolute inset-0 paper-texture pointer-events-none" />
        <div className="section-container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-lavender rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-lavender-foreground" />
              <span className="text-sm font-medium text-lavender-foreground">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Meet Our Creators
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Mystical Makers is run by four creative kids: Lydia, Evelyn (aka "Ev the Yarn Dragon"), 
              Sparrow, and Hazel. Each one brings their own unique talents—from crochet animals to friendship 
              bracelets to finger crochet snakes!
            </p>
            
            {/* Kids Preview */}
            <div className="flex justify-center gap-4 pt-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">🐕</div>
              <div className="w-16 h-16 rounded-full bg-lavender/40 flex items-center justify-center text-2xl">🐉</div>
              <div className="w-16 h-16 rounded-full bg-accent/40 flex items-center justify-center text-2xl">🐍</div>
              <div className="w-16 h-16 rounded-full bg-sky/40 flex items-center justify-center text-2xl">🐱</div>
            </div>

            <Button variant="hero" size="lg" onClick={() => scrollToSection("crafts")}>
              <Heart className="w-5 h-5" />
              See Our Creations
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Crafts Section */}
      <section id="crafts" className="relative">
        <div className="absolute inset-0 paper-texture pointer-events-none" />
        <div className="section-container py-16 md:py-24">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-sky rounded-full px-4 py-2">
              <Gift className="w-4 h-4 text-sky-foreground" />
              <span className="text-sm font-medium text-sky-foreground">Our Creations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Featured Crafts
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse some of our favorite handmade creations. Custom requests welcome!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="craft-card group">
              <div className="aspect-square overflow-hidden">
                <img alt="Handmade greeting cards" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/lovable-uploads/3362d692-f8cf-41e8-9826-71082405f743.jpg" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-display text-xl font-semibold text-foreground">Crochet Animals </h3>
                <p className="text-muted-foreground">​Adopt a handmade crochet octopus, duck, bee, or emotional support pickle!                 </p>
              </div>
            </div>
            
            <div className="craft-card group">
              <div className="aspect-square overflow-hidden">
                <img alt="Kids' paintings and art" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/lovable-uploads/72bd42d5-8556-419f-aeff-ab841f151310.jpg" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-display text-xl font-semibold text-foreground">Clothing and Jewelry </h3>
                <p className="text-muted-foreground">​Get matching friendship bracelets for you and your dolls or unique clothing items and accessories.                   </p>
              </div>
            </div>
            
            <div className="craft-card group">
              <div className="aspect-square overflow-hidden">
                <img alt="Handmade bracelets and keychains" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/lovable-uploads/dd003485-f951-4e5d-b115-c5be60bfeaa4.jpg" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-display text-xl font-semibold text-foreground">Pens and Journals    </h3>
                <p className="text-muted-foreground">Each one is uniquely handmade by one of our kids. </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="inline-flex items-center gap-2 bg-accent/30 rounded-full px-6 py-3 font-display font-medium text-foreground">
              <Sparkles className="w-5 h-5 text-primary" />
              Custom requests welcome! Let us create something special for you.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      

      {/* Newsletter Section */}
      <section id="newsletter" className="bg-sky/20 relative">
        <div className="absolute inset-0 paper-texture pointer-events-none" />
        <div className="section-container py-16 md:py-20">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky rounded-full px-4 py-2">
              <Mail className="w-4 h-4 text-sky-foreground" />
              <span className="text-sm font-medium text-sky-foreground">Stay Updated</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Join Our Newsletter!
            </h2>
            <p className="text-muted-foreground text-lg">
              Be the first to know about our upcoming markets, new craft creations, and family news!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1 bg-background border-border rounded-full px-5 h-12" />
              <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="rounded-full">
                <Send className="w-4 h-4" />
                {isSubmitting ? "Joining..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground">
              We promise not to spam you—just crafty goodness! ✨
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="section-container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-lg font-semibold block">Mystical Makers</span>
                <span className="text-sm text-background/70">Handmade with love by Mystical Makers</span>
              </div>
            </div>
            
            <nav className="flex items-center gap-6 text-background/80">
              <button onClick={() => scrollToSection("about")} className="hover:text-accent transition-colors text-sm">About Us</button>
              <button onClick={() => scrollToSection("crafts")} className="hover:text-accent transition-colors text-sm">Our Creations</button>
              <button onClick={() => scrollToSection("newsletter")} className="hover:text-accent transition-colors text-sm">Stay Updated</button>
            </nav>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} Mystical Makers. Made with ❤️ by our family.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;