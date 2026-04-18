import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Tag, Edit, Trash2, Copy } from "lucide-react";

const vouchers = [
  { id: 1, code: "SPRING40", discount: "40%", type: "percentage", usage: "234/1000", status: "active", expires: "Apr 30, 2026" },
  { id: 2, code: "WELCOME10", discount: "$10", type: "fixed", usage: "1,234/unlimited", status: "active", expires: "Never" },
  { id: 3, code: "FREESHIP", discount: "Free Shipping", type: "shipping", usage: "567/2000", status: "active", expires: "May 15, 2026" },
  { id: 4, code: "SUMMER25", discount: "25%", type: "percentage", usage: "0/500", status: "scheduled", expires: "Jul 31, 2026" },
];

const campaigns = [
  { id: 1, name: "Spring Sale Email", type: "Email", sent: "12,450", opened: "8,234", clicked: "3,123", date: "Mar 15, 2026" },
  { id: 2, name: "New Product Launch", type: "Email", sent: "10,200", opened: "6,891", clicked: "2,456", date: "Mar 10, 2026" },
  { id: 3, name: "Cart Abandonment", type: "Automated", sent: "1,234", opened: "892", clicked: "445", date: "Ongoing" },
];

export function MarketingManagement() {
  const [isCreateVoucherOpen, setIsCreateVoucherOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Marketing</h1>
        <p className="text-muted-foreground">Manage vouchers, campaigns, and promotions</p>
      </div>

      <Tabs defaultValue="vouchers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        {/* Vouchers Tab */}
        <TabsContent value="vouchers" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Create and manage discount vouchers</p>
            <Dialog open={isCreateVoucherOpen} onOpenChange={setIsCreateVoucherOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Voucher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Voucher</DialogTitle>
                  <DialogDescription>Set up a new discount voucher for customers</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="voucherCode">Voucher Code</Label>
                    <Input id="voucherCode" placeholder="e.g. SAVE20" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="discountType">Discount Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="shipping">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="discountValue">Discount Value</Label>
                      <Input id="discountValue" placeholder="20" className="mt-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input id="usageLimit" type="number" placeholder="1000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" type="date" className="mt-2" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateVoucherOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsCreateVoucherOpen(false)}>Create Voucher</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-mono font-semibold">{voucher.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{voucher.discount}</TableCell>
                    <TableCell className="capitalize">{voucher.type}</TableCell>
                    <TableCell>{voucher.usage}</TableCell>
                    <TableCell className="text-muted-foreground">{voucher.expires}</TableCell>
                    <TableCell>
                      <Badge variant={voucher.status === "active" ? "default" : "secondary"}>
                        {voucher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Email campaigns and automated workflows</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Sent</p>
              <p className="text-2xl font-semibold">23.9K</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Opened</p>
              <p className="text-2xl font-semibold">16.0K</p>
              <p className="text-xs text-green-600">66.9% rate</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Clicked</p>
              <p className="text-2xl font-semibold">6.0K</p>
              <p className="text-xs text-green-600">25.1% rate</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Revenue</p>
              <p className="text-2xl font-semibold">$45.2K</p>
            </Card>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Opened</TableHead>
                  <TableHead>Clicked</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </TableCell>
                    <TableCell>{campaign.sent}</TableCell>
                    <TableCell>{campaign.opened}</TableCell>
                    <TableCell>{campaign.clicked}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
