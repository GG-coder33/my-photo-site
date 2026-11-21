import {
  Calendar,
  Camera,
  Home,
  Image as ImageIcon,
  Mail,
  Menu,
  Newspaper,
  Send,
  User,
  X,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { TELEGRAM_BOT_URL } from '../data/studioData';
import type { TabId } from '../types';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  scrolled?: boolean;
}

interface NavItem {
  id: TabId;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'services', label: 'Услуги', icon: Camera },
  { id: 'news', label: 'Новости', icon: Newspaper },
  { id: 'portfolio', label: 'Портфолио', icon: ImageIcon },
  { id: 'booking', label: 'Запись на съёмку', icon: Calendar },
  { id: 'about', label: 'Обо мне', icon: User },
  { id: 'contacts', label: 'Контакты', icon: Mail },
];

function ApertureLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 text-[#ffe0e0]"
    >
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 5L29.5 20.5H43"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5 14.5L26 24L33.5 40.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 40.5L21 27.5L7.5 33.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 33.5L18.5 21.5L14.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="24"
        cy="24"
        r="5"
        fill="#050505"
        stroke="#9D8EFF"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Sidebar({
  activeTab,
  onSelectTab,
  mobileMenuOpen,
  onToggleMobileMenu,
  scrolled = false,
}: SidebarProps) {
  const handleSelect = (tab: TabId) => {
    onSelectTab(tab);
    if (mobileMenuOpen) {
      onToggleMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile sticky top bar with scroll blur transition */}
      <header
        className={`sticky top-0 z-30 flex items-center justify-between px-4 transition-all duration-500 lg:hidden ${
          scrolled
            ? 'border-b border-white/10 bg-[#050505]/85 py-3 backdrop-blur-md'
            : 'border-b border-white/5 bg-[#050505] py-4'
        }`}
      >
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8EFF]"
        >
          <ApertureLogo />
          <span className="font-editorial text-2xl font-medium tracking-tight text-white whitespace-nowrap">
            EXPOSURE.
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelect('booking')}
            className="rounded-full bg-[#9D8EFF] px-4 py-2 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-transform hover:scale-105"
          >
            Записаться
          </button>
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Left Corner Sticky Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[256px] shrink-0 flex-col justify-between border-r border-white/10 bg-[#080808]/95 px-5 py-7 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-[244px] lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between lg:justify-center">
            <button
              type="button"
              onClick={() => handleSelect('home')}
              className="flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8EFF]"
            >
              <ApertureLogo />
              <span className="mt-2 font-editorial text-[26px] font-medium tracking-tight leading-none text-white">
                EXPOSURE.
              </span>
              <span className="mt-1.5 text-[9.5px] font-medium tracking-[0.22em] text-white/45">
                PHOTOGRAPHY STUDIO
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label="Закрыть меню"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="my-6 h-px w-full bg-white/10" />

          <nav aria-label="Основная навигация" className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8EFF] ${
                    isActive
                      ? 'bg-[#9D8EFF] font-semibold text-black shadow-[0_0_24px_rgba(157,142,255,0.35)]'
                      : 'text-white/65 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? 'text-black' : 'text-white/50'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6">
          <div className="mb-5 h-px w-full bg-white/10" />

          <div className="flex items-center justify-center gap-3">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram-бот @photoguuuy_bot"
              title="Telegram: @photoguuuy_bot"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:border-[#9D8EFF] hover:bg-[#9D8EFF] hover:text-black"
            >
              <Send className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => handleSelect('contacts')}
              aria-label="Перейти к контактам"
              title="Контакты"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleSelect('portfolio')}
              aria-label="Перейти в портфолио"
              title="Портфолио"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 text-[11px] leading-relaxed text-white/40">
            <div className="flex items-center gap-2">
              <span>Челябинск</span>
              <span className="h-px flex-1 bg-white/15" />
            </div>
            <p className="mt-0.5">Capture · Create · Inspire</p>
          </div>
        </div>
      </aside>
    </>
  );
}
