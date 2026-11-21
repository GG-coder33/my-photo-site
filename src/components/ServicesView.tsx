import { useState } from 'react';
import { ArrowRight, Briefcase, Calendar, Send, Users } from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import type { ServiceItem, TabId } from '../types';

interface ServicesViewProps {
  onNavigate: (tab: TabId) => void;
}

type SegmentFilter = 'ALL' | 'B2B' | 'B2C';

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
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECECEC]">
          <img
            src={service.image}
            alt={service.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4 text-xs text-[#737373]">
            <span className="tabular-nums font-medium">
              0{index + 1} · {service.duration}
            </span>
            <span>{service.priceStatus}</span>
          </div>

          <h3 className="mt-3 font-editorial text-2xl font-medium leading-snug text-[#141414]">
            {service.title}
          </h3>

          <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4A4A4A]">
            {service.description}
          </p>
        </div>
      </div>

      <div className="border-t border-[#EFEFEF] px-6 py-4">
        <p className="text-xs text-[#666666]">{service.deliverables}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="font-editorial text-xl font-medium text-[#141414]">
            По запросу
          </span>
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141414] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            <span>Записаться</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('ALL');

  const b2bServices = SERVICE_CATEGORIES.filter((item) => item.segment === 'B2B');
  const b2cServices = SERVICE_CATEGORIES.filter((item) => item.segment === 'B2C');

  return (
    <div className="flex flex-col gap-7">
      {/* Header Banner */}
      <section className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
              ФОРМАТЫ СЪЁМКИ И ПРАЙС-ЛИСТ
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
              Услуги: B2B и B2C
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4A4A4A]">
              Услуги разделены на коммерческую съёмку для бизнеса (B2B) и частные
              фотосессии (B2C). Примеры изображений временно подобраны для
              визуализации разделов, а точный прайс-лист мы добавим позже.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-[13.5px] font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B]"
            >
              <Calendar className="h-4 w-4" />
              <span>Записаться на съёмку</span>
            </button>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#141414]/25 bg-white px-5 py-3 text-[13.5px] font-medium text-[#141414] whitespace-nowrap shrink-0 transition-colors hover:border-[#141414] hover:bg-[#F5F5F5]"
            >
              <Send className="h-4 w-4" />
              <span>{TELEGRAM_BOT_HANDLE}</span>
            </a>
          </div>
        </div>

        {/* Segment Switcher */}
        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-[#EFEFEF] pt-6">
          <button
            type="button"
            onClick={() => setSegmentFilter('ALL')}
            className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'ALL'
                ? 'bg-[#141414] text-white'
                : 'border border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#141414] hover:text-[#141414]'
            }`}
          >
            Все направления
          </button>
          <button
            type="button"
            onClick={() => setSegmentFilter('B2B')}
            className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'B2B'
                ? 'bg-[#141414] text-white'
                : 'border border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#141414] hover:text-[#141414]'
            }`}
          >
            B2B · Для бизнеса и брендов
          </button>
          <button
            type="button"
            onClick={() => setSegmentFilter('B2C')}
            className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              segmentFilter === 'B2C'
                ? 'bg-[#141414] text-white'
                : 'border border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#141414] hover:text-[#141414]'
            }`}
          >
            B2C · Частные фотосессии
          </button>
        </div>
      </section>

      {/* B2B Section */}
      {(segmentFilter === 'ALL' || segmentFilter === 'B2B') && (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#141414] text-white">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#666666]">
                  РАЗДЕЛ B2B · КОММЕРЧЕСКАЯ СЪЁМКА
                </p>
                <h2 className="mt-1 font-editorial text-3xl font-medium text-[#141414]">
                  Съёмка для коммерции и бизнеса
                </h2>
                <p className="mt-1 text-sm text-[#4A4A4A]">
                  Рекламные кампании, каталоги, деловые события и визуальный
                  контент для компаний и экспертов.
                </p>
              </div>
            </div>

            <span className="text-xs font-medium text-[#666666] tabular-nums whitespace-nowrap">
              {b2bServices.length} направления
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

      {/* B2C Section */}
      {(segmentFilter === 'ALL' || segmentFilter === 'B2C') && (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F2F2] text-[#141414]">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#666666]">
                  РАЗДЕЛ B2C · ЧАСТНЫЕ СЪЁМКИ
                </p>
                <h2 className="mt-1 font-editorial text-3xl font-medium text-[#141414]">
                  Личные, семейные и памятные истории
                </h2>
                <p className="mt-1 text-sm text-[#4A4A4A]">
                  Свадьбы, семейные и детские фотосессии, выпускные альбомы и
                  индивидуальные портреты.
                </p>
              </div>
            </div>

            <span className="text-xs font-medium text-[#666666] tabular-nums whitespace-nowrap">
              {b2cServices.length} направления
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
