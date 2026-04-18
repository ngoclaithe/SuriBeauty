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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const posts = [
  { id: 1, title: "The Complete Morning Skincare Routine", category: "Skincare", author: "Dr. Emily Chen", date: "Mar 15, 2026", status: "published", views: 1234 },
  { id: 2, title: "10 Natural Ingredients for Beautiful Skin", category: "Natural Beauty", author: "Sarah Martinez", date: "Mar 12, 2026", status: "published", views: 892 },
  { id: 3, title: "Makeup Tutorial for Beginners", category: "Makeup", author: "Jessica Kim", date: "Mar 10, 2026", status: "published", views: 1567 },
  { id: 4, title: "Why Vitamin C Should Be in Your Routine", category: "Skincare", author: "Dr. Emily Chen", date: "Mar 8, 2026", status: "published", views: 2103 },
  { id: 5, title: "Spring Makeup Trends 2026", category: "Makeup", author: "Jessica Kim", date: "Mar 1, 2026", status: "draft", views: 0 },
];

export function BlogManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Create and manage blog content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Posts</p>
          <p className="text-2xl font-semibold">156</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Published</p>
          <p className="text-2xl font-semibold">134</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Drafts</p>
          <p className="text-2xl font-semibold">22</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Views</p>
          <p className="text-2xl font-semibold">45.2K</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="skincare">Skincare</SelectItem>
              <SelectItem value="makeup">Makeup</SelectItem>
              <SelectItem value="natural">Natural Beauty</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Posts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell className="text-muted-foreground">{post.author}</TableCell>
                <TableCell className="text-muted-foreground">{post.date}</TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
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
    </div>
  );
}
