import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/demo", label: "Demo" },
    { href: "/progress", label: "Progress" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber rounded-lg flex items-center justify-center">
                <Dumbbell className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold gradient-text">CalisthenIQ</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-calistheniq-orange transition-colors ${
                  isActive(item.href) ? "text-calistheniq-orange" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/onboarding">
              <Button className="btn-primary px-6 py-2 rounded-full font-semibold">
                Start Training
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-700"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg hover:text-calistheniq-orange transition-colors ${
                      isActive(item.href) ? "text-calistheniq-orange" : "text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/onboarding">
                  <Button 
                    className="btn-primary w-full py-2 rounded-full font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start Training
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
