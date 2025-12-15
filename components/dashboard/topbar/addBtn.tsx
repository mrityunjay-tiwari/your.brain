"use client";

import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Brain, Link as LinkIcon, Plus, Share2, Trash2, X} from "lucide-react";

// Initial data
const initialCardData = {
  title: "Claude funny update",
  description:
    "Claude giving code without asking for is like forcing you to code the way it wants",
  tweetId: "1992261354674356242",
};

export function AddContentOldFunctionNotBeingUsed() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardData, setCardData] = useState(initialCardData);

  // Form state
  const [formData, setFormData] = useState(initialCardData);
  const [descCharCount, setDescCharCount] = useState(
    initialCardData.description.length
  );

  // Open dialog logic
  const handleCardClick = () => {
    setFormData(cardData);
    setDescCharCount(cardData.description.length);
    setIsDialogOpen(true);
  };

  // Stop click propagation for buttons/embeds
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const allowPropagation = (e: React.MouseEvent) => {
    setIsDialogOpen(false);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    if (name === "description") {
      setDescCharCount(value.length);
    }
    setFormData((prev) => ({...prev, [name]: value}));
  };

  // Submit logic
  const handleSubmit = () => {
    setCardData(formData);
    setIsDialogOpen(false);
  };

  const handleReset = () => {
    setFormData(cardData);
    setDescCharCount(cardData.description.length);
  };

  return (
    // Outer container: Full screen height to center the card, but doesn't force card height
    <>
      <div className="">
        <Button
          onClick={handleCardClick}
          variant="outline"
          className="bg-blue-600 text-white font-normal flex items-center hover:bg-blue-400 hover:text-white"
        >
          <Plus /> AddContent
        </Button>
        {/* --- Edit Dialog (Same as before) --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[450px] p-6 rounded-xl">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-lg font-bold">
                Add Content
              </DialogTitle>
              {/* <DialogClose className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose> */}
            </DialogHeader>

            <div className="grid gap-5 py-2">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="h-10 text-sm border-gray-200 focus-visible:ring-0 focus-visible:border-gray-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tweetId" className="text-sm font-semibold">
                  Link
                </Label>
                <Input
                  id="tweetId"
                  name="tweetId"
                  value={formData.tweetId}
                  onChange={handleInputChange}
                  className="h-10 text-sm border-gray-200 focus-visible:ring-0 focus-visible:border-gray-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description
                </Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[120px] text-sm border-gray-200 focus-visible:ring-0 focus-visible:border-gray-400 resize-none"
                    maxLength={1000}
                  />
                  <div className="absolute bottom-3 left-3 text-xs text-gray-500 font-semibold">
                    {descCharCount}/1000 characters
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center gap-2 pt-2 sm:justify-start">
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-10 px-5 text-sm font-semibold border-gray-200"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                className="h-10 px-5 text-sm font-semibold bg-black text-white hover:bg-gray-800"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
