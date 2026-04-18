import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Search, Eye, Mail } from "lucide-react";

const customers = [
  { id: 1, name: "Emma Wilson", email: "emma.w@email.com", orders: 12, spent: "$1,234", joined: "Jan 2026", status: "active" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", orders: 8, spent: "$856", joined: "Feb 2026", status: "active" },
  { id: 3, name: "Jessica Lee", email: "jessica.l@email.com", orders: 15, spent: "$1,678", joined: "Dec 2025", status: "vip" },
  { id: 4, name: "Michael Brown", email: "michael.b@email.com", orders: 3, spent: "$342", joined: "Mar 2026", status: "active" },
  { id: 5, name: "Lisa Davis", email: "lisa.d@email.com", orders: 20, spent: "$2,145", joined: "Nov 2025", status: "vip" },
  { id: 6, name: "David Wilson", email: "david.w@email.com", orders: 1, spent: "$78", joined: "Mar 2026", status: "new" },
];

export function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Customers</h1>
        <p className="text-muted-foreground">Manage your customer base</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
          <p className="text-2xl font-semibold">8,492</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">New This Month</p>
          <p className="text-2xl font-semibold">342</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">VIP Customers</p>
          <p className="text-2xl font-semibold">156</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Avg. Order Value</p>
          <p className="text-2xl font-semibold">$127</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Selected
          </Button>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell className="font-medium">{customer.spent}</TableCell>
                <TableCell className="text-muted-foreground">{customer.joined}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "vip" ? "default" :
                      customer.status === "new" ? "secondary" :
                      "outline"
                    }
                  >
                    {customer.status}
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
