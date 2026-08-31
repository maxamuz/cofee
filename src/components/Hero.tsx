import {
  IconArrowRight,
  IconBean,
  IconFlame,
  IconMountain,
  IconStar,
} from "./icons";

const TICKER = [
  "Эфиопия",
  "Колумбия",
  "Кения",
  "Бразилия",
  "Гватемала",
  "Гондурас",
  "Руанда",
  "Перу",
];

function RotatingBadge() {
  return (
    <div className="absolute -bottom-7 -left-4 h-28 w-28 sm:-left-10 sm:h-32 sm:w-32">
      <div className="relative h-full w-full rounded-full bg-caramel text-espresso shadow-xl shadow-espresso/50">
        <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
          <defs>
            <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text fontSize="10.2" fontWeight="600" letterSpacing="2.6" fill="currentColor">
            <textPath href="#badge-circle">
              СВЕЖАЯ ОБЖАРКА • КАЖДЫЙ ВТОРНИК •
            </textPath>
          </text>
        </svg>
        <IconBean className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-cream">
      {/* ambient layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-a absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-caramel/10 blur-[120px]" />
        <div className="glow-b absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-bark/60 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-20">
        {/* copy */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-8">
          <p className="anim-fade-up mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-caramel">
            <span className="inline-block h-px w-10 bg-caramel/70" />
            обжарочная · москва · с 2017 года
          </p>

          <h1 className="font-display text-[2.55rem] leading-[1.06] sm:text-6xl lg:text-[4.3rem]">
            <span className="line-mask">
              <span style={{ animationDelay: "0.1s" }}>Кофе, который</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "0.24s" }}>помнит свою</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "0.38s" }}>
                <em className="not-italic text-honey">гору</em>
              </span>
            </span>
          </h1>

          <p
            className="anim-fade-up mt-7 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg"
            style={{ animationDelay: "0.5s" }}
          >
            Шесть лотов в постоянной ротации, прямые контракты с фермами и обжарка
            ровно под ваш способ заваривания — от воронки до эспрессо. Зерно
            приезжает к вам на пике вкуса, а не со склада.
          </p>

          <div
            className="anim-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.62s" }}
          >
            <a
              href="#catalog"
              className="group inline-flex items-center gap-2.5 rounded-full bg-caramel px-7 py-3.5 font-semibold text-espresso transition-all hover:bg-honey hover:shadow-lg hover:shadow-caramel/20 active:scale-95"
            >
              К каталогу
              <IconArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#roast"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 font-semibold text-cream/85 transition-all hover:border-caramel hover:text-caramel active:scale-95"
            >
              Как мы обжариваем
            </a>
          </div>

          <div
            className="anim-fade-up mt-12 flex flex-wrap gap-3"
            style={{ animationDelay: "0.74s" }}
          >
            {[
              { icon: IconFlame, text: "Обжарка за 48 часов" },
              { icon: IconMountain, text: "12 стран происхождения" },
              { icon: IconStar, text: "Оценка Q-грейдеров от 84" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-cream/12 px-4 py-2 text-sm text-cream/70 transition-colors hover:border-caramel/50 hover:text-cream"
              >
                <Icon className="text-base text-caramel" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* arch image */}
        <div
          className="anim-fade-up relative mx-auto w-full max-w-[430px] lg:col-span-5"
          style={{ animationDelay: "0.35s" }}
        >
          <div className="relative overflow-hidden rounded-t-[210px] rounded-b-2xl border border-cream/12 shadow-2xl shadow-espresso">
            <img
              src="https://image.qwenlm.ai/generated-images/fede0f58-e5d0-43f6-8baf-8da889b86353/_result.png"
              alt="Заваривание спешелти-кофе в воронке"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
            {/* steam */}
            <div className="absolute left-1/2 top-10 -translate-x-1/2">
              <span className="steam-bit h-8 w-8" style={{ left: "-34px", animationDelay: "0s" }} />
              <span className="steam-bit h-10 w-10" style={{ left: "-8px", animationDelay: "1.1s" }} />
              <span className="steam-bit h-7 w-7" style={{ left: "26px", animationDelay: "2.2s" }} />
            </div>
            <figcaption className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-5 text-xs font-medium uppercase tracking-[0.22em] text-cream/80">
              <span>свежая партия</span>
              <span className="text-honey">вторник · 07:30</span>
            </figcaption>
          </div>
          <RotatingBadge />
        </div>
      </div>

      {/* ticker */}
      <div className="relative border-y border-cream/10 bg-roast/80 py-3.5">
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {TICKER.map((c) => (
                <span
                  key={`${copy}-${c}`}
                  className="flex items-center gap-6 pr-6 text-sm font-semibold uppercase tracking-[0.28em] text-cream/55"
                >
                  {c}
                  <IconBean className="text-base text-caramel" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
