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
      className="h-9 w-9 text-[#141414]"
    >
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M24 5L29.5 20.5H43"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5 14.5L26 24L33.5 40.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 40.5L21 27.5L7.5 33.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 33.5L18.5 21.5L14.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="5" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Sidebar({
  activeTab,
  onSelectTab,
  mobileMenuOpen,
  onToggleMobileMenu,
}: SidebarProps) {
  const handleSelect = (tab: TabId) => {
    onSelectTab(tab);
    if (mobileMenuOpen) {
      onToggleMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile compact header (<= 15% viewport height) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E8E8E8] bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <ApertureLogo />
          <span className="font-editorial text-2xl font-medium tracking-[0.08em] text-[#141414] whitespace-nowrap">
            EXPOSURE
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelect('booking')}
            className="rounded-full bg-[#141414] px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B]"
          >
            Записаться
          </button>
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#141414] transition-colors hover:bg-[#F5F5F5]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Sidebar rail */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[256px] shrink-0 flex-col justify-between border-r border-[#E8E8E8] bg-white px-5 py-7 transition-transform duration-200 lg:static lg:z-auto lg:w-[244px] lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand block */}
          <div className="flex items-center justify-between lg:justify-center">
            <button
              type="button"
              onClick={() => handleSelect('home')}
              className="flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
            >
              <ApertureLogo />
              <span className="mt-2 font-editorial text-[26px] font-medium tracking-[0.08em] leading-none text-[#141414]">
                EXPOSURE
              </span>
              <span className="mt-1.5 text-[9.5px] font-medium tracking-[0.22em] text-[#666666]">
                PHOTOGRAPHY STUDIO
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label="Закрыть меню"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#555555] hover:bg-[#F5F5F5] lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="my-6 h-px w-full bg-[#EBEBEB]" />

          {/* Navigation tabs */}
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
                  className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] ${
                    isActive
                      ? 'bg-[#141414] text-white'
                      : 'text-[#333333] hover:bg-[#F3F3F3] hover:text-[#141414]'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#555555]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom socials & tagline */}
        <div className="pt-6">
          <div className="mb-5 h-px w-full bg-[#EBEBEB]" />

          <div className="flex items-center justify-center gap-3">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram-бот @photoguuuy_bot"
              title="Telegram: @photoguuuy_bot"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#141414] transition-colors hover:bg-[#F2F2F2]"
            >
              <Send className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => handleSelect('contacts')}
              aria-label="Перейти к контактам"
              title="Контакты"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#141414] transition-colors hover:bg-[#F2F2F2]"
            >
              <Mail className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleSelect('portfolio')}
              aria-label="Перейти в портфолио"
              title="Портфолио"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#141414] transition-colors hover:bg-[#F2F2F2]"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 text-[11px] leading-relaxed text-[#737373]">
            <div className="flex items-center gap-2">
              <span>Capture</span>
              <span className="h-px flex-1 bg-[#DCDCDC]" />
            </div>
            <p className="mt-0.5">more than just a moment.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
