import { TELEGRAM_BOT_HANDLE, TELEGRAM_BOT_URL } from '../data/studioData';
import type { TabId } from '../types';

interface FooterProps {
  onNavigate: (tab: TabId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-16 sm:py-20">
      <div className="mx-auto max-w-[1220px] px-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="w-full md:w-auto">
            <h2 className="pointer-events-none select-none font-sans text-[12vw] font-bold leading-[0.82] tracking-tighter text-white/10 md:text-[7.5vw]">
              EXPOSURE.
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:text-right">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 md:justify-end">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#9D8EFF]"
              >
                Telegram ({TELEGRAM_BOT_HANDLE})
              </a>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="transition-colors hover:text-white"
              >
                Услуги (B2B & B2C)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="transition-colors hover:text-white"
              >
                Портфолио
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contacts')}
                className="transition-colors hover:text-white"
              >
                Контакты
              </button>
            </div>
            <p className="text-xs text-gray-600 sm:text-sm">
              © {new Date().getFullYear()} EXPOSURE Photography Studio · Челябинск.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
