import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { KnowledgeCard } from '../components/KnowledgeCard';
import { LoadingStateView, ErrorStateView, EmptyStateView } from '../components/StateViews';
import { fetchKnowledge } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const categories = [
    'All',
    'Ganga',
    'Namami Gange',
    'River Ecology',
    'Pollution',
    'Biodiversity',
    'Water Conservation',
    'Awareness',
  ];

  // Default fallback articles in case backend database is freshly initiated
  const defaultFallbackArticles = [
    {
      id: 'fallback-1',
      title: 'What is the Namami Gange Programme?',
      content:
        'Namami Gange Programme is an Integrated Conservation Mission approved as a Flagship Programme by the Union Government in June 2014 with an outlay of Rs. 20,000 Crore to accomplish effective abatement of pollution and conservation of River Ganga.',
      category: 'Namami Gange',
      source: 'National Mission for Clean Ganga (NMCG)',
      language: 'en',
    },
    {
      id: 'fallback-2',
      title: 'Ganges River Dolphin: National Aquatic Animal',
      content:
        'The Ganges River Dolphin (Platanista gangetica) is practically blind and hunts using echolocation. Declared India\'s National Aquatic Animal in 2009, it is a crucial indicator of the health of the entire river ecosystem.',
      category: 'Biodiversity',
      source: 'Wildlife Institute of India',
      language: 'en',
    },
    {
      id: 'fallback-3',
      title: 'Sewage Treatment Plants (STPs) & River Cleanliness',
      content:
        'Sewage infrastructure projects under Namami Gange prevent millions of liters of untreated municipal sewage from entering the river in key cities like Varanasi, Kanpur, and Prayagraj.',
      category: 'Pollution',
      source: 'Central Pollution Control Board',
      language: 'en',
    },
    {
      id: 'fallback-4',
      title: 'Afforestation and Riparian Buffer Zones',
      content:
        'Planting native trees along the banks of River Ganga stabilizes riverbanks, prevents siltation, enhances groundwater recharge, and preserves native wildlife habitats.',
      category: 'River Ecology',
      source: 'Forest Research Institute',
      language: 'en',
    },
  ];

  const loadArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await fetchKnowledge(params);
      if (res && res.articles && res.articles.length > 0) {
        setArticles(res.articles);
      } else {
        // If DB returned empty, filter fallbacks for seamless demo
        const filtered = defaultFallbackArticles.filter((a) => {
          const matchCat = selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
          const matchSearch =
            !searchQuery.trim() ||
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.content.toLowerCase().includes(searchQuery.toLowerCase());
          return matchCat && matchSearch;
        });
        setArticles(filtered);
      }
    } catch (err) {
      console.warn('Knowledge fetch warning:', err.message);
      // Use fallback articles if backend isn't populated
      const filtered = defaultFallbackArticles.filter((a) => {
        const matchCat = selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchSearch =
          !searchQuery.trim() ||
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      });
      setArticles(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadArticles();
  };

  return (
    <div className="flex-1 bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ganga-100 text-ganga-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-ganga-600" />
            <span>Ganga Knowledge Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Discover the Ganga
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Explore authentic facts, river ecology, biodiversity guides, and Namami Gange
            initiatives.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. Dolphin, STPs, Biodiversity, Pollution)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-ganga-500 focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-ganga-600 hover:bg-ganga-700 text-white rounded-2xl text-sm font-semibold transition shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-ganga-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingStateView text="Fetching Namami Gange knowledge articles..." />
        ) : error ? (
          <ErrorStateView message={error} onRetry={loadArticles} />
        ) : articles.length === 0 ? (
          <EmptyStateView
            title="No knowledge articles found"
            message={`No articles match your search criteria in category "${selectedCategory}".`}
            actionLabel="Reset Filters"
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <KnowledgeCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
