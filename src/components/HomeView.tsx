import { useState } from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import {
  CARD_IMAGES,
  HERO_SLIDES,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import type { PortfolioItem, TabId } from '../types';

interface HomeViewProps {
  portfolioItems: PortfolioItem[];
  onNavigate: (tab: TabId) => void;
  onOpenLightbox: (index: number) => void;
}

export function HomeView({
  portfolioItems,
  onNavigate,
  onOpenLightbox,
}: HomeViewProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[slideIndex];
  const previewWorks = portfolioItems.slice(0, 4);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Hero section */}
      <section className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white">
        {/* Background photography with soft left-to-right fade */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-right opacity-60 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/15" />
        </div>

        <div className="relative z-10 flex min-h-[380px] flex-col justify-between p-6 sm:p-10 lg:min-h-[430px] lg:p-12">
          {/* Top kicker */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium tracking-[0.24em] text-[#404040]">
              {currentSlide.kicker}
            </span>
            <span className="hidden h-px w-20 bg-[#141414]/45 sm:inline-block" />
          </div>

          {/* Center headline & lead */}
          <div className="my-8 max-w-xl">
            <h1 className="font-editorial text-5xl font-normal tracking-[0.04em] leading-none text-[#141414] sm:text-6xl lg:text-[74px]">
              {currentSlide.title}
            </h1>
            <p className="mt-3 text-[11px] font-medium tracking-[0.32em] text-[#333333] sm:text-xs">
              {currentSlide.subtitle}
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#333333]">
              {currentSlide.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#141414] px-6 py-3 text-[13.5px] font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] focus-visible:ring-offset-2"
              >
                <span>Записаться на съёмку</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom-right carousel controls */}
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs font-medium tabular-nums text-[#333333]">
              0{slideIndex + 1} / 0{HERO_SLIDES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Предыдущий слайд"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#141414]/35 bg-white/80 text-[#141414] transition-colors hover:bg-[#141414] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Следующий слайд"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#141414]/35 bg-white/80 text-[#141414] transition-colors hover:bg-[#141414] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Bento Feature Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => onNavigate('about')}
          className="group relative flex min-h-[196px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <img
            src={CARD_IMAGES.about}
            alt="Обо мне — светотень"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

          <div className="relative z-10 max-w-[85%]">
            <h2 className="font-editorial text-[26px] font-medium leading-tight text-white">
              Обо мне
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">
              Кто я, чем занимаюсь и почему фотография — моя страсть.
            </p>
          </div>

          <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-white">
            <span className="underline underline-offset-4">Узнать больше</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('services')}
          className="group relative flex min-h-[196px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <img
            src={CARD_IMAGES.services}
            alt="Услуги и фотостудия"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

          <div className="relative z-10 max-w-[85%]">
            <h2 className="font-editorial text-[26px] font-medium leading-tight text-white">
              Услуги
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">
              Фотосессии на любой случай — от портретов до мероприятий.
            </p>
          </div>

          <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-white">
            <span className="underline underline-offset-4">Посмотреть цены</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('news')}
          className="group relative flex min-h-[196px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <img
            src={CARD_IMAGES.news}
            alt="Новости и камера у окна"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

          <div className="relative z-10 max-w-[85%]">
            <h2 className="font-editorial text-[26px] font-medium leading-tight text-white">
              Новости
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">
              Следите за обновлениями: новые проекты, акции и полезные советы.
            </p>
          </div>

          <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-white">
            <span className="underline underline-offset-4">Читать новости</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>
      </section>

      {/* Bottom Portfolio Strip + Telegram Questions Card */}
      <section className="grid grid-cols-1 gap-4 rounded-2xl border border-[#EAEAEA] bg-white p-5 sm:p-6 xl:grid-cols-12 xl:items-center">
        <div className="flex flex-col justify-between gap-4 xl:col-span-3">
          <div>
            <h2 className="font-editorial text-[26px] font-medium leading-tight text-[#141414]">
              Портфолио
            </h2>
            <p className="mt-1 text-[13px] text-[#555555]">Примеры моих работ</p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[#141414] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            <span>Перейти в галерею</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:col-span-5">
          {previewWorks.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenLightbox(idx)}
              aria-label={`Открыть фотографию: ${item.title}`}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#EAEAEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
            </button>
          ))}
        </div>

        {/* Questions / Telegram CTA box */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#F1F1F1] p-6 xl:col-span-4">
          <Send
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 top-3 h-16 w-16 -rotate-12 text-[#141414]/[0.06]"
          />
          <div>
            <h2 className="font-editorial text-[24px] font-medium leading-tight text-[#141414]">
              Остались вопросы?
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#4A4A4A]">
              Напишите мне — я отвечу в ближайшее время
            </p>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E0E0E0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#141414] whitespace-nowrap transition-colors hover:border-[#141414] hover:bg-[#141414] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Написать в Telegram</span>
          </a>
        </div>
      </section>
    </div>
  );
}
