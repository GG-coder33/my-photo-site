import { ArrowRight, Calendar, Send } from 'lucide-react';
import {
  CARD_IMAGES,
  SERVICE_CATEGORIES,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import type { TabId } from '../types';

interface ServicesViewProps {
  onNavigate: (tab: TabId) => void;
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
              ФОРМАТЫ СЪЁМКИ И ПРАЙС-ЛИСТ
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
              Услуги и стоимость
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#4A4A4A]">
              Подробный прайс-лист с тарифами и пакетами фотосессий сейчас
              формируется и будет добавлен позже. Уже сейчас вы можете выбрать
              подходящий формат съёмки и уточнить условия в Telegram.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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
                <span>Уточнить цену в {TELEGRAM_BOT_HANDLE}</span>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl lg:col-span-5">
            <img
              src={CARD_IMAGES.services}
              alt="Студийное освещение для фотосессии"
              referrerPolicy="no-referrer"
              className="h-56 w-full object-cover sm:h-64"
            />
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SERVICE_CATEGORIES.map((service, index) => (
          <article
            key={service.id}
            className="flex flex-col justify-between rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-4 text-xs text-[#737373]">
                <span className="tabular-nums font-medium">
                  0{index + 1} · {service.duration}
                </span>
                <span>{service.priceStatus}</span>
              </div>

              <h2 className="mt-3 font-editorial text-2xl font-medium text-[#141414] sm:text-[28px]">
                {service.title}
              </h2>

              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4A4A4A]">
                {service.description}
              </p>
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-4">
              <p className="text-xs text-[#666666]">{service.deliverables}</p>
              <div className="mt-4 flex items-center justify-between gap-4">
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
        ))}
      </section>
    </div>
  );
}
