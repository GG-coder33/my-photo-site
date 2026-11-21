import { useEffect, useState } from 'react';
import { AboutView } from './components/AboutView';
import { BookingView } from './components/BookingView';
import { ContactsView } from './components/ContactsView';
import { HomeView } from './components/HomeView';
import { Lightbox } from './components/Lightbox';
import { NewsView } from './components/NewsView';
import { PortfolioView } from './components/PortfolioView';
import { ServicesView } from './components/ServicesView';
import { Sidebar } from './components/Sidebar';
import { DEFAULT_NEWS, DEFAULT_PORTFOLIO } from './data/studioData';
import type { NewsItem, PortfolioItem, TabId } from './types';

const STORAGE_KEYS = {
  portfolio: 'exposure_portfolio_v1',
  news: 'exposure_news_v1',
};

function loadStoredArray<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() =>
    loadStoredArray(STORAGE_KEYS.portfolio, DEFAULT_PORTFOLIO)
  );
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() =>
    loadStoredArray(STORAGE_KEYS.news, DEFAULT_NEWS)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.portfolio,
        JSON.stringify(portfolioItems)
      );
    } catch {
      // Ignore quota errors
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(newsItems));
    } catch {
      // Ignore quota errors
    }
  }, [newsItems]);

  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPhoto = (item: PortfolioItem) => {
    setPortfolioItems((prev) => [item, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
    setLightboxIndex(null);
  };

  const handleAddNews = (item: NewsItem) => {
    setNewsItems((prev) => [item, ...prev]);
  };

  const handleDeleteNews = (id: string) => {
    setNewsItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#141414] lg:flex">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1220px]">
          {activeTab === 'home' && (
            <HomeView
              portfolioItems={portfolioItems}
              onNavigate={handleNavigate}
              onOpenLightbox={(index) => setLightboxIndex(index)}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView onNavigate={handleNavigate} />
          )}

          {activeTab === 'news' && (
            <NewsView
              newsItems={newsItems}
              onAddNews={handleAddNews}
              onDeleteNews={handleDeleteNews}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView
              items={portfolioItems}
              onAddPhoto={handleAddPhoto}
              onDeletePhoto={handleDeletePhoto}
              onOpenLightbox={(index) => setLightboxIndex(index)}
            />
          )}

          {activeTab === 'booking' && <BookingView />}

          {activeTab === 'about' && <AboutView onNavigate={handleNavigate} />}

          {activeTab === 'contacts' && <ContactsView />}
        </div>
      </main>

      <Lightbox
        items={portfolioItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}

export default App;
