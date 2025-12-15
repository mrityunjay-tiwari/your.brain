"use client";

import React, {Suspense, useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {
  Brain,
  Check,
  Copy,
  Cross,
  Link as LinkIcon,
  Pencil,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import {Tweet} from "react-tweet";
import {
  addContent,
  deleteContentById,
  updateContentById,
} from "@/app/actions/content";
import {ContentType} from "@/lib/generated/prisma/enums";
import {extractTweetId} from "@/utils/tweetId";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Close} from "@radix-ui/react-dialog";
import {MdOutlineClose} from "react-icons/md";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {formSchema} from "../topbar/addContent";
import userExists from "@/app/actions/getUser";

// Initial data
const initialCardData = {
  title: "Claude funny update",
  description:
    "Claude giving code without asking for is like forcing you to code the way it wants",
  tweetId: "https://x.com/mrityunjay_18/status/1987415241425363234?s=20",
};

interface CreateContentInput {
  id: string;
  createdAt: Date;
  link: string;
  type: ContentType;
  title: string;
  description: string;
  userId: string;
}

export default function ContentCard(data: CreateContentInput) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardData, setCardData] = useState(initialCardData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  // const tweetId = extractTweetId(data.link);
  // if (!tweetId) {
  //   return <div>Invalid Tweet Link</div>;
  // }

  async function deleteCard() {
    toast.message("Deleting content...", {
      duration: 1500,
    });
    await deleteContentById(data.id);
    router.refresh();
    toast.success("Content deleted successfully!");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      link: data.link,
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log("submitted");
    console.log("Title : ", formData.title);
    console.log("Description : ", formData.description);
    console.log("Link : ", formData.link);

    setIsEditDialogOpen(false);

    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(formData, null, 2)}</code>
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

    await updateContentById(data.id, {
      title: formData.title,
      description: formData.description,
      link: formData.link,
      type: "article",
      userId: userId,
    });
    toast.success("Content added successfully!");

    router.refresh();
  }

  // Share link Functions
  const [copied, setCopied] = useState(false);

  const shareLink = `http://localhost:3000/shareone/${data.id}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-left">
        <Card
          className="w-full md:w-[390px] h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 py-0 -mb-8">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="text-gray-800 dark:text-inherit shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <h2 className="text-2xl text-gray-900 dark:text-inherit truncate">
                {data.title}
              </h2>
            </div>

            <div
              className="flex items-center text-gray-500 shrink-0 gap-3"
              onClick={stopPropagation}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="hover:text-gray-100 hover:cursor-pointer bg-transparent transition-all text-gray-400 p-0 w-fit h-fit hover:scale-120 hover:bg-transparent"
                    size={"icon-sm"}
                    onClick={() => setIsShareDialogOpen(true)}
                  >
                    <Share2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share Brain</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="hover:text-red-500 hover:cursor-pointer text-red-900 bg-transparent p-0 w-fit h-fit hover:scale-120 hover:bg-transparent transition-all"
                    size={"icon-sm"}
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Brain</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>

          <CardContent className="p-3">
            <p className="text-gray-600 dark:text-inherit leading-relaxed">
              {data.description}
            </p>

            <div className="w-full flex justify-center -mt-3">
              <Tweet id={"2000087645578485781"} />
            </div>
          </CardContent>
        </Card>

        {/* --- Enlarge Content Dialog --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-fit min-w-[650px] border-none shadow-none p-0.5 overflow-y-auto max-h-11/12 rounded-xl [&>button]:hidden thin-scrollbar">
            <Card
              className="w-full h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden transition-shadow hover:shadow-md"
              onClick={handleCardClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 py-0 -mb-8">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="text-gray-800 dark:text-inherit shrink-0">
                    <Brain className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl text-gray-900 dark:text-inherit truncate">
                    {data.title}
                  </h2>
                </div>

                <div
                  className="flex items-baseline-last text-gray-500 shrink-0 gap-2.5"
                  onClick={stopPropagation}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="hover:text-gray-100 hover:cursor-pointer -ml-0.5 text-gray-400 bg-transparent p-0 w-fit h-fit hover:scale-120 hover:bg-transparent transition-all"
                        size={"icon-sm"}
                        onClick={() => setIsEditDialogOpen(true)}
                      >
                        <Pencil />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Content</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="hover:text-gray-100 hover:cursor-pointer bg-transparent transition-all text-gray-400 p-0 w-fit h-fit hover:scale-120 hover:bg-transparent"
                        size={"icon-sm"}
                        onClick={() => setIsShareDialogOpen(true)}
                      >
                        <Share2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Brain</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="hover:text-red-500 hover:cursor-pointer text-red-900 bg-transparent p-0 w-fit h-fit hover:scale-120 hover:bg-transparent transition-all"
                        size={"icon-sm"}
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Brain</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="hover:text-gray-100 hover:cursor-pointer -ml-0.5 text-gray-400 bg-transparent p-0 w-fit h-fit hover:scale-120 hover:bg-transparent transition-all"
                        size={"icon-sm"}
                        onClick={() => setIsDialogOpen(false)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Close</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>

              <CardContent className="p-3">
                <p className="text-gray-600 dark:text-inherit leading-relaxed">
                  {data.description}
                </p>

                <div className="w-full flex justify-center -mt-3">
                  <Tweet id={"2000087645578485781"} />
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        {/* --- Edit Dialog --- */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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

        {/* --- ShareLink Dialog --- */}
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share yourBrain</DialogTitle>
              <DialogDescription>
                Share this individual Brain.
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
                    value={`http://localhost:3000/shareone/${data.id}`}
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
        </Dialog>

        {/* --- Delete Dialog --- */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to Delete?</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              
                <Button
                  type="submit"
                  size={'sm'}
                  onClick={deleteCard}
                  className="hover:cursor-pointer text-white bg-red-400 hover:bg-red-900 hover:scale-105"
                >
                  Yes, Delete
                </Button>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
