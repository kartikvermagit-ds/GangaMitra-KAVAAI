import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BookOpen, Award, Info, Home, Menu, X, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.talkToChacha'), path: '/chat', icon: MessageSquare },
    { name: t('nav.learn'), path: '/learn', icon: BookOpen },
    { name: t('nav.quiz'), path: '/quiz', icon: Award },
    { name: t('nav.aboutGanga'), path: '/about-ganga', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ganga-700 to-ganga-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl">🌊</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Ganga<span className="text-ganga-600">Mitra</span>
                </span>
                <span className="bg-sacred-saffron/15 text-amber-900 border border-sacred-saffron/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  SIH1290
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Chacha Chaudhary AI Avatar
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-ganga-50 text-ganga-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar (Language Toggle + Primary CTA) */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition border border-slate-200"
              title="Switch Language (English / हिंदी)"
            >
              <Globe className="w-3.5 h-3.5 text-ganga-600" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Primary CTA */}
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-ganga-600 to-ganga-700 hover:from-ganga-700 hover:to-ganga-800 text-white text-xs font-semibold shadow-md shadow-ganga-600/20 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-sacred-saffron" />
              <span>{t('nav.cta')}</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium ${
                  active
                    ? 'bg-ganga-50 text-ganga-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-ganga-600" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3">
            <Link
              to="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-ganga-600 text-white text-sm font-semibold shadow-md"
            >
              <Sparkles className="w-4 h-4 text-sacred-saffron" />
              <span>{t('nav.cta')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
