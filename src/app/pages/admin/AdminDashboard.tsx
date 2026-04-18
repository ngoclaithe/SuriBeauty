import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Package, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,843",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    title: "Total Customers",
    value: "8,492",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Products",
    value: "267",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
];

const revenueData = [
  { month: 'Jan', revenue: 28000 },
  { month: 'Feb', revenue: 32000 },
  { month: 'Mar', revenue: 35000 },
  { month: 'Apr', revenue: 38000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 45000 },
];

const ordersData = [
  { day: 'Mon', orders: 45 },
  { day: 'Tue', orders: 52 },
  { day: 'Wed', orders: 48 },
  { day: 'Thu', orders: 61 },
  { day: 'Fri', orders: 55 },
  { day: 'Sat', orders: 67 },
  { day: 'Sun', orders: 72 },
];

const recentOrders = [
  { id: "ORD-001", customer: "Emma Wilson", product: "Radiance Vitamin C Serum", amount: "$78.00", status: "completed" },
  { id: "ORD-002", customer: "Sarah Johnson", product: "Luxury Night Cream", amount: "$95.00", status: "processing" },
  { id: "ORD-003", customer: "Jessica Lee", product: "Velvet Matte Lipstick", amount: "$32.00", status: "completed" },
  { id: "ORD-004", customer: "Michael Brown", product: "Noir Eau de Parfum", amount: "$125.00", status: "pending" },
  { id: "ORD-005", customer: "Lisa Davis", product: "Hydrating Day Moisturizer", amount: "$68.00", status: "completed" },
];

const topProducts = [
  { name: "Radiance Vitamin C Serum", sales: 342, revenue: "$26,676" },
  { name: "Luxury Night Cream", sales: 289, revenue: "$27,455" },
  { name: "Velvet Matte Lipstick", sales: 267, revenue: "$8,544" },
  { name: "Noir Eau de Parfum", sales: 198, revenue: "$24,750" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{kpi.title}</p>
              <p className="text-3xl font-semibold">{kpi.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders Chart */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Recent Orders</h3>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm mb-1">{order.amount}</p>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" :
                      order.status === "processing" ? "secondary" :
                      "outline"
                    }
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Top Products</h3>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
