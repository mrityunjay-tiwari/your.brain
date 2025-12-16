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
import z from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Card, CardContent} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {addContent, getContentsByUserId} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import { useRouter } from "next/navigation";

// Initial data
const initialCardData = {
  title: "Claude funny update",
  description:
    "Claude giving code without asking for is like forcing you to code the way it wants",
  tweetId: "1992261354674356242",
};

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("submitted");
    console.log("Title : ", data.title);
    console.log("Description : ", data.description);
    console.log("Link : ", data.link);

    setIsDialogOpen(false);

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

    const user = await userExists();
    if (!user) {
      toast.error("User does not exist. Please log in.");
      return;
    }
    const userId = user.user?.id;
    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    await addContent({
      title: data.title,
      description: data.description,
      link: data.link,
      type: "article",
      userId: userId,
    });
    toast.success("Content added successfully!");

    router.refresh();
  }
  return (
    // Outer container: Full screen height to center the card, but doesn't force card height
    <>
      <div className="">
        <Button
          onClick={handleCardClick}
          variant="outline"
          className="bg-blue-600 hover:cursor-pointer text-white font-normal flex items-center hover:bg-blue-400 hover:text-white"
        >
          <Plus /> AddContent
        </Button>
        {/* --- Edit Dialog (Same as before) --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <Card className="w-full sm:max-w-md shadow-none border-0"> */}
          <DialogContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rhf-demo-title"
                        className="font-normal"
                      >
                        Title
                      </FieldLabel>
                      <Input
                        {...field}
                        // id="form-rhf-demo-title"
                        // aria-invalid={fieldState.invalid}
                        placeholder="Put your title here"
                        // autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="link"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-link">Link</FieldLabel>
                      <Input
                        {...field}
                        // id="form-rhf-demo-link"
                        // aria-invalid={fieldState.invalid}
                        placeholder="Put your content link here"
                        // autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          //   id="form-rhf-demo-description"
                          placeholder="write detailed description here..."
                          //   rows={6}
                          className="min-h-24 resize-none"
                          //   aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/1000 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {/* <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription> */}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="flex gap-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" form="form-rhf-demo">
                    Submit
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
