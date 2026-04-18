import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Upload, Search, Grid3x3, List, Image, Trash2, Download, Eye } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const mediaFiles = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "vitamin-c-serum.jpg",
    size: "2.4 MB",
    type: "image",
    uploaded: "Mar 15, 2026",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1773372238324-e9cffa5f45b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczODU0MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "lipstick-product.jpg",
    size: "1.8 MB",
    type: "image",
    uploaded: "Mar 14, 2026",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "night-cream.jpg",
    size: "3.1 MB",
    type: "image",
    uploaded: "Mar 13, 2026",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1648208567967-19e0b7b10066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwYm90dGxlfGVufDF8fHx8MTc3Mzg0MzMwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "perfume-bottle.jpg",
    size: "2.7 MB",
    type: "image",
    uploaded: "Mar 12, 2026",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1629380106682-6736d2c327ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3Mzg5MzA4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "skincare-collection.jpg",
    size: "4.2 MB",
    type: "image",
    uploaded: "Mar 11, 2026",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1583012279653-1575246476c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBzaGFkb3clMjBwYWxldHRlJTIwbWFrZXVwfGVufDF8fHx8MTc3Mzc5MDA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "eye-palette.jpg",
    size: "1.9 MB",
    type: "image",
    uploaded: "Mar 10, 2026",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1759693164491-01acd5831b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwbWFrZXVwfGVufDF8fHx8MTc3Mzg1NDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "makeup-application.jpg",
    size: "3.5 MB",
    type: "image",
    uploaded: "Mar 9, 2026",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1662577066108-4bb081e818b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjB3b21hbnxlbnwxfHx8fDE3NzM4Mzk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "skincare-routine.jpg",
    size: "2.8 MB",
    type: "image",
    uploaded: "Mar 8, 2026",
  },
];

export function MediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const toggleFileSelection = (id: number) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and files</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Files</p>
          <p className="text-2xl font-semibold">{mediaFiles.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Size</p>
          <p className="text-2xl font-semibold">23.4 MB</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Images</p>
          <p className="text-2xl font-semibold">{mediaFiles.filter(f => f.type === 'image').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
          <p className="text-2xl font-semibold">2.3%</p>
        </Card>
      </div>

      {/* Upload Zone */}
      <Card className="p-8">
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Drag and drop files here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse your computer</p>
          <Button>Select Files</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: JPG, PNG, GIF, SVG up to 10MB
          </p>
        </div>
      </Card>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge>{selectedFiles.length} selected</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Media Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaFiles.map((file) => (
            <Card
              key={file.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleFileSelection(file.id)}
            >
              <div className="relative aspect-square bg-gray-100 group">
                <ImageWithFallback
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {selectedFiles.includes(file.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{file.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{file.size}</span>
                  <Badge variant="outline" className="text-xs">
                    <Image className="h-3 w-3 mr-1" />
                    {file.type}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-border">
            {mediaFiles.map((file) => (
              <div
                key={file.id}
                className={`p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer ${
                  selectedFiles.includes(file.id) ? 'bg-primary/5' : ''
                }`}
                onClick={() => toggleFileSelection(file.id)}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.uploaded}</span>
                    <Badge variant="outline" className="text-xs">
                      {file.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
