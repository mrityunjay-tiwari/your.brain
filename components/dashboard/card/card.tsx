"use client";

import React, {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
  Brain,
  Check,
  Copy,
  Link as LinkIcon,
  Pencil,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import {Tweet} from "react-tweet";
import {
  createIndividualShareLinkHashContent,
  deleteContentById,
  deleteIndividualShareLinkHashContentById,
  updateContentById,
} from "@/app/actions/content";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
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
import {Switch} from "@/components/ui/switch";
import {IoMdInformationCircleOutline} from "react-icons/io";

interface CreateContentInput {
  id: string;
  createdAt: Date;
  link: string;
  title: string;
  description: string;
  userId: string;
}

export default function ContentCard(data: CreateContentInput) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Main Card Click Function
  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  // Stop click propagation for buttons
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  //  Edit Dialog Functions
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

    toast("You updated with the following values:", {
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
      userId: userId,
    });
    toast.success("Content updated successfully!");

    router.refresh();
  }

  // Share link Functions
  const [copied, setCopied] = useState(false);
  const [hashId, setHashId] = useState("");

  const [shareLink, setShareLink] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBrainShare = async () => {
    setIsShareDialogOpen(true);
    const hash = await createIndividualShareLinkHashContent(data.id);
    // console.log(hash.id);
    setHashId(hash.id);
    setShareLink(`http://localhost:3000/shareone/${hash.id}`);
  };

  const [isOn, setIsOn] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsOn(checked);

    // 👉 Do something based on switch state
    if (checked) {
      console.log("Switch ON");
      // e.g. enable feature, call API, update theme, etc.
      await deleteIndividualShareLinkHashContentById(data.id);
    } else {
      console.log("Switch OFF");
      setShareLink("Loading...");
      const hash = await createIndividualShareLinkHashContent(data.id);
      // console.log(hash.id);

      setShareLink(`http://localhost:3000/shareone/${hash.id}`);
      // e.g. disable feature
    }
  };

  // Delete Card Function
  async function deleteCard() {
    toast.message("Deleting content...", {
      duration: 1500,
    });
    await deleteContentById(data.id);
    router.refresh();
    toast.success("Content deleted successfully!");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-left">
        <Card
          className="w-full md:w-[390px] h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => setIsDialogOpen(true)}
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
                    onClick={handleBrainShare}
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

        {/* --- Enlarged Content Dialog --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-fit min-w-[650px] border-none shadow-none p-0.5 overflow-y-auto max-h-11/12 rounded-xl [&>button]:hidden thin-scrollbar">
            <Card className="w-full h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden transition-shadow hover:shadow-md">
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
                      <TooltipContent>
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
        </Dialog>

        {/* --- DeleteCard Dialog --- */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to Delete?</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                size={"sm"}
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
