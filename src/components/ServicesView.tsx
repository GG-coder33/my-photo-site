import { useState } from 'react';
import { ArrowRight, Briefcase, Calendar, Send, Users } from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import type { ServiceItem, TabId } from '../types';
import {
  filterServicesBySegment,
  type ServiceSegmentFilter,
} from '../utils/studioLogic';

interface ServicesViewProps {
  onNavigate: (tab: TabId) => void;
}

function ServiceCard({
  service,
  index,
  onNavigate,
}: {
  service: ServiceItem;
  index: number;
  onNavigate: (tab: TabId) => void;
}) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors duration-300 hover:border-[#FF4500]/50">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#080808]">
          <img
            src={service.image}
            alt={service.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 text-xs text-white/50">
            <span className="font-mono font-medium tabular-nums text-[#FF4500]">
              0{index + 1} · {service.duration}
            </span>
            <span>{service.priceStatus}</span>
          </div>

          <h3 className="mt-3 font-editorial text-2xl font-medium tracking-tight text-white">
            {service.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
            {service.description}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 sm:px-7">
        <p className="text-xs text-white/55">{service.deliverables}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="font-editorial text-base font-medium text-[#ffe0e0]">
            По запросу
          </span>
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FF4500] transition-opacity hover:opacity-80"
          >
            <span>Записаться</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  const [segmentFilter, setSegmentFilter] =
    useState<ServiceSegmentFilter>('ALL');

  const b2bServices = filterServicesBySegment(SERVICE_CATEGORIES, 'B2B');
  const b2cServices = filterServicesBySegment(SERVICE_CATEGORIES, 'B2C');

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-12 sm:px-8 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-10">
        <div className="dot-matrix-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[#FF4500] uppercase">
              Форматы съёмки и прайс-лист
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
              Услуги: B2B и B2C
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-400">
              Услуги разделены на коммерческую съёмку для бизнеса (B2B) и
              частные фотосессии (B2C). Примеры изображений временно подобраны
              для визуализации разделов, а точный прайс-лист мы добавим позже.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF4500] px-5 py-2.5 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-transform hover:scale-[1.03]"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Записаться на съёмку</span>
            </button>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#FF4500]/60 hover:bg-white/10"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{TELEGRAM_BOT_HANDLE}</span>
            </a>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="relative z-10 mt-7 inline-flex flex-wrap items-center gap-1 rounded-2xl border border-white/10 bg-[#050505] p-1">
          <button
            type="button"
            onClick={() => setSegmentFilter('ALL')}
            className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'ALL'
                ? 'bg-[#FF4500] text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Все направления
          </button>
          <button
            type="button"
            onClick={() => setSegmentFilter('B2B')}
            className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'B2B'
                ? 'bg-[#FF4500] text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            B2B · Для бизнеса
          </button>
          <button
            type="button"
            onClick={() => setSegmentFilter('B2C')}
            className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'B2C'
                ? 'bg-[#FF4500] text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            B2C · Частные съёмки
          </button>
        </div>
      </section>

      {(segmentFilter === 'ALL' || segmentFilter === 'B2B') && (
        <section className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#FF4500]/30 bg-[#111111] p-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF4500] text-black">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#FF4500]">
                  Раздел B2B · Коммерческая съёмка
                </p>
                <h2 className="mt-0.5 font-editorial text-2xl font-medium tracking-tight text-white">
                  Съёмка для коммерции и бизнеса
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs font-medium text-white/55 tabular-nums whitespace-nowrap">
              {b2bServices.length} направления
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {b2bServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      )}

      {(segmentFilter === 'ALL' || segmentFilter === 'B2C') && (
        <section className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#ffe0e0]">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  Раздел B2C · Частные съёмки
                </p>
                <h2 className="mt-0.5 font-editorial text-2xl font-medium tracking-tight text-white">
                  Личные, семейные и памятные истории
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs font-medium text-white/55 tabular-nums whitespace-nowrap">
              {b2cServices.length} направления
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {b2cServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
