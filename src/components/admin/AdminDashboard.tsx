import { useMemo } from "react";
import { Package, ShoppingCart, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/admin/ui";
import { initialProducts, initialOrders, statusToVariant, type OrderStatus } from "@/components/admin/adminData";

export function AdminDashboard() {
  const products = initialProducts;
  const orders = initialOrders;

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "Cancelled" && o.status !== "Refunded")
      .reduce((sum, o) => sum + o.total, 0);
    const activeOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
    const lowStock = products.filter((p) => p.stock <= p.lowStockThreshold).length;
    return {
      totalProducts: products.length,
      activeOrders,
      totalRevenue,
      lowStock,
    };
  }, [products, orders]);

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts.toString(), icon: Package, trend: "+2 this week", trendUp: true },
    { label: "Active Orders", value: stats.activeOrders.toString(), icon: ShoppingCart, trend: "+5% vs last week", trendUp: true },
    { label: "Revenue (MTD)", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "+12% vs last month", trendUp: true },
    { label: "Low Stock Alerts", value: stats.lowStock.toString(), icon: AlertTriangle, trend: "Needs attention", trendUp: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>Dashboard</h1>
        <p className="mt-1 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Overview of your store operations and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-medium text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>{stat.value}</p>
                  <p className={`mt-1 flex items-center gap-1 text-xs ${stat.trendUp ? "text-emerald-400" : "text-amber-400"}`}>
                    {stat.trendUp ? <TrendingUp className="h-3 w-3" aria-hidden="true" /> : <TrendingDown className="h-3 w-3" aria-hidden="true" />}
                    {stat.trend}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-sky-300" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-[13px] font-semibold text-white">{order.orderNumber}</p>
                    <p className="text-xs text-white/50">{order.customer.fullName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-white/80">${order.total}</span>
                    <Badge variant={statusToVariant(order.status as OrderStatus)}>{order.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Low Stock Alerts</CardTitle>
              {lowStockProducts.length > 0 && <Badge variant="warning">{lowStockProducts.length} items</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="py-4 text-center text-[13px] text-white/50">All products are well stocked.</p>
            ) : (
              <ul className="space-y-3">
                {lowStockProducts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.imageAlt} className="h-10 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="text-[13px] font-semibold text-white">{p.name}</p>
                        <p className="text-xs text-white/50">SKU: {p.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-white">{p.stock}</p>
                      <p className="text-xs text-white/50">in stock</p>
                    </div>
                    <Badge variant={p.stock === 0 ? "danger" : "warning"}>
                      {p.stock === 0 ? "Out of Stock" : "Low Stock"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {(["Pending", "Processing", "Shipped", "Delivered", "Refunded", "Cancelled"] as OrderStatus[]).map((status) => {
              const count = orders.filter((o) => o.status === status).length;
              return (
                <div key={status} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                  <div className="mb-2 flex justify-center">
                    <Badge variant={statusToVariant(status)}>{status}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>{count}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
