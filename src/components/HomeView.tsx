import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Send, Star } from 'lucide-react';
import {
  DARK_HERO_ASSETS,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import type { PortfolioItem, TabId } from '../types';
import type { NavigateOptions } from '../App';

interface HomeViewProps {
  portfolioItems: PortfolioItem[];
  onNavigate: (tab: TabId, options?: NavigateOptions) => void;
  onOpenLightbox: (index: number) => void;
}

function formatChelyabinskTime(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Yekaterinburg',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }
}

export function HomeView({
  portfolioItems,
  onNavigate,
  onOpenLightbox,
}: HomeViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState<string>(() => formatChelyabinskTime());
  const previewWorks = portfolioItems.slice(0, 4);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatChelyabinskTime());
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  // 1. Intersection Observer for .reveal elements
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 2. Hero Scroll Parallax + Opposite Card Parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (heroWrapperRef.current && scrolled < 1000) {
        heroWrapperRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
        heroWrapperRef.current.style.opacity = String(
          Math.max(0, 1 - scrolled / 600)
        );
      }

      const container = rootRef.current;
      if (!container) return;

      container.querySelectorAll<HTMLElement>('.parallax-card-up').forEach((el) => {
        el.style.setProperty('--scroll-offset-up', `${scrolled * -0.04}px`);
      });
      container
        .querySelectorAll<HTMLElement>('.parallax-card-down')
        .forEach((el) => {
          el.style.setProperty('--scroll-offset-down', `${scrolled * 0.04}px`);
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col bg-[#050505] text-white">
      {/* 1. Dark Atmospheric Hero with Floating Surrealist Hands & Scroll Parallax */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#050505] px-6 py-24">
        {/* Background Atmosphere (hue-shifted to harmonize with #9D8EFF accent) */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 opacity-60 mix-blend-screen">
            <img
              src={DARK_HERO_ASSETS.atmosphere}
              alt="Darkroom light atmosphere"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center opacity-85 hue-rotate-[225deg] saturate-75"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </div>

        {/* Floating Left Hand */}
        <div className="animate-float-left pointer-events-none absolute -left-[10%] -top-[6%] z-10 w-[52vw] max-w-[540px] opacity-85 mix-blend-screen md:-left-[4%] md:-top-[10%] md:w-[36vw]">
          <img
            src={DARK_HERO_ASSETS.handLeft}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-auto w-full object-contain brightness-110 contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_75%)]"
          />
        </div>

        {/* Floating Right Hand */}
        <div className="animate-float-right pointer-events-none absolute -bottom-[6%] -right-[10%] z-10 w-[48vw] max-w-[500px] opacity-85 mix-blend-screen md:-bottom-[4%] md:-right-[4%] md:w-[32vw]">
          <img
            src={DARK_HERO_ASSETS.handRight}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-auto w-full object-contain brightness-110 contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_75%)]"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div ref={heroWrapperRef}>
            <div className="reveal active">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-[#9D8EFF]">
                Фотограф в Челябинске
              </p>
              <h1 className="hero-glow font-editorial text-5xl font-medium leading-[1.08] tracking-tight text-[#ffe0e0] sm:text-7xl lg:text-[84px]">
                EXPOSURE. <br />
                <span className="font-light italic text-[#ffe0e0]">
                  Искусство кадра.
                </span>
              </h1>
            </div>

            <div className="reveal active mt-6" style={{ transitionDelay: '200ms' }}>
              <p className="hero-glow mx-auto max-w-lg text-base font-light leading-relaxed tracking-wide text-[#ffe0e0]/90 md:text-lg">
                Мы превращаем мгновения в истории, к которым хочется
                возвращаться. Коммерческая и частная фотография в Челябинске.
              </p>
            </div>

            <div
              className="reveal active mt-14 flex flex-col items-center gap-6"
              style={{ transitionDelay: '400ms' }}
            >
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8EFF]"
              >
                <div className="absolute inset-0 rounded-full bg-[#9D8EFF]/25 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-2.5 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm transition-colors duration-300 group-hover:border-[#9D8EFF]/60 group-hover:bg-white/10 md:text-sm">
                  <span>Записаться на съёмку</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>

              <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 md:text-xs">
                <span className="tabular-nums">{clock}</span>
                <span className="h-3 w-px bg-white/20" />
                <span>Челябинск, РФ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="reveal">
            <h2 className="font-editorial text-3xl leading-tight text-white/95 md:text-5xl lg:text-6xl">
              Мы снимаем пространство, в котором по-настоящему живёт ваш момент.
            </h2>
            <p className="mt-10 text-lg font-light leading-relaxed text-gray-400 md:text-2xl">
              Убираем лишний шум, оставляя чистый свет, характер и подлинную
              эмоцию в каждом кадре.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-2 items-center justify-items-center gap-8 opacity-45 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0 md:grid-cols-4">
            <button
              type="button"
              onClick={() =>
                onNavigate('portfolio', { category: 'Портреты' })
              }
              className="reveal text-base font-bold tracking-[0.22em] text-white transition-colors hover:text-[#9D8EFF] sm:text-lg"
            >
              ПОРТРЕТЫ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services', { segment: 'B2B' })}
              className="reveal text-base font-bold tracking-[0.22em] text-white transition-colors hover:text-[#9D8EFF] sm:text-lg"
              style={{ transitionDelay: '100ms' }}
            >
              КОММЕРЦИЯ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services', { segment: 'B2C' })}
              className="reveal text-base font-bold tracking-[0.22em] text-white transition-colors hover:text-[#9D8EFF] sm:text-lg"
              style={{ transitionDelay: '200ms' }}
            >
              СВАДЬБЫ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('portfolio', { category: 'Город' })}
              className="reveal text-base font-bold tracking-[0.22em] text-white transition-colors hover:text-[#9D8EFF] sm:text-lg"
              style={{ transitionDelay: '300ms' }}
            >
              ГОРОД
            </button>
          </div>
        </div>
      </section>

      {/* 3. Dual Parallax Cards Section (B2B & B2C — dark by default, violet #9D8EFF on hover) */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="dot-matrix-bg pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-15" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="reveal mb-20 text-center sm:mb-28">
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl">
              Выберите формат <br />
              <span className="italic text-[#ffe0e0]">вашей съёмки</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card 01 — Dark Obsidian -> Violet #9D8EFF on hover */}
            <div className="parallax-card-down">
              <button
                type="button"
                onClick={() => onNavigate('services', { segment: 'B2B' })}
                className="reveal group flex aspect-[4/5] w-full cursor-pointer flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-8 text-left shadow-2xl transition-all duration-500 hover:border-[#9D8EFF] hover:bg-[#9D8EFF] hover:shadow-[0_20px_50px_rgba(157,142,255,0.35)] sm:p-11"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all duration-500 group-hover:rotate-45 group-hover:bg-black/10">
                    <Star className="h-6 w-6 text-white transition-colors duration-300 group-hover:text-black" />
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-white/60 tabular-nums transition-colors duration-300 group-hover:border-black/20 group-hover:text-black">
                    01
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-4xl leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-black sm:text-5xl">
                    B2B <br />
                    Для бизнеса
                  </h3>
                  <p className="mt-4 text-base leading-snug text-gray-400 transition-colors duration-300 group-hover:text-black/80 sm:text-lg">
                    Рекламная и имиджевая съёмка, каталоги и лукбуки,
                    бизнес-репортажи и контент для личного бренда.
                  </p>
                </div>

                <div className="mt-6 flex w-full items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors duration-300 group-hover:border-black/15 group-hover:text-black">
                  <span>Открыть услуги B2B</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </div>

            {/* Card 02 — Dark Obsidian -> Violet #9D8EFF on hover */}
            <div className="parallax-card-up md:mt-24">
              <button
                type="button"
                onClick={() => onNavigate('services', { segment: 'B2C' })}
                className="reveal group flex aspect-[4/5] w-full cursor-pointer flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-8 text-left shadow-2xl transition-all duration-500 hover:border-[#9D8EFF] hover:bg-[#9D8EFF] hover:shadow-[0_20px_50px_rgba(157,142,255,0.35)] sm:p-11"
                style={{ transitionDelay: '150ms' }}
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-black/10">
                    <ArrowRight className="h-6 w-6 -rotate-45 text-white transition-colors duration-300 group-hover:text-black" />
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-white/60 tabular-nums transition-colors duration-300 group-hover:border-black/20 group-hover:text-black">
                    02
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-4xl leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-black sm:text-5xl">
                    B2C <br />
                    Личные истории
                  </h3>
                  <p className="mt-4 text-base leading-snug text-gray-400 transition-colors duration-300 group-hover:text-black/80 sm:text-lg">
                    Фото свадьбы, семейные и детские фотосессии, выпускные
                    альбомы и индивидуальные портреты.
                  </p>
                </div>

                <div className="mt-6 flex w-full items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors duration-300 group-hover:border-black/15 group-hover:text-black">
                  <span>Открыть услуги B2C</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Preview + Telegram CTA Strip */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="reveal grid grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col justify-between gap-4 lg:col-span-3">
            <div>
              <h2 className="font-editorial text-3xl text-white">Портфолио</h2>
              <p className="mt-1 text-sm text-gray-400">Примеры моих работ</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#9D8EFF] transition-opacity hover:opacity-80"
            >
              <span>Вся галерея</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-5">
            {previewWorks.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenLightbox(idx)}
                aria-label={`Открыть фотографию: ${item.title}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8EFF]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#080808] p-6 lg:col-span-4">
            <div>
              <h3 className="font-editorial text-2xl text-white">
                Остались вопросы?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                Напишите напрямую в Telegram-бот {TELEGRAM_BOT_HANDLE} — отвечу
                в ближайшее время.
              </p>
            </div>

            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black whitespace-nowrap transition-all hover:scale-[1.02] hover:bg-[#9D8EFF] hover:text-black"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Написать в Telegram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
