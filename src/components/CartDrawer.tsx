import { useState, useEffect } from "react";
import {
  X,
  Trash2,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Check,
} from "lucide-react";
import type { CartItem, Camera } from "@/types";
import GlideSelect from "@/components/react-bits/Inputs/GlideSelect";

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateDates: (id: string, startDate: string, endDate: string) => void;
  onCheckout: () => void;
}

function calcDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (e < s) return 0;
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function CartDrawer({
  items,
  onClose,
  onRemove,
  onUpdateDates,
  onCheckout,
}: CartDrawerProps) {
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const insurance = Math.round(subtotal * 0.08);
  const total = subtotal + insurance;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 animate-fade-in bg-sky-950/35 backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md animate-slide-right overflow-y-auto border-l border-white/20 bg-sky-950/55 shadow-[0_0_80px_rgba(0,15,35,0.4)] backdrop-blur-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-sky-950/40 px-6 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.5} style={{ filter: "drop-shadow(0 1px 3px rgba(0,10,30,0.5))" }} />
            <span className="text-lg font-semibold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
              Your Cart
            </span>
            <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-white/15 px-2 py-0.5 text-[12px] font-semibold text-white/90 backdrop-blur-md">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {checkingOut ? (
          <CheckoutView total={total} onClose={onClose} />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <ShoppingBag className="h-8 w-8 text-white/50" strokeWidth={1} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
              Your cart is empty
            </h3>
            <p className="mt-2 text-[14px] text-white/75" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
              Browse the catalog and add cameras to start your rental.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] transition-all hover:scale-105"
            >
              Browse catalog
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-4 px-6 py-6">
              {items.map((item) => (
                <CartLine
                  key={item.camera.id}
                  item={item}
                  onRemove={() => onRemove(item.camera.id)}
                  onUpdateDates={(start, end) =>
                    onUpdateDates(item.camera.id, start, end)
                  }
                />
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-white/15 px-6 py-6">
              <div className="space-y-3">
                <Row label="Subtotal" value={`$${subtotal}`} />
                <Row label="Damage protection (8%)" value={`$${insurance}`} />
                <div className="h-px bg-white/20" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
                    Total
                  </span>
                  <span className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
                    ${total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCheckingOut(true)}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-[15px] font-semibold text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] transition-all hover:scale-[1.02] active:scale-95"
              >
                Reserve now
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </button>
              <p className="mt-3 text-center text-[12px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
                Free cancellation up to 48 hours before pickup.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CartLine({
  item,
  onRemove,
  onUpdateDates,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateDates: (start: string, end: string) => void;
}) {
  const [start, setStart] = useState(item.startDate);
  const [end, setEnd] = useState(item.endDate);

  const handleStart = (val: string) => {
    setStart(val);
    onUpdateDates(val, end);
  };

  const handleEnd = (val: string) => {
    setEnd(val);
    onUpdateDates(start, val);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-sky-950/30 p-4 shadow-[0_4px_20px_rgba(0,15,35,0.15)] backdrop-blur-md">
      <div className="flex items-start gap-4">
        <img
          src={item.camera.image}
          alt={item.camera.name}
          className="mt-0.5 h-20 w-20 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="truncate text-[14px] font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>
                {item.camera.name}
              </h4>
              <p className="text-[12px] text-white/70" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.4)" }}>
                {item.camera.brand} · ${item.camera.pricePerDay}/day
              </p>
            </div>
            <button
              onClick={onRemove}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-0 text-white/50 transition-colors hover:bg-red-500/15 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-hidden">
            <Calendar className="h-4 w-4 shrink-0 text-white/60" style={{ filter: "drop-shadow(0 1px 2px rgba(0,10,30,0.4))" }} />
            <div className="flex min-w-0 flex-1 gap-2">
              <input
                type="date"
                value={start}
                min={todayStr()}
                onChange={(e) => handleStart(e.target.value)}
                className="min-w-0 w-full rounded-lg border border-white/15 bg-sky-950/40 px-3 py-2 text-[12px] font-medium text-white outline-none ring-0 backdrop-blur-sm focus:border-white/30 [color-scheme:dark]"
              />
              <input
                type="date"
                value={end}
                min={start}
                onChange={(e) => handleEnd(e.target.value)}
                className="min-w-0 w-full rounded-lg border border-white/15 bg-sky-950/40 px-3 py-2 text-[12px] font-medium text-white outline-none ring-0 backdrop-blur-sm focus:border-white/30 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] text-white/70" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.4)" }}>
              {item.days} {item.days === 1 ? "day" : "days"}
            </span>
            <span className="text-[15px] font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>
              ${item.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>{label}</span>
      <span className="text-[14px] font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>{value}</span>
    </div>
  );
}

function CheckoutView({ total, onClose }: { total: number; onClose: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState("door-delivery");

  const deliveryOptions = [
    { value: "door-delivery", label: "Door delivery" },
    { value: "pickup", label: "In-store pickup" },
  ];

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-32 text-center animate-scale-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 backdrop-blur-md">
          <Check className="h-10 w-10 text-emerald-300" strokeWidth={2.5} style={{ filter: "drop-shadow(0 2px 6px rgba(0,10,30,0.5))" }} />
        </div>
        <h3 className="mt-8 text-2xl font-semibold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
          Reservation confirmed!
        </h3>
        <p className="mt-3 max-w-xs text-[14px] text-white/75" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          We've sent a confirmation to your email. Your gear will be ready for
          pickup or delivery on your selected date.
        </p>
        <button
          onClick={onClose}
          className="mt-8 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] transition-all hover:scale-105"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h3 className="text-xl font-semibold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>Checkout</h3>
      <p className="mt-1 text-[13px] text-white/70" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
        Enter your details to confirm the reservation.
      </p>

      <div className="mt-6 space-y-4">
        <Field label="Full name" placeholder="John Drex F. Cantor" />
        <Field label="Email" placeholder="johndrex@example.com" type="email" />
        <Field label="Phone" placeholder="+63 912 345 6789" type="tel" inputMode="tel"/>
        <div>
          <label className="text-[13px] font-medium text-white/85" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
            Delivery or pickup?
          </label>
          <div className="mt-2">
            <GlideSelect
              options={deliveryOptions}
              value={deliveryMode}
              onChange={(value) => setDeliveryMode(value)}
              ariaLabel="Delivery method"
              showTags={false}
              accentColor="#e2e8f0"
              surfaceColor="rgba(12,30,55,0.6)"
              highlightColor="rgba(30,60,100,0.8)"
              textColor="#f8fafc"
              size="md"
              radius={10}
              menuWidth={220}
              placement="bottom"
              align="left"
              popDuration={180}
              glideDuration={220}
              rememberPosition
              className="w-full [filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))] [&>button]:w-full [&>button]:justify-between [&>button]:border [&>button]:border-white/20 [&>button]:bg-sky-950/40 [&>button]:px-4 [&>button]:py-3 [&>button]:text-[14px] [&>button]:text-white/90 [&>button]:leading-[1.2]"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/20 bg-sky-950/30 p-4 shadow-[0_4px_20px_rgba(0,15,35,0.15)] backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-white/90" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Total to pay</span>
          <span className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>${total}</span>
        </div>
        <p className="mt-1 text-[12px] text-white/70" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          Pay at pickup. No charge now.
        </p>
      </div>

      <button
        onClick={() => setConfirmed(true)}
        className="mt-6 w-full rounded-full bg-white py-4 text-[15px] font-semibold text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] transition-all hover:scale-[1.02] active:scale-95"
      >
        Confirm reservation
      </button>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  inputMode,
}: {
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/20 bg-sky-950/40 px-4 py-3 text-[14px] text-white/95 placeholder:text-white/50 outline-none backdrop-blur-sm focus:border-white/30"
      />
    </div>
  );
}
