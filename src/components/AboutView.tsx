import { ArrowRight, Calendar } from 'lucide-react';
import { CARD_IMAGES } from '../data/studioData';
import type { TabId } from '../types';

interface AboutViewProps {
  onNavigate: (tab: TabId) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
          <div className="min-h-[280px] overflow-hidden bg-[#080808] lg:col-span-5">
            <img
              src={CARD_IMAGES.news}
              alt="Камера фотографа у окна"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#9D8EFF] uppercase">
                О фотографе · Челябинск
              </p>
              <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
                Обо мне
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400">
                Снимаю в Челябинске коммерческие проекты, спортивные события и
                частные истории. Помогаю с позированием, выстраиваю свет и
                создаю спокойную атмосферу, чтобы каждый кадр передавал живой
                характер момента.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 rounded-full bg-[#9D8EFF] px-6 py-3 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-transform hover:scale-[1.03]"
              >
                <span>Смотреть портфолио</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#9D8EFF]/60 hover:bg-white/10"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Записаться на съёмку</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-[#111111] p-7 transition-colors hover:border-[#9D8EFF]/40">
          <p className="font-mono text-xs font-medium text-[#9D8EFF] tabular-nums">
            01
          </p>
          <h2 className="mt-3 font-editorial text-xl font-medium tracking-tight text-white">
            Чем я занимаюсь
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Работаю в разных направлениях фотографии: от динамичных спортивных
            съёмок до коммерческих проектов для бизнеса и индивидуальных
            фотосессий.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-[#111111] p-7 transition-colors hover:border-[#9D8EFF]/40">
          <p className="font-mono text-xs font-medium text-[#9D8EFF] tabular-nums">
            02
          </p>
          <h2 className="mt-3 font-editorial text-xl font-medium tracking-tight text-white">
            Мой путь и опыт
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Фотографией занимаюсь уже пять лет. За это время прошёл множество
            обучающих курсов, много практиковался и пробовал себя в разных
            направлениях. Постепенно набирался опыта, изучал новые техники и
            учился работать со светом и композицией. До сих пор стараюсь
            узнавать что-то новое и становиться лучше в своём деле.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-[#111111] p-7 transition-colors hover:border-[#9D8EFF]/40">
          <p className="font-mono text-xs font-medium text-[#9D8EFF] tabular-nums">
            03
          </p>
          <h2 className="mt-3 font-editorial text-xl font-medium tracking-tight text-white">
            Подход к съёмке
          </h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-gray-400">
            <p>
              Для меня важно не просто сделать красивые фотографии, а создать
              результат, который действительно понравится вам.
            </p>
            <p>
              Я уделяю внимание деталям: свету, композиции, атмосфере и вашим
              пожеланиям. На съёмке стараюсь создать комфортную обстановку, в
              которой не нужно переживать о том, как встать или куда посмотреть.
              Я помогу с позированием, подскажу удачные ракурсы и сделаю всё,
              чтобы вы чувствовали себя уверенно перед камерой.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
