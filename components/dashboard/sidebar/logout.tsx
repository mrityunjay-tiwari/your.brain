"use client";

import {useState} from "react";
import {logoutAction} from "@/app/actions/logout";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {redirect} from "next/navigation";
import { log } from "console";

export function LogOutDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" className="rounded-none border-0 bg-transparent w-full">Log Out</Button>
      </DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <form
            
          >
            <Button type="submit" variant="destructive" formAction={logoutAction}>
              Yes, Log Out
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
