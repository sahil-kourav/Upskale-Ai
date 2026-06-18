import { Link } from "react-router";
import { PencilSparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="max-w-lg">
            
            <Link to="/" className="inline-flex items-center group">
              {/* Logo */}
              <div className="flex items-center justify-center transition mr-2 group-hover:scale-105">
                <PencilSparkles className="w-5 h-5" />
              </div>

              <div>
                <p className="text-gray-300 text-lg font-semibold tracking-tight">
                  Upskale AI
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-4 text-sm leading-5 text-[#8b93a7]">
              Transform your resume into a personalized interview roadmap with
              AI-powered analysis, skill insights, and preparation guidance.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              "Home",
              "About Us",
              "Contect Us",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[#8787a5] hover:text-[#d7d7e5] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
