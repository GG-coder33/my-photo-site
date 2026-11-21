import { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, MessageCircle, Send } from 'lucide-react';
import {
  PERSONAL_TELEGRAM_HANDLE,
  PERSONAL_TELEGRAM_URL,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';

export function ContactsView() {
  const [copiedPersonal, setCopiedPersonal] = useState(false);

  const handleCopyPersonal = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_TELEGRAM_HANDLE);
      setCopiedPersonal(true);
      setTimeout(() => setCopiedPersonal(false), 2000);
    } catch {
      // Clipboard optional in restricted contexts
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-[#9D8EFF] uppercase">
          Связь со студией
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
          Контакты
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
          Свяжитесь со мной удобным способом — напрямую в личном Telegram{' '}
          <span className="text-white">{PERSONAL_TELEGRAM_HANDLE}</span> или
          через Telegram-бота{' '}
          <span className="text-white">{TELEGRAM_BOT_HANDLE}</span>.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <article className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-7">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#ffe0e0]">
              <MessageCircle className="h-4 w-4" />
            </div>
            <h2 className="mt-5 font-editorial text-2xl font-medium text-white">
              Личный Telegram
            </h2>
            <p className="mt-2 text-base font-semibold text-[#9D8EFF]">
              {PERSONAL_TELEGRAM_HANDLE}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Прямая связь со мной: обсуждение идеи съёмки, коммерческих
              проектов и индивидуальных условий.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={PERSONAL_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:scale-[1.03] hover:bg-[#9D8EFF]"
            >
              <span>Написать {PERSONAL_TELEGRAM_HANDLE}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyPersonal}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-[#9D8EFF]/60 hover:text-white"
            >
              {copiedPersonal ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#9D8EFF]" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Копировать юз</span>
                </>
              )}
            </button>
          </div>
        </article>

        <article className="flex flex-col justify-between rounded-3xl bg-[#9D8EFF] p-7 text-black shadow-[0_20px_50px_rgba(157,142,255,0.2)]">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/10 text-black">
              <Send className="h-4 w-4" />
            </div>
            <h2 className="mt-5 font-editorial text-2xl font-medium text-black">
              Telegram-бот для записи
            </h2>
            <p className="mt-2 text-base font-semibold text-black/90">
              {TELEGRAM_BOT_HANDLE}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/80">
              Быстрый выбор формата съёмки, свободных дат и оформление заявки.
            </p>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <span>Открыть {TELEGRAM_BOT_HANDLE}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </article>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 shrink-0 text-[#9D8EFF]" />
          <p className="text-sm text-gray-400">
            Локация:{' '}
            <span className="font-semibold text-white">Челябинск</span> ·
            возможны выездные и студийные съёмки
          </p>
        </div>

        <a
          href={PERSONAL_TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#9D8EFF] transition-opacity hover:opacity-80"
        >
          {PERSONAL_TELEGRAM_HANDLE}
        </a>
      </section>
    </div>
  );
}
