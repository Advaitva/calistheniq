import { Link } from "wouter";
import { Dumbbell } from "lucide-react";
import { SiX, SiInstagram, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-calistheniq-charcoal py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber rounded-lg flex items-center justify-center">
                <Dumbbell className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-bold gradient-text">CalisthenIQ</span>
            </div>
          </Link>

          {/* Links and Social */}
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-calistheniq-orange transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-calistheniq-orange transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-calistheniq-orange transition-colors">
              Support
            </a>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="hover:text-calistheniq-orange transition-colors"
                aria-label="Twitter"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="hover:text-calistheniq-orange transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="hover:text-calistheniq-orange transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
          © 2024 CalisthenIQ. Built for athletes, by athletes.
        </div>
      </div>
    </footer>
  );
}
