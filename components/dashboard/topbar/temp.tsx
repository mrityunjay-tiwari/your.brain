"use client";

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
import {Plus} from "lucide-react";
import {BugReportForm} from "./addform";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {toast} from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, "Bug title must be at least 1 characters.")
    .max(200, "Bug title must be at most 200 characters."),
  description: z
    .string()
    .min(1, "Description must be at least 1 characters.")
    .max(1000, "Description must be at most 1000 characters."),
  link: z
    .string()
    .min(1, "Link must have at least 1 character")
    .max(100, "Link must not exceed 100 char in length"),
});

export function AddContent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("submitted");
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  // function onSubmit(data: z.infer<typeof formSchema>) {
  //   console.log("submitted");
  //   toast("You submitted the following values:", {
  //     description: (
  //       <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
  //         <code>{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //     position: "bottom-right",
  //     classNames: {
  //       content: "flex flex-col gap-2",
  //     },
  //     style: {
  //       "--border-radius": "calc(var(--radius)  + 4px)",
  //     } as React.CSSProperties,
  //   });
  // }
  return (
    <Dialog>
      {/* <form> */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 text-white font-normal flex items-center hover:bg-blue-400 hover:text-white"
        >
          <Plus /> AddContent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {/* <DialogHeader> */}
        <DialogTitle>Add Content</DialogTitle>
        {/* </DialogHeader> */}

        {/* Pass control to the child */}
        <BugReportForm />

        {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Submit</Button>
          </DialogFooter> */}
      </DialogContent>

      {/* </form> */}
    </Dialog>
  );
}