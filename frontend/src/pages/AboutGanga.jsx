import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Waves,
  Fish,
  TreePine,
  ShieldCheck,
  Sparkles,
  MapPin,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const AboutGanga = () => {
  const [pledged, setPledged] = useState(false);

  const riverStages = [
    {
      title: 'Upper Ganga (Himalayan Stretch)',
      location: 'Gangotri to Haridwar',
      desc: 'Rapid mountain streams, pristine cold-water ecosystems, home to Golden Mahseer and high dissolved oxygen levels.',
      badge: 'Origin & Alpine',
    },
    {
      title: 'Middle Ganga (Plains Stretch)',
      location: 'Haridwar to Varanasi',
      desc: 'Broad alluvial plains supporting agriculture, dense population, religious ghats, and major sewage infrastructure interventions.',
      badge: 'Agricultural Heartland',
    },
    {
      title: 'Lower Ganga & Delta',
      location: 'Varanasi to Bay of Bengal',
      desc: 'Meandering deltaic channels supporting the rich mangrove forests of Sundarbans and extensive Gangetic Dolphin populations.',
      badge: 'Delta & Mangroves',
    },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Nirmal Dhara (Clean Stream)',
      desc: 'Zero untreated sewage into the river through modern Sewage Treatment Plants (STPs) and industrial effluent monitoring.',
    },
    {
      num: '02',
      title: 'Aviral Dhara (Continuous Flow)',
      desc: 'Maintaining ecological flow (e-flow) standards across barrages to sustain river morphology and biodiversity.',
    },
    {
      num: '03',
      title: 'Jan Ganga (People-River Connect)',
      desc: 'Public awareness campaigns, youth involvement, and mascot outreach (Chacha Chaudhary) connecting citizens with conservation.',
    },
    {
      num: '04',
      title: 'Gyan Ganga (Knowledge & Research)',
      desc: 'Scientific river water monitoring, biodiversity mapping, and data-backed policy making.',
    },
    {
      num: '05',
      title: 'Arth Ganga (Economic Model)',
      desc: 'Sustainable local livelihoods through zero-budget organic farming along riverbanks, ecotourism, and ghat economies.',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-ganga-800 to-ganga-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-ganga-200 border border-white/10">
              <Waves className="w-3.5 h-3.5 text-ganga-300" />
              <span>Mother River of India</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              The Lifeline of Millions: <br />
              <span className="text-ganga-300">River Ganga</span>
            </h1>
            <p className="text-sm sm:text-base text-ganga-100 leading-relaxed">
              Spanning over 2,525 kilometers, the River Ganga sustains more than 40% of India's
              population. Rejuvenating this sacred river is an environmental, cultural, and
              economic imperative.
            </p>
          </div>
        </div>

        {/* River Journey Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              The Journey of Mother Ganga
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From the glaciers of the Himalayas to the Bay of Bengal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riverStages.map((stage, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3"
              >
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-ganga-50 text-ganga-700 border border-ganga-200">
                  {stage.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-lg leading-snug">{stage.title}</h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-sacred-saffron" />
                  <span>{stage.location}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Biodiversity Spotlights */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Endangered Biodiversity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Protecting the rich and fragile aquatic wildlife of the river ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200/70 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-base">
                <Fish className="w-5 h-5 text-emerald-600" />
                <span>Ganges River Dolphin (Susu)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                India's National Aquatic Animal. Found only in freshwater, these blind dolphins navigate
                and hunt solely through echolocation (ultrasonic clicks). Clean, unpolluted water is vital
                for their survival.
              </p>
            </div>

            <div className="bg-cyan-50/60 p-6 rounded-3xl border border-cyan-200/70 space-y-3">
              <div className="flex items-center gap-2 font-bold text-cyan-900 text-base">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
                <span>Gharial (Gavialis gangeticus)</span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-950 leading-relaxed">
                Critically endangered fish-eating crocodiles with slender snouts. They require clean river sandbanks
                for nesting and bask along undisturbed riparian stretches.
              </p>
            </div>
          </div>
        </section>

        {/* Namami Gange 5 Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              The 5 Pillars of Namami Gange
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A holistic mission framework rejuvenating India's National River
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-ganga-300">{p.num}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-2 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Citizen Ganga Guardian Pledge */}
        <section className="bg-gradient-to-r from-sacred-saffron/10 via-amber-50 to-sacred-saffron/10 rounded-3xl p-8 border border-sacred-saffron/30 text-center max-w-3xl mx-auto space-y-6">
          <Mascot state="happy" size="md" />

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Take the "Ganga Mitra" Citizen Pledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto">
            "I pledge to protect Mother Ganga by refusing single-use plastics, keeping riverbanks
            clean, conserving freshwater in daily life, and spreading river awareness in my
            school and community."
          </p>

          <div>
            <button
              onClick={() => setPledged(true)}
              disabled={pledged}
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-md ${
                pledged
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sacred-saffron hover:bg-amber-600 text-white'
              }`}
            >
              {pledged ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Pledge Taken! You are a Ganga Mitra</span>
                </>
              ) : (
                <>
                  <HeartHandshake className="w-5 h-5" />
                  <span>Take the Citizen Pledge</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
