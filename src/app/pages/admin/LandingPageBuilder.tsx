import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Plus, GripVertical, Eye, Save, Trash2, Type, Image as ImageIcon, Package, Clock, MessageSquare, Mail } from "lucide-react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const blockTypes = [
  { id: "hero", name: "Hero Section", icon: Type },
  { id: "text", name: "Text Block", icon: Type },
  { id: "image", name: "Image", icon: ImageIcon },
  { id: "product", name: "Product", icon: Package },
  { id: "countdown", name: "Countdown", icon: Clock },
  { id: "review", name: "Review", icon: MessageSquare },
  { id: "form", name: "Form", icon: Mail },
];

interface Block {
  id: string;
  type: string;
  content: any;
}

function BlockItem({ block, index }: { block: Block; index: number }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'block',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        // Handle reordering
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-white border border-border rounded-lg p-4 mb-3 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium capitalize">{block.type}</p>
            <p className="text-xs text-muted-foreground">Block {index + 1}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

export function LandingPageBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'hero', content: {} },
    { id: '2', type: 'text', content: {} },
    { id: '3', type: 'product', content: {} },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Landing Page Builder</h1>
            <p className="text-muted-foreground">Create and customize landing pages</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Blocks Panel */}
          <Card className="lg:col-span-3 p-6">
            <h3 className="font-semibold mb-4">Add Blocks</h3>
            <div className="space-y-2">
              {blockTypes.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <button
                    key={blockType.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{blockType.name}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Canvas */}
          <Card className="lg:col-span-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Page Canvas</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Block
              </Button>
            </div>

            {/* Preview Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 min-h-[600px] bg-gray-50">
              {blocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No blocks added yet</p>
                  <p className="text-sm text-muted-foreground">Start by adding blocks from the left panel</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blocks.map((block, index) => (
                    <BlockItem key={block.id} block={block} index={index} />
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Properties Panel */}
          <Card className="lg:col-span-3 p-6">
            <h3 className="font-semibold mb-4">Block Properties</h3>
            
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 mt-4">
                <div>
                  <Label>Heading</Label>
                  <Input placeholder="Enter heading" className="mt-2" />
                </div>
                <div>
                  <Label>Subheading</Label>
                  <Input placeholder="Enter subheading" className="mt-2" />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input placeholder="Enter button text" className="mt-2" />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input placeholder="Enter URL" className="mt-2" />
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="space-y-4 mt-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2 mt-2">
                    <div className="w-10 h-10 bg-white border-2 border-border rounded-lg cursor-pointer" />
                    <div className="w-10 h-10 bg-gray-100 border-2 border-border rounded-lg cursor-pointer" />
                    <div className="w-10 h-10 bg-primary border-2 border-border rounded-lg cursor-pointer" />
                  </div>
                </div>
                <div>
                  <Label>Padding</Label>
                  <Input type="number" placeholder="16" className="mt-2" />
                </div>
                <div>
                  <Label>Text Alignment</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex-1">Left</Button>
                    <Button variant="outline" size="sm" className="flex-1">Center</Button>
                    <Button variant="outline" size="sm" className="flex-1">Right</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Saved Pages */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Saved Landing Pages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Spring Sale 2026", url: "/landing/spring-sale", status: "published" },
              { name: "New Product Launch", url: "/landing/new-launch", status: "draft" },
              { name: "Black Friday", url: "/landing/black-friday", status: "scheduled" },
            ].map((page, index) => (
              <Card key={index} className="p-4 border border-border">
                <div className="aspect-video bg-gray-100 rounded-lg mb-3" />
                <h4 className="font-medium mb-1">{page.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{page.url}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{page.status}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DndProvider>
  );
}
