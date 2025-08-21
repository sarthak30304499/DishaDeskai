'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="sticky top-20 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot />
                </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Gemini Guidance</CardTitle>
              <CardDescription>Your AI Career Advisor</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-card text-sm">
                <p>Hi! How can I help you with your career today? Ask me about resume tips, interview prep, or career paths.</p>
            </div>
        </CardContent>
        <CardFooter>
          <div className="relative w-full">
            <Input placeholder="Ask Gemini..." className="pr-10" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">
                <Send className="h-4 w-4"/>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>People you may know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png?text=AV" data-ai-hint="person" />
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">Ananya Verma</p>
                    <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Connect</Button>
            </div>
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png?text=RS" data-ai-hint="person" />
                    <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">Rohan Sharma</p>
                    <p className="text-sm text-muted-foreground">Product Manager at Microsoft</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Connect</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  )
}
