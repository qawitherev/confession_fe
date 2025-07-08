import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const ShadcnDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Shadcn UI Components Demo</h1>
        <p className="text-muted-foreground">Demonstration of shadcn/ui components in the confession app</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
            <CardDescription>This is a basic card component with header, content, and footer.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area where you can place any content.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Action</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Card</CardTitle>
            <CardDescription>Demonstration of form elements within a card.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Input Field</Label>
              <Input 
                id="demo-input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Textarea Field</Label>
              <Textarea 
                id="demo-textarea"
                placeholder="Enter a longer text..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="demo-switch"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="demo-switch">Enable notifications</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit Form</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges & Buttons</CardTitle>
            <CardDescription>Various badge and button variants.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Badge Variants:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Button Variants:</h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs Component</CardTitle>
          <CardDescription>Example of the tabs component with different content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p>This is the overview tab content. Shadcn/ui components are now fully integrated into the confession app.</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Available Components:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Button - Various variants and sizes</li>
                  <li>Card - Structured content containers</li>
                  <li>Input - Form input fields</li>
                  <li>Label - Form labels</li>
                  <li>Textarea - Multi-line text input</li>
                  <li>Badge - Status and tag indicators</li>
                  <li>Switch - Toggle switches</li>
                  <li>Tabs - Tabbed navigation</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <p>Configuration options and preferences would go here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShadcnDemo;