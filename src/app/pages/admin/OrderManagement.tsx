import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Search, Eye, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const orders = [
  { id: "ORD-001", customer: "Emma Wilson", date: "Mar 19, 2026", total: "$142.00", status: "completed", items: 2 },
  { id: "ORD-002", customer: "Sarah Johnson", date: "Mar 19, 2026", total: "$95.00", status: "processing", items: 1 },
  { id: "ORD-003", customer: "Jessica Lee", date: "Mar 18, 2026", total: "$64.00", status: "completed", items: 2 },
  { id: "ORD-004", customer: "Michael Brown", date: "Mar 18, 2026", total: "$125.00", status: "pending", items: 1 },
  { id: "ORD-005", customer: "Lisa Davis", date: "Mar 17, 2026", total: "$237.00", status: "completed", items: 3 },
  { id: "ORD-006", customer: "David Wilson", date: "Mar 17, 2026", total: "$78.00", status: "cancelled", items: 1 },
  { id: "ORD-007", customer: "Jennifer Garcia", date: "Mar 16, 2026", total: "$156.00", status: "processing", items: 2 },
];

export function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
          <p className="text-2xl font-semibold">1,843</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-semibold">28</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Processing</p>
          <p className="text-2xl font-semibold">45</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-semibold">1,770</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell className="font-medium">{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" :
                      order.status === "processing" ? "secondary" :
                      order.status === "cancelled" ? "destructive" :
                      "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
