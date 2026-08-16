import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Waves, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌊</span>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Ganga<span className="text-ganga-400">Mitra</span>
              </span>
              <span className="bg-ganga-500/20 text-ganga-300 border border-ganga-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                SIH1290
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              AI, ML and Chatbot-powered Interactive Robot Mascot (Chacha Chaudhary) and digital
              avatar to strengthen the river people connect component of Namami Gange.
            </p>
            <div className="flex items-center gap-2 text-xs text-ganga-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dedicated to River Ganga Rejuvenation & Biodiversity Protection</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-ganga-300 transition">Home</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-ganga-300 transition">Talk to Chacha</Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-ganga-300 transition">Knowledge Hub</Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-ganga-300 transition">Interactive Quiz</Link>
              </li>
              <li>
                <Link to="/about-ganga" className="hover:text-ganga-300 transition">About River Ganga</Link>
              </li>
            </ul>
          </div>

          {/* Namami Gange Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Official Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://nmcg.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ganga-300 transition inline-flex items-center gap-1"
                >
                  <span>National Mission for Clean Ganga</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://jalshakti.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ganga-300 transition inline-flex items-center gap-1"
                >
                  <span>Ministry of Jal Shakti</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">Ganges River Dolphin Conservation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} GangaMitra-KAVAAI. Built for Smart India Hackathon.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by AI & Dedicated to Mother Ganga</span>
            <Waves className="w-3.5 h-3.5 text-ganga-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
