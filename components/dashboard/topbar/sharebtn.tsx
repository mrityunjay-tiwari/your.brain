"use client";

import {
  createAllBrainShareLinkHashContent,
  deleteAllShareLinkHashContentById,
} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Check, Copy, Plus, Share} from "lucide-react";
import {useState} from "react";
import {IoMdInformationCircleOutline} from "react-icons/io";

interface ShareButtonProps {
  userId: string;
}
export function ShareBtn(data: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAllBrainShare = async () => {
    const hash = await createAllBrainShareLinkHashContent(data.userId);
    setShareLink(`http://localhost:3000/shareall/${hash.id}`);
  };

  const [isOn, setIsOn] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsOn(checked);

    // 👉 Do something based on switch state
    if (checked) {
      console.log("Switch ON");
      // e.g. enable feature, call API, update theme, etc.
      await deleteAllShareLinkHashContentById(data.userId);
    } else {
      console.log("Switch OFF");
      setShareLink("Loading...");
      const hash = await createAllBrainShareLinkHashContent(data.userId);
      // console.log(hash.id);

      setShareLink(`http://localhost:3000/shareall/${hash.id}`);
      // e.g. disable feature
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-100 hover:cursor-pointer text-blue-600 font-normal flex items-center hover:bg-blue-50 hover:text-blue-600"
            onClick={handleAllBrainShare}
          >
            <Share /> Share Brain
          </Button>
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
              <div className="flex justify-between">
                <Label htmlFor="share-link">Link</Label>
                <div className="flex gap-1.5">
                  <Label
                    htmlFor="airplane-mode"
                    className="cursor-pointer font-normal text-xs text-zinc-400"
                  >
                    {isOn ? "Start Sharing" : "Stop Sharing"}
                  </Label>

                  <Switch
                    id="airplane-mode"
                    checked={isOn}
                    onCheckedChange={handleToggle}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="hover:text-gray-100 hover:cursor-pointer text-gray-400 bg-transparent p-0 hover:bg-transparent"
                        size={"icon-xs"}
                      >
                        <IoMdInformationCircleOutline className="text-zinc-500 h-0.5 w-0.5 scale-[0.8] origin-center" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="">
                      <p className="text-red-600">Stop Sharing Toggle deletes the current link.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Input
                  id="share-link"
                  name="sharelink"
                  readOnly
                  value={isOn ? `` : `${shareLink}`}
                  className="rounded-r-none"
                  placeholder={
                    isOn ? `Start sharing to generate link` : `Loading...`
                  }
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={isOn ? undefined : handleCopy}
                  disabled={isOn}
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
  );
}
