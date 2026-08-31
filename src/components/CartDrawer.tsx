import {
  fmt,
  FREE_SHIPPING_FROM,
  weightLabel,
  weightPrice,
} from "../data/products";
import type { CartItem } from "../App";
import {
  IconArrowRight,
  IconBasket,
  IconMinus,
  IconPlus,
  IconTrash,
  IconTruck,
  IconX,
} from "./icons";

interface Props {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  items,
  subtotal,
  shipping,
  total,
  onClose,
  onQty,
  onRemove,
  onCheckout,
}: Props) {
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM);
  const left = FREE_SHIPPING_FROM - subtotal;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-espresso/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-caramel/20 bg-paper text-ink shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,0.8,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Корзина"
      >
        {/* head */}
        <div className="flex items-center justify-between border-b border-bark/15 px-6 py-5">
          <h3 className="flex items-center gap-3 font-display text-2xl">
            Корзина
            {items.length > 0 && (
              <span className="rounded-full bg-espresso px-2.5 py-0.5 text-xs font-bold text-honey">
                {items.reduce((s, i) => s + i.qty, 0)} шт
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bark/20 text-lg transition-all hover:border-caramel hover:text-caramel active:scale-90"
          >
            <IconX />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex grow flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-t-full rounded-b-lg bg-cream text-5xl text-tan">
              <IconBasket />
            </span>
            <h4 className="font-display text-2xl">Пока пусто</h4>
            <p className="text-sm leading-relaxed text-muted">
              Загляните в каталог — там шесть свежих лотов, обжаренных на этой неделе.
            </p>
            <a
              href="#catalog"
              onClick={onClose}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-95"
            >
              К каталогу <IconArrowRight />
            </a>
          </div>
        ) : (
          <>
            {/* items */}
            <div className="grow overflow-y-auto px-6 py-5">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-24 w-[76px] shrink-0 rounded-t-[2.2rem] rounded-b-md object-cover"
                    />
                    <div className="flex min-w-0 grow flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-[1.05rem] leading-snug">
                            {item.product.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted">
                            {weightLabel(item.weight)} · {fmt(weightPrice(item.product, item.weight))}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(item.key)}
                          aria-label={`Убрать ${item.product.name}`}
                          className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-cream hover:text-red-800"
                        >
                          <IconTrash />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-bark/25 bg-cream">
                          <button
                            onClick={() => onQty(item.key, item.qty - 1)}
                            aria-label="Меньше"
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:text-caramel"
                          >
                            <IconMinus className="text-sm" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                          <button
                            onClick={() => onQty(item.key, item.qty + 1)}
                            aria-label="Больше"
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:text-caramel"
                          >
                            <IconPlus className="text-sm" />
                          </button>
                        </div>
                        <span className="font-display text-lg">
                          {fmt(weightPrice(item.product, item.weight) * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* footer */}
            <div className="border-t border-bark/15 bg-cream/70 px-6 py-5">
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-muted">
                    <IconTruck className="text-base text-caramel" />
                    {shipping === 0 ? (
                      <span className="text-espresso">Доставка бесплатно</span>
                    ) : (
                      `До бесплатной доставки ${fmt(left)}`
                    )}
                  </span>
                  <span className="text-muted">{fmt(FREE_SHIPPING_FROM)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bark/15">
                  <div
                    className="h-full rounded-full bg-caramel transition-all duration-500 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              <dl className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Подытог</dt>
                  <dd className="font-semibold text-ink">{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Доставка</dt>
                  <dd className="font-semibold text-ink">
                    {shipping === 0 ? "бесплатно" : fmt(shipping)}
                  </dd>
                </div>
                <div className="mt-1 flex justify-between border-t border-bark/15 pt-2.5">
                  <dt className="font-display text-lg">Итого</dt>
                  <dd className="font-display text-lg">{fmt(total)}</dd>
                </div>
              </dl>

              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-espresso py-4 font-bold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-[0.98]"
              >
                Оформить заказ
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onClose}
                className="mt-2.5 w-full py-1 text-center text-xs font-semibold text-muted transition-colors hover:text-caramel"
              >
                или продолжить покупки
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
