import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageSquare } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 min-h-[60vh]">
      <Mascot state="thinking" size="lg" />

      <h1 className="text-4xl font-extrabold text-slate-900 mt-6 mb-2">404 - Lost on the River?</h1>
      <p className="text-sm text-slate-600 max-w-md mb-8">
        Chacha Chaudhary says this page seems to have flowed downstream. Let's guide you back to
        the main ghat!
      </p>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ganga-600 hover:bg-ganga-700 text-white font-semibold text-xs shadow-md transition"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs shadow-sm transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Talk to Chacha</span>
        </Link>
      </div>
    </div>
  );
};
