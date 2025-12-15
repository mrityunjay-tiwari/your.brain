"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy, Plus, Share } from "lucide-react"
import { useState } from "react"

export function ShareBtn() {

  const [copied, setCopied] = useState(false);
  
    const shareLink = `http://localhost:3000/shareall/`;
  
    const handleCopy = async () => {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-blue-100 text-blue-600 font-normal flex items-center hover:bg-blue-50 hover:text-blue-600"><Share /> Share Brain</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share yourBrain</DialogTitle>
              <DialogDescription>
                Share your entire Brain Dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {/* <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div> */}
              <div className="grid gap-3">
                <Label htmlFor="share-link">Link</Label>
                <div className="flex items-center justify-center">
                  <Input
                    id="share-link"
                    name="sharelink"
                    
                    readOnly
                    value={`http://localhost:3000/shareall/`}
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={handleCopy}
                    className="border border-l-0 rounded-l-none p-0 bg-zinc-900"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500 transition-colors" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* <Button type="submit">Save changes</Button> */}
            </DialogFooter>
          </DialogContent>
      </form>
    </Dialog>
  )
}


