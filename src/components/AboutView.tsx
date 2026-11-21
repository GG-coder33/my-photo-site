import { ArrowRight, Calendar } from 'lucide-react';
import { CARD_IMAGES } from '../data/studioData';
import type { TabId } from '../types';

interface AboutViewProps {
  onNavigate: (tab: TabId) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
          <div className="min-h-[260px] lg:col-span-5">
            <img
              src={CARD_IMAGES.news}
              alt="Камера фотографа у окна"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
                О ФОТОГРАФЕ
              </p>
              <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
                Обо мне
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4A4A4A]">
                Здесь будет размещена моя личная история: как я пришёл в
                фотографию, как давно снимаю и какие жанры для меня главные.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-[13.5px] font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B]"
              >
                <span>Смотреть портфолио</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center gap-2 rounded-full border border-[#141414]/25 px-5 py-3 text-[13.5px] font-medium text-[#141414] whitespace-nowrap shrink-0 transition-colors hover:border-[#141414] hover:bg-[#F5F5F5]"
              >
                <Calendar className="h-4 w-4" />
                <span>Записаться на съёмку</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Bio Sections Ready for Text */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#EAEAEA] bg-white p-6">
          <p className="text-xs font-medium text-[#737373] tabular-nums">01</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium text-[#141414]">
            Чем я занимаюсь
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#4A4A4A]">
            Раздел подготовлен для описания ключевых направлений работы:
            портретные фотосессии, репортажи, уличные и студийные проекты.
          </p>
        </article>

        <article className="rounded-2xl border border-[#EAEAEA] bg-white p-6">
          <p className="text-xs font-medium text-[#737373] tabular-nums">02</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium text-[#141414]">
            Опыт и путь
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#4A4A4A]">
            Здесь мы добавим подробности о том, как давно я занимаюсь
            фотографией, первых проектах и развитии авторского почерка.
          </p>
        </article>

        <article className="rounded-2xl border border-[#EAEAEA] bg-white p-6">
          <p className="text-xs font-medium text-[#737373] tabular-nums">03</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium text-[#141414]">
            Подход к съёмке
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#4A4A4A]">
            Внимание к свету, спокойная атмосфера на площадке и естественные
            кадры, к которым хочется возвращаться спустя годы.
          </p>
        </article>
      </section>
    </div>
  );
}
