import {getContentsByCategory} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import ContentCard from "@/components/dashboard/card/card";
import {redirect} from "next/navigation";
import {Suspense} from "react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  link: string;
  createdAt: Date;
}

export default async function ContentCategoryPage({
  params,
}: {
  params: {contentCategory: string};
}) {
  const userInfo = await userExists();
  const userId = userInfo?.user?.id;

  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const categoryKey = (await params).contentCategory;

  const contents = await getContentsByCategory(userId, categoryKey);

  if (!contents || contents.length === 0) {
    redirect("/dashboard");
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No content found for this category.
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3.5 overflow-x-auto overflow-y-hidden p-0 thin-scrollbar">
      {/* <ContentCard /> */}
      {/* <HeroHeader userId={userId} /> */}
     
        {contents?.map((content: ContentItem) => (
          <ContentCard
            key={content.id}
            id={content.id}
            title={content.title}
            description={content.description}
            link={content.link}
            createdAt={content.createdAt}
            userId={userId}
          />
        ))}
      
    </div>
  );
}
