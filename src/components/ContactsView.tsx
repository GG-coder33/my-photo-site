import { ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { TELEGRAM_BOT_HANDLE, TELEGRAM_BOT_URL } from '../data/studioData';

export function ContactsView() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-10">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
          СВЯЗЬ СО СТУДИЕЙ
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
          Контакты
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4A4A4A]">
          Свяжитесь со мной удобным способом. Telegram-бот уже активен, а почту
          и номер телефона мы добавим в ближайшее время.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Email */}
        <article className="flex flex-col justify-between rounded-2xl border border-[#EAEAEA] bg-white p-6">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F4] text-[#141414]">
              <Mail className="h-4 w-4" />
            </div>
            <h2 className="mt-4 font-editorial text-2xl font-medium text-[#141414]">
              Электронная почта
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              Адрес почты будет добавлен позже
            </p>
          </div>
          <p className="mt-6 text-xs text-[#737373]">
            Для коммерческих запросов и брифов
          </p>
        </article>

        {/* Phone */}
        <article className="flex flex-col justify-between rounded-2xl border border-[#EAEAEA] bg-white p-6">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F4] text-[#141414]">
              <Phone className="h-4 w-4" />
            </div>
            <h2 className="mt-4 font-editorial text-2xl font-medium text-[#141414]">
              Телефон
            </h2>
            <p className="mt-2 text-sm tabular-nums text-[#4A4A4A]">
              +7 (•••) •••-••-••
            </p>
          </div>
          <p className="mt-6 text-xs text-[#737373]">
            Номер телефона будет добавлен позже
          </p>
        </article>

        {/* Telegram */}
        <article className="flex flex-col justify-between rounded-2xl bg-[#141414] p-6 text-white">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <Send className="h-4 w-4" />
            </div>
            <h2 className="mt-4 font-editorial text-2xl font-medium">
              Telegram-бот
            </h2>
            <p className="mt-2 text-sm text-white/85">{TELEGRAM_BOT_HANDLE}</p>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#141414] transition-colors hover:bg-[#EAEAEA]"
          >
            <span>Написать в Telegram</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </article>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 shrink-0 text-[#4A4A4A]" />
          <p className="text-sm text-[#4A4A4A]">
            Локация: <span className="font-medium text-[#141414]">Москва</span>{' '}
            · возможны выездные и студийные съёмки
          </p>
        </div>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#141414] underline underline-offset-4 hover:opacity-70"
        >
          {TELEGRAM_BOT_HANDLE}
        </a>
      </section>
    </div>
  );
}
