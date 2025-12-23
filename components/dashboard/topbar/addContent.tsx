"use client";

import React, {useEffect, useState} from "react";
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
import {
  Brain,
  ChartNoAxesGantt,
  GitBranch,
  GitBranchIcon,
  Kanban,
  Link as LinkIcon,
  Pencil,
  PlaneTakeoff,
  Plus,
  Share2,
  Trash2,
  X,
} from "lucide-react";
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
import {
  addContent,
  detectWebsiteCategory,
  getContentsByUserId,
  getProjectsByUserId,
} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import {useRouter} from "next/navigation";
import ProjectsAddDropdown from "../card/projects-dropdown";
import LinkCategoryDropdown from "../card/link-category-dropdown";
import {BsFolderPlus} from "react-icons/bs";
import {detectWebsite, getWebsiteFromUrl} from "@/utils/detect-hostname";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {slugify} from "@/utils/sluger";
import {prisma} from "@/prisma/src";

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
    .max(200, "Link must not exceed 200 char in length"),
  app_category: z
    .string()
    .min(1, "App Category must be defined")
    .max(20, "App category must not be of length more than 20"),
});

// export const tempformSchema = z.object({
//   title: z
//     .string()
//     .min(0, "Bug title must be at least 1 characters.")
//     .max(200, "Bug title must be at most 200 characters."),
//   description: z
//     .string()
//     .min(0, "Description must be at least 1 characters.")
//     .max(1000, "Description must be at most 1000 characters."),
//   link: z
//     .string()
//     .min(1, "Link must have at least 1 character")
//     .max(100, "Link must not exceed 100 char in length"),
// });

interface ActionsSampleProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  short: string;
  end: React.ReactNode;
}

const LOADING_STATE_FOR_PROJECTS: ActionsSampleProps[] = [
  {
    id: "loading",
    label: "Loading projects…",
    icon: <BsFolderPlus className="h-4 w-4 text-zinc-500 animate-pulse" />,
    description: "",
    short: "",
    end: <Plus className="w-3.5 h-3.5 opacity-50" />,
  },
];

export function AddContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardData, setCardData] = useState(initialCardData);
  const [allActionsSample, setAllActionSample] = useState<ActionsSampleProps[]>(
    LOADING_STATE_FOR_PROJECTS
  );
  // Form state
  const [formData, setFormData] = useState(initialCardData);
  const [descCharCount, setDescCharCount] = useState(
    initialCardData.description.length
  );
  const [appCategory, setAppCategory] = useState("");
  const [userCategoryDefine, setUserCategoryDefine] = useState<boolean>(true);
  const appCategoryInputRef = React.useRef<HTMLInputElement | null>(null);

  // let allActionsSample: ActionsSampleProps[] = [
  //   {
  //     id: "1",
  //     label: "Loading...",
  //     icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
  //     description: "",
  //     short: "",
  //     end: <Plus className="w-3.5 h-3.5" />,
  //   },
  // {
  //   id: "1",
  //   label: "Book tickets",
  //   icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
  //   description: "",
  //   short: "",
  //   end: <Plus className="w-3.5 h-3.5" />,
  // },
  // {
  //   id: "1",
  //   label: "Not Book tickets",
  //   icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
  //   description: "",
  //   short: "",
  //   end: <Plus className="w-3.5 h-3.5" />,
  // },
  // ];

  const handleCardClick = async () => {
    setIsDialogOpen(true);

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

    setFormData(cardData);
    setDescCharCount(cardData.description.length);

    // Logic to start loading the user's project info to display in dropdown, so that if feels instant after clicking to search
    const userProjects = await getProjectsByUserId(userId);

    const userProjectsData = userProjects.projects.map((project) => ({
      id: project.id,
      label: project.projectsname,
      icon: <BsFolderPlus className="h-3.5 w-3.5 text-zinc-500" />,
      description: "",
      short: "",
      end: <Plus className="w-3.5 h-3.5" />,
    }));

    setAllActionSample(userProjectsData);
  };

  const refreshProjects = async () => {
    const user = await userExists();
    if (!user?.user?.id) return;

    const userProjects = await getProjectsByUserId(user.user.id);

    const userProjectsData = userProjects.projects.map((project) => ({
      id: project.id,
      label: project.projectsname,
      icon: <BsFolderPlus className="h-3.5 w-3.5 text-zinc-500" />,
      description: "",
      short: "",
      end: <Plus className="w-3.5 h-3.5" />,
    }));

    setAllActionSample(userProjectsData);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      app_category: "",
    },
  });

  // For using inside the onSubmit function
  const router = useRouter();

  // On submitting the form after adding all the content
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log("submitted");
    // console.log("Title : ", data.title);
    // console.log("Description : ", data.description);
    // console.log("Link : ", data.link);

    setIsDialogOpen(false);

    // Reminds user about what all the values they submitted
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          {JSON.stringify(data, null, 2)}
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

    // Adding to the database
    // Verifying the user
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

    const categoryDisplayName = data.app_category;

    const categoryKey =
      appCategory && appCategory.length > 0
        ? appCategory // auto-detected
        : slugify(categoryDisplayName);

    await addContent({
      title: data.title,
      description: data.description,
      link: data.link,
      categoryKey,
      categoryDisplayName,
      userId: userId,
    });

    const hostname = new URL(data.link).hostname
      .replace(/^www\./, "")
      .toLowerCase();


    toast.success("Content added successfully!");

    // To show the latest added content to the user's dashboard without them need to refresh the page
    router.refresh();
  }

  const handleLinkOnchange = async (link: string) => {
    // console.log(link);
    // const websitename = await detectWebsite(link);
    // console.log(websitename);

    // const appCategory = await getWebsiteFromUrl(link);
    // console.log(appCategory?.displayName);

    const user = await userExists();
    if (!user?.user?.id) return;

    const detected = await detectWebsiteCategory(user.user.id, link);

    if (detected) {
      form.setValue("app_category", detected.displayName, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setUserCategoryDefine(true);

      setAppCategory(detected.key);
    }
    if (!appCategory) {
      form.setError("app_category", {
        type: "deps",
        message: "Website not auto recognized. Please define the category.",
      });

      setUserCategoryDefine(false);
      setAppCategory("");
    }

    return link;
  };

  return (
    // Outer container: Full screen height to center the card, but doesn't force card height
    <>
      <div>
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
          <DialogContent className="overflow-y-auto max-h-7/8 thin-scrollbar">
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
                        onChange={(e) => {
                          field.onChange(e); // ✅ VERY IMPORTANT

                          const value = e.target.value;
                          handleLinkOnchange(value);
                        }}

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

                <div className="flex justify-between gap-5">
                  {/* <LinkCategoryDropdown /> */}
                  <Controller
                    name="app_category"
                    control={form.control}
                    render={({field, fieldState}) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-link">
                          App Category
                        </FieldLabel>
                        <div className="flex -mt-1">
                          <Input
                            {...field}
                            // id="form-rhf-demo-link"
                            // aria-invalid={fieldState.invalid}
                            placeholder="Define link category"
                            readOnly={userCategoryDefine}
                            ref={(el) => {
                              field.ref(el); // ✅ keep react-hook-form working
                              appCategoryInputRef.current = el;
                            }}
                            // autoComplete="on"
                            className="rounded-r-none border-r-0"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                className="border-l-0 rounded-l-none hover:cursor-pointer"
                                onClick={() => {
                                  setUserCategoryDefine(false);
                                  setTimeout(() => {
                                    appCategoryInputRef.current?.focus();
                                  }, 0);
                                }}
                                type="button"
                              >
                                <Pencil className="text-zinc-500 scale-[1] origin-center" />{" "}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                Is Auto-Defined Category Wrong? Edit.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        {fieldState.invalid && (
                          <FieldError
                            className="text-xs"
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                  <ProjectsAddDropdown
                    actions={allActionsSample}
                    onProjectCreated={refreshProjects}
                  />
                </div>
                <div className="flex gap-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      form.reset({
                        title: "",
                        description: "",
                        link: "",
                        app_category: "", // ✅ ensure reset
                      })
                    }
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
