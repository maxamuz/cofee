import { useState } from "react";
import {
  CATEGORIES,
  fmt,
  roastName,
  weightPrice,
  WEIGHTS,
  type Product,
  type Weight,
} from "../data/products";
import {
  IconBasket,
  IconCheck,
  IconDrop,
  IconLeaf,
  IconMinus,
  IconMountain,
  IconPlus,
  IconStar,
  IconTruck,
  IconX,
} from "./icons";

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, weight: Weight, qty: number) => void;
}

export default function ProductModal({ product: p, onClose, onAdd }: Props) {
  const [weight, setWeight] = useState<Weight>(250);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unit = weightPrice(p, weight);
  const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label ?? "";

  const handleAdd = () => {
    onAdd(p, weight, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
    >
      <div
        className="fixed inset-0 bg-espresso/75 backdrop-blur-sm"
        style={{ animation: "fade 0.3s ease both" }}
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="toast-in relative grid w-full max-w-4xl overflow-hidden rounded-lg border border-caramel/25 bg-paper text-ink shadow-2xl md:grid-cols-2"
          style={{ animationDuration: "0.4s" }}
        >
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-espresso/85 text-lg text-cream backdrop-blur transition-all hover:bg-caramel hover:text-espresso active:scale-90"
          >
            <IconX />
          </button>

          {/* image */}
          <div className="relative overflow-hidden bg-paper">
            <img
              src={p.image}
              alt={p.name}
              className="h-56 w-full object-cover md:h-full md:min-h-[560px]"
            />
            {p.badge && (
              <span
                className={`absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
                  p.badge === "new" ? "bg-honey text-espresso" : "bg-espresso text-honey"
                }`}
              >
                {p.badge === "new" ? "Новинка" : "Хит недели"}
              </span>
            )}
          </div>

          {/* details */}
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">
              {catLabel} · {p.country}
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.region}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-caramel/40 bg-cream px-3 py-1.5 text-sm font-medium"
                >
                  {n}
                </span>
              ))}
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-ink/85">{p.description}</p>

            {/* specs */}
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 rounded-md border border-bark/20 bg-cream p-4 sm:p-5">
              {[
                { icon: IconDrop, label: "Обработка", value: p.process },
                { icon: IconMountain, label: "Высота", value: p.altitude },
                { icon: IconLeaf, label: "Разновидность", value: p.variety },
                { icon: IconStar, label: "Оценка SCA", value: `${p.sca} / 100` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 shrink-0 text-lg text-caramel" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </p>
                    <p className="text-sm font-semibold leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* roast meter */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold">{roastName(p.roast)}</span>
              <span className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`h-2 w-7 rounded-full transition-colors ${
                      i <= p.roast ? "bg-bark" : "bg-bark/20"
                    }`}
                  />
                ))}
              </span>
            </div>

            {/* weight */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Вес упаковки
              </p>
              <div className="flex gap-2">
                {WEIGHTS.map((w) => (
                  <button
                    key={w.value}
                    onClick={() => setWeight(w.value)}
                    className={`flex-1 rounded-md border px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                      weight === w.value
                        ? "border-espresso bg-espresso text-honey"
                        : "border-bark/25 bg-cream hover:border-caramel"
                    }`}
                  >
                    {w.label}
                    <span className={`block text-xs font-medium ${weight === w.value ? "text-cream/60" : "text-muted"}`}>
                      {fmt(weightPrice(p, w.value))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* qty + add */}
            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-bark/25 bg-cream">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Меньше"
                  className="flex h-full w-11 items-center justify-center text-lg transition-colors hover:text-caramel disabled:opacity-30"
                >
                  <IconMinus />
                </button>
                <span className="w-8 text-center font-display text-lg">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  disabled={qty >= 10}
                  aria-label="Больше"
                  className="flex h-full w-11 items-center justify-center text-lg transition-colors hover:text-caramel disabled:opacity-30"
                >
                  <IconPlus />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-bold transition-all active:scale-95 ${
                  added
                    ? "bg-caramel text-espresso"
                    : "bg-espresso text-cream hover:bg-caramel hover:text-espresso"
                }`}
              >
                {added ? (
                  <>
                    <IconCheck className="text-lg" /> Добавлено
                  </>
                ) : (
                  <>
                    <IconBasket className="text-lg" /> В корзину · {fmt(unit * qty)}
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-muted">
              <IconTruck className="shrink-0 text-base text-caramel" />
              Отправляем в течение 1–3 дней после обжарки · помол под ваш метод — бесплатно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
