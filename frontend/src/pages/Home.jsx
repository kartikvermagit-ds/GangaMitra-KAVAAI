import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  BookOpen,
  Award,
  ShieldAlert,
  Droplets,
  TreePine,
  Fish,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { Mascot } from '../components/Mascot';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      title: t('features.card1Title'),
      desc: t('features.card1Desc'),
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      link: '/chat',
    },
    {
      title: t('features.card2Title'),
      desc: t('features.card2Desc'),
      icon: Fish,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      link: '/about-ganga',
    },
    {
      title: t('features.card3Title'),
      desc: t('features.card3Desc'),
      icon: Award,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      link: '/quiz',
    },
    {
      title: t('features.card4Title'),
      desc: t('features.card4Desc'),
      icon: Droplets,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      link: '/learn',
    },
  ];

  const exploreTopics = [
    {
      title: 'Ganga River Basin',
      desc: 'Originating from Gangotri Glacier at Gaumukh, flowing 2,525 km to the Bay of Bengal.',
      icon: Droplets,
      color: 'border-ganga-200 bg-ganga-50/50',
      category: 'Ganga',
    },
    {
      title: 'River Ecology',
      desc: 'Dynamic riparian ecosystems, floodplains, and vital riverbed sediment balance.',
      icon: TreePine,
      color: 'border-emerald-200 bg-emerald-50/50',
      category: 'River Ecology',
    },
    {
      title: 'Biodiversity & Wildlife',
      desc: 'Home to the endangered Gangetic Dolphin, Gharials, Otters, and over 140 fish species.',
      icon: Fish,
      color: 'border-teal-200 bg-teal-50/50',
      category: 'Biodiversity',
    },
    {
      title: 'Pollution Control',
      desc: 'Combating untreated industrial effluent, sewage overflow, and single-use plastic waste.',
      icon: ShieldAlert,
      color: 'border-amber-200 bg-amber-50/50',
      category: 'Pollution',
    },
    {
      title: 'Water Conservation',
      desc: 'Rainwater harvesting, community afforestation, and mindful consumption along ghats.',
      icon: Droplets,
      color: 'border-cyan-200 bg-cyan-50/50',
      category: 'Water Conservation',
    },
    {
      title: 'Namami Gange Mission',
      desc: 'Rs. 20,000+ Crore flagship mission creating STPs, riverfront ghats, and mass public awareness.',
      icon: Sparkles,
      color: 'border-blue-200 bg-blue-50/50',
      category: 'Namami Gange',
    },
  ];

  const steps = [
    { num: '01', title: t('howItWorks.step1'), desc: t('howItWorks.step1Desc') },
    { num: '02', title: t('howItWorks.step2'), desc: t('howItWorks.step2Desc') },
    { num: '03', title: t('howItWorks.step3'), desc: t('howItWorks.step3Desc') },
    { num: '04', title: t('howItWorks.step4'), desc: t('howItWorks.step4Desc') },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ganga-50 via-white to-slate-50 py-12 lg:py-20 border-b border-slate-200/60">
        {/* Decorative background blobs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-ganga-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sacred-saffron/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ganga-100 border border-ganga-200 text-ganga-900 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-sacred-saffron" />
                <span>{t('hero.badge')}</span>
              </div>

              {/* Headlines */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('hero.title1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ganga-600 to-ganga-800">
                  {t('hero.title2')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/chat"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ganga-600 to-ganga-700 hover:from-ganga-700 hover:to-ganga-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-ganga-600/30 hover:shadow-xl transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('hero.btnPrimary')}</span>
                </Link>

                <Link
                  to="/about-ganga"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-sm transition-all"
                >
                  <span>{t('hero.btnSecondary')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-slate-200/80">
                <div className="bg-white/80 border border-slate-200/60 p-3 rounded-2xl text-center shadow-xs">
                  <div className="text-xs sm:text-sm font-bold text-ganga-800">2,525 km</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">River Basin</div>
                </div>
                <div className="bg-white/80 border border-slate-200/60 p-3 rounded-2xl text-center shadow-xs">
                  <div className="text-xs sm:text-sm font-bold text-emerald-700">140+ Species</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">Aquatic Fauna</div>
                </div>
                <div className="bg-white/80 border border-slate-200/60 p-3 rounded-2xl text-center shadow-xs">
                  <div className="text-xs sm:text-sm font-bold text-amber-700">NMCG Mission</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">National Flagship</div>
                </div>
              </div>
            </motion.div>

            {/* Right Mascot Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col items-center justify-center"
            >
              <div className="relative p-6 sm:p-8 bg-white/90 rounded-3xl border border-slate-200/80 shadow-xl w-full max-w-sm flex flex-col items-center">
                <Mascot
                  state="happy"
                  size="xl"
                  speechText={
                    language === 'hi'
                      ? 'नमस्ते! मैं चाचा चौधरी हूँ। माँ गंगा को स्वच्छ और अविरल बनाना हम सबका कर्तव्य है!'
                      : 'Hello friends! I am Chacha Chaudhary. Let us join hands to keep Mother Ganga clean and vibrant!'
                  }
                />

                <Link
                  to="/chat"
                  className="mt-6 w-full py-2.5 rounded-xl bg-ganga-50 hover:bg-ganga-100 text-ganga-800 border border-ganga-200 text-xs font-bold text-center transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sacred-saffron" />
                  <span>Click here to ask Chacha a question!</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. "WHAT CAN CHACHA DO?" SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              {t('features.heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t('features.subheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="group bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-ganga-300 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${item.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-ganga-600 group-hover:text-ganga-800 transition">
                    <span>Explore feature</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "EXPLORE THE GANGA" SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Explore the River Ganga
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Key educational pillars powering our knowledge-driven mascot
              </p>
            </div>
            <Link
              to="/learn"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-ganga-600 hover:text-ganga-800"
            >
              <span>View all knowledge articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreTopics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-3xl border ${topic.color} transition hover:shadow-md flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-slate-800 mb-4">
                      <Icon className="w-5 h-5 text-ganga-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{topic.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{topic.desc}</p>
                  </div>
                  <Link
                    to={`/learn?category=${encodeURIComponent(topic.category)}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ganga-700 hover:text-ganga-900"
                  >
                    <span>Read verified facts</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "HOW GANGAMITRA WORKS" PROCESS SECTION */}
      <section className="py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {t('howItWorks.heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t('howItWorks.subheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/70 relative flex flex-col items-start"
              >
                <span className="text-3xl font-extrabold text-ganga-200 mb-3">{step.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AWARENESS CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-ganga-800 via-ganga-700 to-ganga-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('ctaSection.heading')}
          </h2>
          <p className="text-sm sm:text-base text-ganga-100 max-w-2xl mx-auto leading-relaxed">
            {t('ctaSection.subheading')}
          </p>
          <div className="pt-2">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-ganga-900 hover:bg-slate-100 font-bold text-sm sm:text-base shadow-xl transition-all"
            >
              <span>{t('ctaSection.btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
