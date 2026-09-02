import Reveal from "./Reveal";
import {
  IconArrowRight,
  IconBasket,
  IconFlame,
  IconGrinder,
  IconMountain,
  IconTruck,
} from "./icons";

const STEPS = [
  {
    icon: IconBasket,
    title: "Вы заказываете",
    text: "Принимаем заказы до 20:00 понедельника и среды — и в тот же вечер выкупаем зелёное зерно под ваш объём у проверенных импортёров.",
  },
  {
    icon: IconFlame,
    title: "Мы обжариваем",
    text: "Вторник и четверг — дни огня. Жарим на Probat 1965 года малыми партиями по 12 кг, каждую пробуем на каппинге и сверяем с профилем.",
  },
  {
    icon: IconGrinder,
    title: "Зерно отдыхает",
    text: "48 часов дегазации — и только потом упаковываем. Так к вам приедет кофе на пике вкуса, а не «только из печи».",
  },
  {
    icon: IconTruck,
    title: "Едет к вам",
    text: "Самовывоз из обжарочной в Москве или доставка по России за 1–3 дня. Помол под ваш метод заваривания — бесплатно.",
  },
];

export default function RoastSection() {
  return (
    <section id="roast" className="relative scroll-mt-20 overflow-hidden bg-espresso py-16 text-cream lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-a absolute -right-32 top-0 h-[360px] w-[360px] rounded-full bg-caramel/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <Reveal className="lg:col-span-5">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-caramel">
            <span className="inline-block h-px w-10 bg-caramel" />
            процесс
          </p>
          <h2 className="font-display text-4xl leading-[1.12] sm:text-5xl">
            Жарим под заказ, <span className="text-honey">а не на склад</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cream/60">
            Спешелти живёт недолго: пик вкуса — с 4-го по 45-й день после обжарки.
            Поэтому у нас нет «залежавшихся» пачек — каждая упаковка проходит путь
            от зелёного зерна до вашей чашки за четыре шага.
          </p>
          <div className="mt-8 flex items-center gap-4 rounded-lg border border-cream/12 bg-roast/70 p-5">
            <IconMountain className="shrink-0 text-3xl text-caramel" />
            <p className="text-sm leading-relaxed text-cream/70">
              <span className="font-semibold text-cream">Probat UG-15, 1965 г.</span> — наш
              главный инструмент. Старый чугун держит тепло так, как не умеют новые машины.
            </p>
          </div>
          <a
            href="#catalog"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-caramel px-7 py-3.5 font-semibold text-espresso transition-all hover:bg-honey active:scale-95"
          >
            Выбрать зерно
            <IconArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 110}>
              <div className="group border-t border-cream/15 pt-6 transition-colors hover:border-caramel/60">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl text-caramel/80 transition-colors group-hover:text-honey">
                    0{i + 1}
                  </span>
                  <Icon className="text-2xl text-cream/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-caramel" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
