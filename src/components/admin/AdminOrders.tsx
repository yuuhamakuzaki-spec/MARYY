import { useState, useMemo } from "react";
import { Search, Eye, Truck, RotateCcw, Package, Clock, CheckCircle2, XCircle, Banknote } from "lucide-react";
import { Button, Select, Textarea, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Modal, Input } from "@/components/admin/ui";
import GlideSelect from "@/components/react-bits/Inputs/GlideSelect";
import { initialOrders, orderStatusOptions, statusToVariant, titleOptions, genderOptions, pronounOptions, type AdminOrder, type OrderStatus } from "@/components/admin/adminData";

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detailOrder, setDetailOrder] = useState<AdminOrder | null>(null);
  const [returnOrder, setReturnOrder] = useState<AdminOrder | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (detailOrder?.id === orderId) {
      setDetailOrder({ ...detailOrder, status });
    }
    showToast(`Order status updated to "${status}".`);
  };

  const generateShippingLabel = (orderId: string) => {
    const label = `LBL-${new Date().toISOString().split("T")[0]}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
    const tracking = `TRK-${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}`;
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, shippingLabel: label, trackingNumber: tracking, status: "Shipped" } : o)));
    if (detailOrder?.id === orderId) {
      setDetailOrder({ ...detailOrder, shippingLabel: label, trackingNumber: tracking, status: "Shipped" });
    }
    showToast(`Shipping label generated: ${label}`);
  };

  const processReturn = () => {
    if (!returnOrder) return;
    setOrders((prev) => prev.map((o) => (o.id === returnOrder.id ? { ...o, status: "Refunded", notes: returnReason ? `Return: ${returnReason}` : o.notes } : o)));
    showToast(`Refund processed for ${returnOrder.orderNumber}.`);
    setReturnOrder(null);
    setReturnReason("");
  };

  const statusIcons: Record<OrderStatus, typeof Clock> = {
    Pending: Clock,
    Processing: Package,
    Shipped: Truck,
    Delivered: CheckCircle2,
    Refunded: Banknote,
    Cancelled: XCircle,
  };
  void statusIcons;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>Order Management</h1>
          <p className="mt-1 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Track orders, generate shipping labels, and process returns.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Package className="h-4 w-4" aria-hidden="true" />
          New Order
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order number, customer name, or email..."
              aria-label="Search orders"
              className="w-full rounded-full border border-white/15 bg-sky-950/40 py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-sky-950/25 px-3 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-md hover:bg-sky-950/40 hover:text-white transition-all duration-300">
            <span className="pl-1 text-[13px] font-medium text-white/90" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.6)" }}>Status</span>
            <GlideSelect
              options={[{ value: "All", label: "All Statuses" }, ...orderStatusOptions.map((s) => ({ value: s, label: s }))]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              ariaLabel="Filter by order status"
              showTags={false}
              accentColor="#f5f5f5"
              surfaceColor="rgba(12,30,55,0.6)"
              highlightColor="rgba(30,60,100,0.8)"
              textColor="#f5f5f5"
              size="sm"
              radius={10}
              menuWidth={140}
              placement="bottom"
              align="left"
              popDuration={180}
              glideDuration={220}
              rememberPosition
              className="[filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))]"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell><span className="font-mono text-xs font-semibold text-white">{order.orderNumber}</span></TableCell>
                <TableCell>
                  <p className="font-medium text-white">{order.customer.fullName}</p>
                  <p className="text-xs text-white/50">{order.customer.email}</p>
                </TableCell>
                <TableCell>
                  <span className="text-[13px] text-white/70">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                </TableCell>
                <TableCell><span className="font-semibold text-white">${order.total}</span></TableCell>
                <TableCell><span className="text-xs text-white/50">{new Date(order.createdAt).toLocaleDateString()}</span></TableCell>
                <TableCell><Badge variant={statusToVariant(order.status)}>{order.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDetailOrder(order)}
                      className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      aria-label={`View ${order.orderNumber} details`}
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </button>
                    {order.status === "Processing" && (
                      <button
                        onClick={() => generateShippingLabel(order.id)}
                        className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-sky-500/15 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-label={`Generate shipping label for ${order.orderNumber}`}
                        title="Generate shipping label"
                      >
                        <Truck className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                    {(order.status === "Delivered" || order.status === "Shipped") && (
                      <button
                        onClick={() => setReturnOrder(order)}
                        className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-amber-500/15 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-label={`Process return for ${order.orderNumber}`}
                        title="Process return/refund"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto h-10 w-10 text-white/20" aria-hidden="true" />
            <p className="mt-3 text-[13px] text-white/50">No orders found matching your filters.</p>
          </div>
        )}
      </Card>

      {detailOrder && (
        <Modal
          open={true}
          onClose={() => setDetailOrder(null)}
          title={`Order ${detailOrder.orderNumber}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setDetailOrder(null)}>Close</Button>
              {detailOrder.status === "Processing" && (
                <Button onClick={() => generateShippingLabel(detailOrder.id)}>
                  <Truck className="h-4 w-4" aria-hidden="true" />
                  Generate Shipping Label
                </Button>
              )}
              {(detailOrder.status === "Delivered" || detailOrder.status === "Shipped") && (
                <Button variant="danger" onClick={() => { setReturnOrder(detailOrder); setDetailOrder(null); }}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Process Return
                </Button>
              )}
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={statusToVariant(detailOrder.status)}>{detailOrder.status}</Badge>
              {detailOrder.trackingNumber && (
                <span className="text-xs text-white/50">Tracking: <span className="font-mono font-medium text-white/80">{detailOrder.trackingNumber}</span></span>
              )}
            </div>

            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <h4 className="mb-2 text-[13px] font-semibold text-white">Customer</h4>
              <dl className="grid grid-cols-2 gap-2 text-[13px]">
                <div><dt className="text-xs text-white/50">Full Name</dt><dd className="font-medium text-white">{detailOrder.customer.fullName}</dd></div>
                <div><dt className="text-xs text-white/50">Title</dt><dd className="font-medium text-white">{detailOrder.customer.title}</dd></div>
                <div><dt className="text-xs text-white/50">Email</dt><dd className="font-medium text-white">{detailOrder.customer.email}</dd></div>
                <div><dt className="text-xs text-white/50">Phone</dt><dd className="font-medium text-white">{detailOrder.customer.phone}</dd></div>
                <div><dt className="text-xs text-white/50">Gender</dt><dd className="font-medium text-white">{detailOrder.customer.gender}</dd></div>
                <div><dt className="text-xs text-white/50">Pronouns</dt><dd className="font-medium text-white">{detailOrder.customer.pronouns}</dd></div>
              </dl>
            </div>

            <div>
              <h4 className="mb-2 text-[13px] font-semibold text-white">Items</h4>
              <ul className="divide-y divide-white/5 rounded-xl border border-white/10">
                {detailOrder.items.map((item, i) => (
                  <li key={i} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-[13px] font-medium text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.qty} x {item.days} days @ ${item.pricePerDay}/day</p>
                    </div>
                    <span className="text-[13px] font-semibold text-white">${item.qty * item.pricePerDay * item.days}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[13px] font-medium text-white/70">Order Total</span>
              <span className="text-xl font-bold text-white">${detailOrder.total}</span>
            </div>

            {detailOrder.notes && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs font-semibold text-amber-200">Notes</p>
                <p className="mt-1 text-[13px] text-amber-200/90">{detailOrder.notes}</p>
              </div>
            )}

            <div>
              <label htmlFor="status-select" className="mb-1.5 block text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Update Order Status</label>
              <div className="inline-flex w-full items-center gap-2 rounded-full border border-white/15 bg-sky-950/25 px-3 py-1.5 backdrop-blur-md hover:bg-sky-950/40 transition-all duration-300">
                <GlideSelect
                  options={orderStatusOptions.map((s) => ({ value: s, label: s }))}
                  value={detailOrder.status}
                  onChange={(value) => updateOrderStatus(detailOrder.id, value as OrderStatus)}
                  ariaLabel="Update order status"
                  showTags={false}
                  accentColor="#f5f5f5"
                  surfaceColor="rgba(12,30,55,0.6)"
                  highlightColor="rgba(30,60,100,0.8)"
                  textColor="#f5f5f5"
                  size="md"
                  radius={10}
                  menuWidth={140}
                  placement="bottom"
                  align="left"
                  popDuration={180}
                  glideDuration={220}
                  rememberPosition
                  className="w-full [filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))] [&>button]:w-full [&>button]:justify-between"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {returnOrder && (
        <Modal
          open={true}
          onClose={() => { setReturnOrder(null); setReturnReason(""); }}
          title={`Process Return - ${returnOrder.orderNumber}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => { setReturnOrder(null); setReturnReason(""); }}>Cancel</Button>
              <Button variant="danger" onClick={processReturn}>
                <Banknote className="h-4 w-4" aria-hidden="true" />
                Issue Refund (${returnOrder.total})
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
              <p className="text-[13px] text-white/70">Customer: <span className="font-medium text-white">{returnOrder.customer.fullName}</span></p>
              <p className="text-[13px] text-white/70">Refund Amount: <span className="font-semibold text-white">${returnOrder.total}</span></p>
            </div>
            <Textarea
              label="Return/Refund Reason"
              name="returnReason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              rows={3}
              placeholder="e.g. Item returned damaged, customer cancellation, weather event..."
            />
            <p className="text-xs text-white/50">The order status will be updated to "Refunded" and the refund will be recorded.</p>
          </div>
        </Modal>
      )}

      {createOpen && (
        <NewOrderModal
          onClose={() => setCreateOpen(false)}
          onCreate={(order) => {
            setOrders((prev) => [order, ...prev]);
            showToast(`Order ${order.orderNumber} created.`);
            setCreateOpen(false);
          }}
          existingCount={orders.length}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/10 bg-sky-950/60 px-4 py-3 text-[13px] font-medium text-white shadow-[0_8px_32px_rgba(0,15,35,0.3)] backdrop-blur-xl animate-slide-down" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

function NewOrderModal({ onClose, onCreate, existingCount }: { onClose: () => void; onCreate: (order: AdminOrder) => void; existingCount: number }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("No Title");
  const [gender, setGender] = useState("Prefer Not to Say");
  const [genderSelfDescribe, setGenderSelfDescribe] = useState("");
  const [pronouns, setPronouns] = useState("they/them");
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("1");
  const [days, setDays] = useState("1");
  const [pricePerDay, setPricePerDay] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!fullName.trim()) e2.fullName = "Full name is required.";
    if (!email.includes("@")) e2.email = "A valid email is required.";
    if (!productName.trim()) e2.productName = "Product name is required.";
    const ppd = parseFloat(pricePerDay);
    if (isNaN(ppd) || ppd <= 0) e2.pricePerDay = "Price must be a positive number.";
    const q = parseInt(qty) || 0;
    const d = parseInt(days) || 0;
    if (q < 1) e2.qty = "Quantity must be at least 1.";
    if (d < 1) e2.days = "Days must be at least 1.";
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    const total = q * ppd * d;
    const order: AdminOrder = {
      id: `o${Date.now()}`,
      orderNumber: `CRS-${(1006 + existingCount).toString()}`,
      customer: {
        fullName,
        email,
        phone,
        title,
        gender: gender === "Self-Describe" ? genderSelfDescribe : gender,
        pronouns,
      },
      items: [{ productId: `tmp-${Date.now()}`, name: productName, qty: q, pricePerDay: ppd, days: d }],
      status: "Pending",
      total,
      createdAt: new Date().toISOString(),
      trackingNumber: null,
      shippingLabel: null,
      notes: "",
    };
    onCreate(order);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="Create New Order"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="new-order-form">Create Order</Button>
        </>
      }
    >
      <form id="new-order-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h4 className="mb-3 text-[13px] font-semibold text-white" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Customer Information</h4>
          <div className="space-y-3">
            <Input label="Full Name" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} required />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
              <Input label="Phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}>
                {titleOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
              <Select label="Pronouns" name="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)}>
                {pronounOptions.map((p) => <option key={p} value={p}>{p}</option>)}
              </Select>
            </div>
            <Select label="Gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
            </Select>
            {gender === "Self-Describe" && (
              <Input label="Self-Described Gender" name="genderSelf" value={genderSelfDescribe} onChange={(e) => setGenderSelfDescribe(e.target.value)} placeholder="Please specify" />
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="mb-3 text-[13px] font-semibold text-white" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Rental Item</h4>
          <div className="space-y-3">
            <Input label="Product Name" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} error={errors.productName} required />
            <div className="grid grid-cols-3 gap-3">
              <Input label="Quantity" name="qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} error={errors.qty} required />
              <Input label="Days" name="days" type="number" min="1" value={days} onChange={(e) => setDays(e.target.value)} error={errors.days} required />
              <Input label="Price/Day ($)" name="pricePerDay" type="number" min="0" step="1" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} error={errors.pricePerDay} required />
            </div>
            {pricePerDay && qty && days && !isNaN(parseFloat(pricePerDay)) && (
              <div className="flex items-center justify-between rounded-xl bg-sky-500/10 px-4 py-2.5 backdrop-blur-sm">
                <span className="text-[13px] font-medium text-sky-300">Order Total</span>
                <span className="text-lg font-bold text-white">
                  ${(parseInt(qty) || 0) * (parseFloat(pricePerDay) || 0) * (parseInt(days) || 0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
