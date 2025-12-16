"use client"

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DialogContent} from "@/components/ui/dialog";
import {ContentType} from "@/lib/generated/prisma/enums";
import {Dialog} from "@radix-ui/react-dialog";
import {Brain} from "lucide-react";
import {useState} from "react";
import {Tweet} from "react-tweet";

interface CreateContentInput {
  id: string;
  createdAt: Date;
  link: string;
  type: ContentType;
  title: string;
  description: string;
  userId: string;
}

export default function ShareCard(data: CreateContentInput) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };
  return (
    <>
      <Card
        className="w-full md:w-[500px] h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-fit min-w-[650px] border-none shadow-none p-0.5 overflow-y-auto max-h-11/12 rounded-xl [&>button]:hidden thin-scrollbar">
          <Card
            className="w-full h-full shadow-sm border border-gray-200 dark:border-inherit rounded-xl px-2 overflow-hidden transition-shadow hover:shadow-md"
            
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 py-0 -mb-8">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="text-gray-800 dark:text-inherit shrink-0">
                  <Brain className="h-5 w-5" />
                </div>
                <h2 className="text-2xl text-gray-900 dark:text-inherit truncate">
                  {data?.title}
                </h2>
              </div>
            </CardHeader>

            <CardContent className="p-3">
              <p className="text-gray-600 dark:text-inherit leading-relaxed">
                {data?.description}
              </p>

              <div className="w-full flex justify-center -mt-3">
                <Tweet id={"2000087645578485781"} />
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
