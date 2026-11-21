import { ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { TELEGRAM_BOT_HANDLE, TELEGRAM_BOT_URL } from '../data/studioData';

export function ContactsView() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-[#FF4500] uppercase">
          Связь со студией
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
          Контакты
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
          Свяжитесь со мной удобным способом. Telegram-бот уже активен, а почту
          и номер телефона мы добавим в ближайшее время.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-7">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#ffe0e0]">
              <Mail className="h-4 w-4" />
            </div>
            <h2 className="mt-5 font-editorial text-xl font-medium text-white">
              Электронная почта
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Адрес почты будет добавлен позже
            </p>
          </div>
          <p className="mt-6 text-xs text-white/45">
            Для коммерческих запросов и брифов
          </p>
        </article>

        <article className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-7">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#ffe0e0]">
              <Phone className="h-4 w-4" />
            </div>
            <h2 className="mt-5 font-editorial text-xl font-medium text-white">
              Телефон
            </h2>
            <p className="mt-2 text-sm font-medium tabular-nums text-white">
              +7 (•••) •••-••-••
            </p>
          </div>
          <p className="mt-6 text-xs text-white/45">
            Номер телефона будет добавлен позже
          </p>
        </article>

        <article className="flex flex-col justify-between rounded-3xl bg-[#FF4500] p-7 text-black shadow-[0_20px_50px_rgba(255,69,0,0.2)]">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/10 text-black">
              <Send className="h-4 w-4" />
            </div>
            <h2 className="mt-5 font-editorial text-xl font-medium text-black">
              Telegram-бот
            </h2>
            <p className="mt-2 text-sm font-semibold text-black/85">
              {TELEGRAM_BOT_HANDLE}
            </p>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <span>Написать в Telegram</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </article>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 shrink-0 text-[#FF4500]" />
          <p className="text-sm text-gray-400">
            Локация:{' '}
            <span className="font-semibold text-white">Челябинск</span> ·
            возможны выездные и студийные съёмки
          </p>
        </div>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#FF4500] transition-opacity hover:opacity-80"
        >
          {TELEGRAM_BOT_HANDLE}
        </a>
      </section>
    </div>
  );
}
