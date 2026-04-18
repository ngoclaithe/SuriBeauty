import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function DesignSystemShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Typography</h2>
        <div className="space-y-4">
          <h1>Heading 1 - Premium Design System</h1>
          <h2>Heading 2 - Beautiful & Modern</h2>
          <h3>Heading 3 - Clean Interface</h3>
          <h4>Heading 4 - Attention to Detail</h4>
          <p className="text-muted-foreground">Body text with proper hierarchy and spacing for optimal readability</p>
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Color System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="w-full h-20 bg-primary rounded-lg mb-4" />
            <p className="font-semibold">Primary</p>
            <p className="text-sm text-muted-foreground">Brand color</p>
          </Card>
          <Card className="p-6">
            <div className="w-full h-20 bg-secondary rounded-lg mb-4" />
            <p className="font-semibold">Secondary</p>
            <p className="text-sm text-muted-foreground">Supporting</p>
          </Card>
          <Card className="p-6">
            <div className="w-full h-20 bg-muted rounded-lg mb-4" />
            <p className="font-semibold">Muted</p>
            <p className="text-sm text-muted-foreground">Subtle</p>
          </Card>
          <Card className="p-6">
            <div className="w-full h-20 bg-destructive rounded-lg mb-4" />
            <p className="font-semibold">Destructive</p>
            <p className="text-sm text-muted-foreground">Alerts</p>
          </Card>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Standard Card</h3>
            <p className="text-sm text-muted-foreground">
              Rounded corners with subtle shadow
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Hover Effect</h3>
            <p className="text-sm text-muted-foreground">
              Interactive with smooth transitions
            </p>
          </Card>
          <Card className="p-6 border-primary">
            <h3 className="font-semibold mb-2">Accented Card</h3>
            <p className="text-sm text-muted-foreground">
              Primary border for emphasis
            </p>
          </Card>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Spacing System (8px base)</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded" />
            <span>8px</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-8 bg-primary rounded" />
            <span>16px</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-8 bg-primary rounded" />
            <span>24px</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 h-8 bg-primary rounded" />
            <span>32px</span>
          </div>
        </div>
      </section>
    </div>
  );
}
