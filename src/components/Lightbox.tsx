import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PortfolioItem } from '../types';

interface LightboxProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items.length, onClose, onChangeIndex]);

  if (activeIndex === null || !items[activeIndex]) {
    return null;
  }

  const current = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((activeIndex - 1 + items.length) % items.length);
            }}
            aria-label="Предыдущая фотография"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((activeIndex + 1) % items.length);
            }}
            aria-label="Следующая фотография"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        className="flex max-h-[90vh] max-w-4xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-white/85">
          <span className="font-editorial text-xl text-white">{current.title}</span>
          <span aria-hidden="true" className="text-white/40">
            ·
          </span>
          <span>{current.category}</span>
          {current.location && (
            <>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span>{current.location}</span>
            </>
          )}
          {current.camera && (
            <>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span>{current.camera}</span>
            </>
          )}
          {current.exif && (
            <>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span className="tabular-nums text-white/65">{current.exif}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
