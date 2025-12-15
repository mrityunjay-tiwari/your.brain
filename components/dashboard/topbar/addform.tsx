"use client";

import * as React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm, UseFormReturn} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {Input} from "@/components/ui/input";
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

type BugReportFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function BugReportForm() {
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
    console.log("Title : ", data.title);
    console.log("Description : ", data.description);
    console.log("Link : ", data.link);
    
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

  return (
    <Card className="w-full sm:max-w-md shadow-none border-0">
      
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className="font-normal">
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
      </CardContent>
      {/* <CardFooter> */}
      {/* <Field orientation="horizontal">
          
         
        </Field> */}
      {/* </CardFooter> */}
    </Card>
  );
}
